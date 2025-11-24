from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from .models import ServiceProvider, ServiceListing, Inquiry
from .serializers import (
    ServiceProviderSerializer, ServiceListingSerializer,
    ServiceListingListSerializer, InquirySerializer
)


class ServiceProviderViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceProviderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_verified', 'is_active']
    search_fields = ['business_name', 'description', 'categories']
    ordering_fields = ['rating', 'reviews_count', 'created_at']
    ordering = ['-rating']
    
    def get_queryset(self):
        queryset = ServiceProvider.objects.select_related('user').all()
        if self.action == 'list' and not self.request.user.is_staff:
            queryset = queryset.filter(is_active=True)
        return queryset
    
    @action(detail=False, methods=['get', 'post', 'put', 'patch'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """Get or create/update the current user's provider profile"""
        if request.method == 'GET':
            try:
                provider = ServiceProvider.objects.get(user=request.user)
                serializer = self.get_serializer(provider)
                return Response(serializer.data)
            except ServiceProvider.DoesNotExist:
                return Response(
                    {'error': 'Provider profile not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        # POST, PUT, PATCH
        try:
            provider = ServiceProvider.objects.get(user=request.user)
            serializer = self.get_serializer(provider, data=request.data, partial=True)
        except ServiceProvider.DoesNotExist:
            serializer = self.get_serializer(data=request.data)
        
        serializer.is_valid(raise_exception=True)
        provider = serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK if provider else status.HTTP_201_CREATED)


class ServiceListingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'price_type', 'is_active', 'provider']
    search_fields = ['title', 'description', 'tags']
    ordering_fields = ['starting_price', 'views_count', 'created_at']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ServiceListingListSerializer
        return ServiceListingSerializer
    
    def get_queryset(self):
        queryset = ServiceListing.objects.select_related('provider', 'provider__user').all()
        if self.action == 'list' and not self.request.user.is_staff:
            queryset = queryset.filter(is_active=True, provider__is_active=True)
        return queryset
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.increment_views()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def perform_create(self, serializer):
        # Get or create provider profile for the user
        provider, created = ServiceProvider.objects.get_or_create(
            user=self.request.user,
            defaults={
                'business_name': f"{self.request.user.username}'s Services",
                'description': 'Service provider'
            }
        )
        serializer.save(provider=provider)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_listings(self, request):
        """Get listings created by the current user's provider profile"""
        try:
            provider = ServiceProvider.objects.get(user=request.user)
            listings = self.get_queryset().filter(provider=provider)
            page = self.paginate_queryset(listings)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = self.get_serializer(listings, many=True)
            return Response(serializer.data)
        except ServiceProvider.DoesNotExist:
            return Response([])


class InquiryViewSet(viewsets.ModelViewSet):
    serializer_class = InquirySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'listing']
    ordering = ['-created_at']
    
    def get_queryset(self):
        # Users can see inquiries they sent or received (as provider)
        user_provider_listings = ServiceListing.objects.filter(
            provider__user=self.request.user
        ).values_list('id', flat=True)
        
        return Inquiry.objects.filter(
            models.Q(sender=self.request.user) |
            models.Q(listing_id__in=user_provider_listings)
        ).select_related('listing', 'listing__provider', 'sender')
    
    @action(detail=False, methods=['get'])
    def sent(self, request):
        """Get inquiries sent by the current user"""
        inquiries = self.get_queryset().filter(sender=request.user)
        page = self.paginate_queryset(inquiries)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(inquiries, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def received(self, request):
        """Get inquiries received by the current user (as provider)"""
        user_provider_listings = ServiceListing.objects.filter(
            provider__user=request.user
        ).values_list('id', flat=True)
        
        inquiries = self.get_queryset().filter(listing_id__in=user_provider_listings)
        page = self.paginate_queryset(inquiries)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(inquiries, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def respond(self, request, pk=None):
        """Respond to an inquiry (provider only)"""
        inquiry = self.get_object()
        
        # Check if user is the provider
        if inquiry.listing.provider.user != request.user:
            return Response(
                {'error': 'Only the service provider can respond to inquiries'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        response_text = request.data.get('response')
        if not response_text:
            return Response(
                {'error': 'Response text is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        inquiry.provider_response = response_text
        inquiry.status = 'responded'
        inquiry.responded_at = timezone.now()
        inquiry.save(update_fields=['provider_response', 'status', 'responded_at', 'updated_at'])
        
        serializer = self.get_serializer(inquiry)
        return Response(serializer.data)


# Import models at the end to avoid circular imports
from django.db import models
