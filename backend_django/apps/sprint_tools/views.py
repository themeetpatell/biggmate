from rest_framework import viewsets, filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import IdeaValidation, MarketResearch, MVPPlan, RevenueModel, SprintoData
from .serializers import (
    IdeaValidationSerializer, MarketResearchSerializer,
    MVPPlanSerializer, RevenueModelSerializer,
    SprintoDataSerializer, SprintoDataListSerializer
)
from apps.projects.models import Project
from apps.pitches.models import Pitch


class SprintoDataViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Sprinto data per pitch.
    Users can only access Sprinto data for their own pitches.
    """
    serializer_class = SprintoDataSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['pitch']
    ordering = ['-updated_at']
    
    def get_queryset(self):
        # Only return Sprinto data for pitches owned by the current user
        return SprintoData.objects.filter(
            pitch__author=self.request.user
        ).select_related('pitch', 'created_by')
    
    def get_serializer_class(self):
        if self.action == 'list':
            return SprintoDataListSerializer
        return SprintoDataSerializer
    
    @action(detail=False, methods=['get'])
    def my_pitches_with_sprinto(self, request):
        """Get all user's pitches and their Sprinto data status"""
        user_pitches = Pitch.objects.filter(author=request.user).values(
            'id', 'title', 'stage', 'created_at'
        )
        
        # Get all Sprinto data for user's pitches
        sprinto_pitch_ids = SprintoData.objects.filter(
            pitch__author=request.user
        ).values_list('pitch_id', flat=True)
        
        result = []
        for pitch in user_pitches:
            result.append({
                'id': pitch['id'],
                'title': pitch['title'],
                'stage': pitch['stage'],
                'created_at': pitch['created_at'],
                'has_sprinto_data': pitch['id'] in sprinto_pitch_ids
            })
        
        return Response(result)
    
    @action(detail=False, methods=['get'], url_path='by-pitch/(?P<pitch_id>[^/.]+)')
    def by_pitch(self, request, pitch_id=None):
        """Get Sprinto data for a specific pitch"""
        try:
            # Verify user owns the pitch
            pitch = Pitch.objects.get(id=pitch_id, author=request.user)
        except Pitch.DoesNotExist:
            return Response(
                {'error': 'Pitch not found or you do not have access'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            sprinto_data = SprintoData.objects.get(pitch=pitch)
            serializer = SprintoDataSerializer(sprinto_data)
            return Response(serializer.data)
        except SprintoData.DoesNotExist:
            return Response(
                {'error': 'No Sprinto data exists for this pitch', 'pitch_id': pitch_id},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['post'], url_path='create-for-pitch/(?P<pitch_id>[^/.]+)')
    def create_for_pitch(self, request, pitch_id=None):
        """Create Sprinto data for a specific pitch (initializes with defaults)"""
        try:
            pitch = Pitch.objects.get(id=pitch_id, author=request.user)
        except Pitch.DoesNotExist:
            return Response(
                {'error': 'Pitch not found or you do not have access'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if Sprinto data already exists
        if SprintoData.objects.filter(pitch=pitch).exists():
            sprinto_data = SprintoData.objects.get(pitch=pitch)
            serializer = SprintoDataSerializer(sprinto_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Create new Sprinto data with defaults
        sprinto_data = SprintoData.objects.create(
            pitch=pitch,
            created_by=request.user,
            # Initialize with empty defaults - all fields have defaults in model
        )
        
        serializer = SprintoDataSerializer(sprinto_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['patch'], url_path='update-for-pitch/(?P<pitch_id>[^/.]+)')
    def update_for_pitch(self, request, pitch_id=None):
        """Update Sprinto data for a specific pitch"""
        try:
            pitch = Pitch.objects.get(id=pitch_id, author=request.user)
        except Pitch.DoesNotExist:
            return Response(
                {'error': 'Pitch not found or you do not have access'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            sprinto_data = SprintoData.objects.get(pitch=pitch)
        except SprintoData.DoesNotExist:
            return Response(
                {'error': 'No Sprinto data exists for this pitch. Create it first.'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = SprintoDataSerializer(
            sprinto_data, 
            data=request.data, 
            partial=True,
            context={'request': request}
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['patch'], url_path='update-tab/(?P<pitch_id>[^/.]+)/(?P<tab_name>[^/.]+)')
    def update_tab(self, request, pitch_id=None, tab_name=None):
        """Update specific tab data for a pitch's Sprinto data"""
        try:
            pitch = Pitch.objects.get(id=pitch_id, author=request.user)
        except Pitch.DoesNotExist:
            return Response(
                {'error': 'Pitch not found or you do not have access'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Create Sprinto data if it doesn't exist
        sprinto_data, created = SprintoData.objects.get_or_create(
            pitch=pitch,
            defaults={'created_by': request.user}
        )
        
        # Map tab names to fields
        tab_fields = {
            'ideaframing': ['idea_narrative', 'problem_solution', 'value_proposition_canvas', 'assumptions_log'],
            'ideavalidation': ['market_analysis', 'icp_profile', 'competitors', 'user_surveys', 'validation_score', 'key_insights'],
            'featurematrix': ['pain_points', 'feature_priorities', 'user_stories', 'mvp_feature_set'],
            'mvpdevelopment': ['prd', 'technical_architecture', 'user_flows', 'wireframes', 'prototype', 'sprint_plans', 'task_board', 'dev_milestones'],
            'mvptesting': ['test_plan', 'beta_users', 'bugs', 'usability_results', 'performance_metrics'],
            'feedbackboard': ['feedback_items', 'feature_requests', 'iteration_roadmap'],
            'demokit': ['demo_videos', 'screenshots', 'presentations'],
        }
        
        if tab_name not in tab_fields:
            return Response(
                {'error': f'Invalid tab name. Valid tabs: {list(tab_fields.keys())}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Only allow updating fields for the specified tab
        allowed_fields = tab_fields[tab_name]
        update_data = {k: v for k, v in request.data.items() if k in allowed_fields}
        
        if not update_data:
            return Response(
                {'error': f'No valid fields provided for tab {tab_name}. Valid fields: {allowed_fields}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        for field, value in update_data.items():
            setattr(sprinto_data, field, value)
        
        sprinto_data.save()
        
        serializer = SprintoDataSerializer(sprinto_data)
        return Response(serializer.data)


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
