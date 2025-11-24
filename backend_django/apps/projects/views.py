from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Project, TeamMember, Task, Milestone
from .serializers import (
    ProjectSerializer, ProjectListSerializer, TeamMemberSerializer,
    TaskSerializer, MilestoneSerializer
)


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'owner']
    search_fields = ['name', 'description']
    ordering_fields = ['created_at', 'name']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectListSerializer
        return ProjectSerializer
    
    def get_queryset(self):
        # Users can see projects they own or are team members of
        return Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).distinct().select_related('owner').prefetch_related('team_members')
    
    @action(detail=False, methods=['get'])
    def my_projects(self, request):
        """Get projects owned by the current user"""
        projects = self.get_queryset().filter(owner=request.user)
        page = self.paginate_queryset(projects)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def tasks(self, request, pk=None):
        """Get all tasks for a project"""
        project = self.get_object()
        tasks = project.tasks.all()
        serializer = TaskSerializer(tasks, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def milestones(self, request, pk=None):
        """Get all milestones for a project"""
        project = self.get_object()
        milestones = project.milestones.all()
        serializer = MilestoneSerializer(milestones, many=True)
        return Response(serializer.data)


class TeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project', 'role']
    
    def get_queryset(self):
        # Users can see team members of projects they're part of
        user_projects = Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).values_list('id', flat=True)
        
        return TeamMember.objects.filter(
            project_id__in=user_projects
        ).select_related('user', 'project')


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['project', 'status', 'priority', 'assigned_to']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'due_date', 'priority']
    ordering = ['-priority', '-created_at']
    
    def get_queryset(self):
        # Users can see tasks from projects they're part of
        user_projects = Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).values_list('id', flat=True)
        
        return Task.objects.filter(
            project_id__in=user_projects
        ).select_related('project', 'assigned_to', 'created_by')
    
    @action(detail=False, methods=['get'])
    def my_tasks(self, request):
        """Get tasks assigned to the current user"""
        tasks = self.get_queryset().filter(assigned_to=request.user)
        page = self.paginate_queryset(tasks)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Mark a task as completed"""
        from django.utils import timezone
        task = self.get_object()
        task.status = 'done'
        task.completed_at = timezone.now()
        task.save(update_fields=['status', 'completed_at', 'updated_at'])
        serializer = self.get_serializer(task)
        return Response(serializer.data)


class MilestoneViewSet(viewsets.ModelViewSet):
    serializer_class = MilestoneSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['project', 'status']
    ordering_fields = ['target_date', 'created_at']
    ordering = ['target_date']
    
    def get_queryset(self):
        # Users can see milestones from projects they're part of
        user_projects = Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).values_list('id', flat=True)
        
        return Milestone.objects.filter(
            project_id__in=user_projects
        ).select_related('project')
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Mark a milestone as completed"""
        from django.utils import timezone
        milestone = self.get_object()
        milestone.status = 'completed'
        milestone.completed_at = timezone.now()
        milestone.save(update_fields=['status', 'completed_at', 'updated_at'])
        serializer = self.get_serializer(milestone)
        return Response(serializer.data)
