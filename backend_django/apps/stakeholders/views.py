from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Sum, Count
from datetime import date, timedelta
from .models import Stakeholder, Interaction, Pipeline, UserStakeholder
from .serializers import (
    StakeholderSerializer, InteractionSerializer, PipelineSerializer,
    UserStakeholderSerializer
)
from apps.projects.models import Project


class UserStakeholderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for user-owned stakeholders (personal CRM).
    Each user can only see and manage their own stakeholders.
    """
    serializer_class = UserStakeholderSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['type', 'is_favorite']
    search_fields = ['name', 'email', 'company', 'tags', 'notes']
    ordering_fields = ['created_at', 'last_contact_date', 'name', 'relationship_strength']
    ordering = ['-created_at']
    
    def get_queryset(self):
        return UserStakeholder.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get stakeholder statistics for current user"""
        queryset = self.get_queryset()
        today = date.today()
        next_week = today + timedelta(days=7)
        
        # Calculate stats
        total = queryset.count()
        favorites = queryset.filter(is_favorite=True).count()
        
        # Upcoming follow-ups (within next 7 days)
        upcoming_followups = queryset.filter(
            next_followup_date__gte=today,
            next_followup_date__lte=next_week
        ).count()
        
        # Count by type
        by_type = {}
        type_counts = queryset.values('type').annotate(count=Count('id'))
        for item in type_counts:
            by_type[item['type']] = item['count']
        
        return Response({
            'total': total,
            'favorites': favorites,
            'upcomingFollowups': upcoming_followups,
            'byType': by_type
        })
    
    @action(detail=False, methods=['get'])
    def upcoming_followups(self, request):
        """Get stakeholders with upcoming follow-up dates"""
        today = date.today()
        next_month = today + timedelta(days=30)
        
        stakeholders = self.get_queryset().filter(
            next_followup_date__gte=today,
            next_followup_date__lte=next_month
        ).order_by('next_followup_date')[:20]
        
        serializer = self.get_serializer(stakeholders, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def toggle_favorite(self, request, pk=None):
        """Toggle favorite status"""
        stakeholder = self.get_object()
        stakeholder.is_favorite = not stakeholder.is_favorite
        stakeholder.save(update_fields=['is_favorite', 'updated_at'])
        
        serializer = self.get_serializer(stakeholder)
        return Response(serializer.data)


class StakeholderViewSet(viewsets.ModelViewSet):
    serializer_class = StakeholderSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['project', 'type', 'status']
    search_fields = ['name', 'email', 'company', 'tags']
    ordering_fields = ['created_at', 'last_contact_date', 'name']
    ordering = ['-created_at']
    
    def get_queryset(self):
        # Users can see stakeholders for projects they're part of
        user_projects = Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).values_list('id', flat=True)
        
        return Stakeholder.objects.filter(
            project_id__in=user_projects
        ).select_related('project', 'added_by').distinct()
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get stakeholders grouped by type"""
        type_filter = request.query_params.get('type')
        queryset = self.get_queryset()
        
        if type_filter:
            queryset = queryset.filter(type=type_filter)
        
        # Group by type
        stakeholders = queryset.values('type').annotate(count=Count('id'))
        
        return Response(stakeholders)
    
    @action(detail=True, methods=['get'])
    def interactions(self, request, pk=None):
        """Get all interactions for a stakeholder"""
        stakeholder = self.get_object()
        interactions = stakeholder.interactions.all().order_by('-interaction_date')
        serializer = InteractionSerializer(interactions, many=True)
        return Response(serializer.data)


class InteractionViewSet(viewsets.ModelViewSet):
    serializer_class = InteractionSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['stakeholder', 'type', 'outcome']
    ordering = ['-interaction_date']
    
    def get_queryset(self):
        # Users can see interactions for stakeholders in their projects
        user_projects = Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).values_list('id', flat=True)
        
        return Interaction.objects.filter(
            stakeholder__project_id__in=user_projects
        ).select_related('stakeholder', 'user').distinct()
    
    @action(detail=False, methods=['get'])
    def upcoming_followups(self, request):
        """Get interactions with upcoming follow-up dates"""
        from datetime import date
        interactions = self.get_queryset().filter(
            next_followup_date__gte=date.today()
        ).order_by('next_followup_date')[:20]
        
        serializer = self.get_serializer(interactions, many=True)
        return Response(serializer.data)


class PipelineViewSet(viewsets.ModelViewSet):
    serializer_class = PipelineSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['project', 'stage']
    ordering = ['-created_at']
    
    def get_queryset(self):
        # Users can see pipeline for projects they're part of
        user_projects = Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).values_list('id', flat=True)
        
        return Pipeline.objects.filter(
            project_id__in=user_projects
        ).select_related('project', 'stakeholder').distinct()
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get pipeline summary"""
        project_id = request.query_params.get('project_id')
        queryset = self.get_queryset()
        
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        
        # Calculate summary
        by_stage = queryset.values('stage').annotate(
            count=Count('id'),
            total_value=Sum('deal_value')
        )
        
        total_value = queryset.aggregate(total=Sum('deal_value'))['total'] or 0
        total_count = queryset.count()
        
        return Response({
            'by_stage': list(by_stage),
            'total_value': float(total_value),
            'total_count': total_count
        })
    
    @action(detail=True, methods=['post'])
    def move_stage(self, request, pk=None):
        """Move pipeline entry to a different stage"""
        pipeline = self.get_object()
        new_stage = request.data.get('stage')
        
        if not new_stage:
            return Response(
                {'error': 'stage is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate stage
        valid_stages = [choice[0] for choice in Pipeline.STAGE_CHOICES]
        if new_stage not in valid_stages:
            return Response(
                {'error': f'Invalid stage. Must be one of: {", ".join(valid_stages)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        pipeline.stage = new_stage
        
        # Set actual close date for closed stages
        if new_stage in ['closed_won', 'closed_lost']:
            from datetime import date
            pipeline.actual_close_date = date.today()
        
        pipeline.save(update_fields=['stage', 'actual_close_date', 'updated_at'])
        
        serializer = self.get_serializer(pipeline)
        return Response(serializer.data)
