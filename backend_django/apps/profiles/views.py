from rest_framework import generics, views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import Profile, PortfolioItem, Testimonial
from .serializers import ProfileSerializer, ProfileCreateUpdateSerializer, PortfolioItemSerializer, TestimonialSerializer


class ProfileDetailView(generics.RetrieveUpdateAPIView):
    """Get or update user's own profile"""
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        profile, created = Profile.objects.get_or_create(user=self.request.user)
        return profile
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProfileCreateUpdateSerializer
        return ProfileSerializer


class PublicProfileView(generics.RetrieveAPIView):
    """Get public profile by username"""
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    lookup_field = 'user__username'
    lookup_url_kwarg = 'username'
    
    def get_queryset(self):
        return Profile.objects.filter(is_public=True)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment profile views
        instance.profile_views += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class ProfileListView(generics.ListAPIView):
    """List all public profiles"""
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = Profile.objects.filter(is_public=True)
        
        # Filters
        role = self.request.query_params.get('role')
        industry = self.request.query_params.get('industry')
        archetype = self.request.query_params.get('archetype')
        availability = self.request.query_params.get('availability')
        
        if role:
            queryset = queryset.filter(role__icontains=role)
        if industry:
            queryset = queryset.filter(industries__contains=[industry])
        if archetype:
            queryset = queryset.filter(archetype=archetype)
        if availability:
            queryset = queryset.filter(availability=availability)
        
        return queryset


class PortfolioItemListCreateView(generics.ListCreateAPIView):
    """List or create portfolio items"""
    serializer_class = PortfolioItemSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        profile = get_object_or_404(Profile, user=self.request.user)
        return PortfolioItem.objects.filter(profile=profile)
    
    def perform_create(self, serializer):
        profile = get_object_or_404(Profile, user=self.request.user)
        serializer.save(profile=profile)


class PortfolioItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete a portfolio item"""
    serializer_class = PortfolioItemSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        profile = get_object_or_404(Profile, user=self.request.user)
        return PortfolioItem.objects.filter(profile=profile)


class TestimonialListCreateView(generics.ListCreateAPIView):
    """List or create testimonials"""
    serializer_class = TestimonialSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        profile = get_object_or_404(Profile, user=self.request.user)
        return Testimonial.objects.filter(profile=profile)
    
    def perform_create(self, serializer):
        profile = get_object_or_404(Profile, user=self.request.user)
        serializer.save(profile=profile)


class TestimonialDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete a testimonial"""
    serializer_class = TestimonialSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        profile = get_object_or_404(Profile, user=self.request.user)
        return Testimonial.objects.filter(profile=profile)
