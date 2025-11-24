from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import IdeaValidation, MarketResearch, MVPPlan, RevenueModel
from .serializers import (
    IdeaValidationSerializer, MarketResearchSerializer,
    MVPPlanSerializer, RevenueModelSerializer
)
from apps.projects.models import Project


class IdeaValidationViewSet(viewsets.ModelViewSet):
    serializer_class = IdeaValidationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['project', 'status']
    ordering = ['-created_at']
    
    def get_queryset(self):
        user_projects = Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).values_list('id', flat=True)
        
        return IdeaValidation.objects.filter(
            project_id__in=user_projects
        ).select_related('project', 'created_by').distinct()


class MarketResearchViewSet(viewsets.ModelViewSet):
    serializer_class = MarketResearchSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['project']
    ordering = ['-created_at']
    
    def get_queryset(self):
        user_projects = Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).values_list('id', flat=True)
        
        return MarketResearch.objects.filter(
            project_id__in=user_projects
        ).select_related('project', 'created_by').distinct()


class MVPPlanViewSet(viewsets.ModelViewSet):
    serializer_class = MVPPlanSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['project', 'status']
    ordering = ['-created_at']
    
    def get_queryset(self):
        user_projects = Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).values_list('id', flat=True)
        
        return MVPPlan.objects.filter(
            project_id__in=user_projects
        ).select_related('project', 'created_by').distinct()


class RevenueModelViewSet(viewsets.ModelViewSet):
    serializer_class = RevenueModelSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['project', 'model_type', 'is_active']
    ordering = ['-created_at']
    
    def get_queryset(self):
        user_projects = Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).values_list('id', flat=True)
        
        return RevenueModel.objects.filter(
            project_id__in=user_projects
        ).select_related('project', 'created_by').distinct()
