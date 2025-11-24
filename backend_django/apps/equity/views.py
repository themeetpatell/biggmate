from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Sum
from .models import EquityCalculation, VestingSchedule, CapTable
from .serializers import (
    EquityCalculationSerializer, VestingScheduleSerializer, CapTableSerializer
)
from apps.projects.models import Project


class EquityCalculationViewSet(viewsets.ModelViewSet):
    serializer_class = EquityCalculationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['project', 'member', 'is_approved']
    ordering = ['-calculated_equity']
    
    def get_queryset(self):
        # Users can see equity calculations for projects they're part of
        user_projects = Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).values_list('id', flat=True)
        
        return EquityCalculation.objects.filter(
            Q(project_id__in=user_projects) | Q(member=self.request.user)
        ).select_related('project', 'member').distinct()
    
    @action(detail=False, methods=['get'])
    def my_equity(self, request):
        """Get equity calculations for the current user"""
        calculations = self.get_queryset().filter(member=request.user)
        serializer = self.get_serializer(calculations, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def calculate(self, request):
        """Calculate equity based on contribution factors"""
        # Get contribution factors from request
        idea = request.data.get('idea_contribution', 0)
        time = request.data.get('time_commitment', 0)
        capital = request.data.get('capital_investment', 0)
        skills = request.data.get('skills_expertise', 0)
        risk = request.data.get('risk_taken', 0)
        
        # Simple weighted calculation (can be customized)
        weights = {
            'idea': 0.15,
            'time': 0.25,
            'capital': 0.30,
            'skills': 0.20,
            'risk': 0.10
        }
        
        total_score = (
            idea * weights['idea'] +
            time * weights['time'] +
            capital / 100000 * weights['capital'] +  # Normalize capital
            skills * weights['skills'] +
            risk * weights['risk']
        )
        
        # Calculate equity percentage (simplified)
        calculated_equity = min(100, total_score)
        
        return Response({
            'calculated_equity': round(calculated_equity, 2),
            'breakdown': {
                'idea_contribution': round(idea * weights['idea'], 2),
                'time_commitment': round(time * weights['time'], 2),
                'capital_investment': round(capital / 100000 * weights['capital'], 2),
                'skills_expertise': round(skills * weights['skills'], 2),
                'risk_taken': round(risk * weights['risk'], 2)
            }
        })
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approve an equity calculation"""
        equity_calc = self.get_object()
        
        # Only project owner can approve
        if equity_calc.project.owner != request.user:
            return Response(
                {'error': 'Only the project owner can approve equity calculations'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        equity_calc.is_approved = True
        equity_calc.save(update_fields=['is_approved', 'updated_at'])
        
        serializer = self.get_serializer(equity_calc)
        return Response(serializer.data)


class VestingScheduleViewSet(viewsets.ModelViewSet):
    serializer_class = VestingScheduleSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['equity_calculation', 'schedule_type']
    ordering = ['-created_at']
    
    def get_queryset(self):
        # Users can see vesting schedules for their equity calculations or projects they own
        user_projects = Project.objects.filter(owner=self.request.user).values_list('id', flat=True)
        user_equity_calcs = EquityCalculation.objects.filter(member=self.request.user).values_list('id', flat=True)
        
        return VestingSchedule.objects.filter(
            Q(equity_calculation_id__in=user_equity_calcs) |
            Q(equity_calculation__project_id__in=user_projects)
        ).select_related('equity_calculation', 'equity_calculation__member').distinct()


class CapTableViewSet(viewsets.ModelViewSet):
    serializer_class = CapTableSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['project', 'shareholder_type', 'share_class']
    ordering = ['-ownership_percentage']
    
    def get_queryset(self):
        # Users can see cap table for projects they're part of
        user_projects = Project.objects.filter(
            Q(owner=self.request.user) |
            Q(team_members__user=self.request.user)
        ).values_list('id', flat=True)
        
        return CapTable.objects.filter(
            project_id__in=user_projects
        ).select_related('project', 'shareholder').distinct()
    
    @action(detail=False, methods=['get'])
    def project_summary(self, request):
        """Get cap table summary for a project"""
        project_id = request.query_params.get('project_id')
        if not project_id:
            return Response(
                {'error': 'project_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        entries = self.get_queryset().filter(project_id=project_id)
        
        # Calculate totals
        total_ownership = entries.aggregate(total=Sum('ownership_percentage'))['total'] or 0
        total_investment = entries.aggregate(total=Sum('investment_amount'))['total'] or 0
        
        serializer = self.get_serializer(entries, many=True)
        
        return Response({
            'entries': serializer.data,
            'summary': {
                'total_ownership_allocated': round(total_ownership, 2),
                'remaining_ownership': round(100 - total_ownership, 2),
                'total_investment': float(total_investment),
                'shareholder_count': entries.count()
            }
        })
