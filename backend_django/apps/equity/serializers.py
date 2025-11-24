from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import EquityCalculation, VestingSchedule, CapTable
from apps.projects.serializers import ProjectSerializer

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class EquityCalculationSerializer(serializers.ModelSerializer):
    member_details = UserBriefSerializer(source='member', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    
    class Meta:
        model = EquityCalculation
        fields = [
            'id', 'project', 'project_name', 'member', 'member_details',
            'idea_contribution', 'time_commitment', 'capital_investment',
            'skills_expertise', 'risk_taken', 'calculated_equity',
            'agreed_equity', 'role', 'notes', 'calculation_details',
            'is_approved', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class VestingScheduleSerializer(serializers.ModelSerializer):
    member_name = serializers.CharField(source='equity_calculation.member.username', read_only=True)
    
    class Meta:
        model = VestingSchedule
        fields = [
            'id', 'equity_calculation', 'member_name', 'schedule_type',
            'total_equity', 'cliff_months', 'vesting_period_months',
            'start_date', 'cliff_date', 'end_date', 'milestones',
            'vested_percentage', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class CapTableSerializer(serializers.ModelSerializer):
    shareholder_details = UserBriefSerializer(source='shareholder', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    
    class Meta:
        model = CapTable
        fields = [
            'id', 'project', 'project_name', 'shareholder', 'shareholder_details',
            'shareholder_name', 'shareholder_type', 'shares', 'ownership_percentage',
            'investment_amount', 'investment_date', 'share_class', 'notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
