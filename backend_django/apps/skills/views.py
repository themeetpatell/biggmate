from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import SkillProfile, ServicePackage, ClientProject
from .serializers import (
    SkillProfileSerializer, ServicePackageSerializer, ClientProjectSerializer
)


class SkillProfileViewSet(viewsets.ModelViewSet):
    serializer_class = SkillProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['experience_level', 'available_for_hire']
    search_fields = ['skills', 'industries', 'bio']
    
    def get_queryset(self):
        return SkillProfile.objects.select_related('user').all()
    
    @action(detail=False, methods=['get', 'put', 'patch'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """Get or update the current user's skill profile"""
        profile, created = SkillProfile.objects.get_or_create(user=request.user)
        
        if request.method == 'GET':
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ServicePackageViewSet(viewsets.ModelViewSet):
    serializer_class = ServicePackageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['package_type', 'is_active', 'provider']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']
    ordering = ['price']
    
    def get_queryset(self):
        queryset = ServicePackage.objects.select_related('provider').all()
        if self.action == 'list' and not self.request.user.is_staff:
            queryset = queryset.filter(is_active=True)
        return queryset
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_packages(self, request):
        """Get packages created by the current user"""
        packages = self.get_queryset().filter(provider=request.user)
        page = self.paginate_queryset(packages)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(packages, many=True)
        return Response(serializer.data)


class ClientProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ClientProjectSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'client', 'service_provider']
    ordering_fields = ['created_at', 'deadline']
    ordering = ['-created_at']
    
    def get_queryset(self):
        # Users can see projects where they are client or service provider
        return ClientProject.objects.filter(
            Q(client=self.request.user) | Q(service_provider=self.request.user)
        ).select_related('client', 'service_provider', 'package')
    
    @action(detail=False, methods=['get'])
    def as_client(self, request):
        """Get projects where user is the client"""
        projects = self.get_queryset().filter(client=request.user)
        page = self.paginate_queryset(projects)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def as_provider(self, request):
        """Get projects where user is the service provider"""
        projects = self.get_queryset().filter(service_provider=request.user)
        page = self.paginate_queryset(projects)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Mark project as completed"""
        from django.utils import timezone
        project = self.get_object()
        
        if project.service_provider != request.user:
            return Response(
                {'error': 'Only the service provider can mark projects as completed'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        project.status = 'completed'
        project.completed_at = timezone.now()
        project.save(update_fields=['status', 'completed_at', 'updated_at'])
        
        serializer = self.get_serializer(project)
        return Response(serializer.data)
