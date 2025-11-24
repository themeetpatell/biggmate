from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import IdeaValidation, MarketResearch, MVPPlan, RevenueModel

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class IdeaValidationSerializer(serializers.ModelSerializer):
    created_by_details = UserBriefSerializer(source='created_by', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    
    class Meta:
        model = IdeaValidation
        fields = [
            'id', 'project', 'project_name', 'created_by', 'created_by_details',
            'idea_name', 'problem_statement', 'solution_description',
            'target_audience', 'validation_methods', 'survey_results',
            'interview_notes', 'strengths', 'weaknesses', 'opportunities',
            'threats', 'validation_score', 'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['created_by'] = request.user
        return super().create(validated_data)


class MarketResearchSerializer(serializers.ModelSerializer):
    created_by_details = UserBriefSerializer(source='created_by', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    
    class Meta:
        model = MarketResearch
        fields = [
            'id', 'project', 'project_name', 'created_by', 'created_by_details',
            'market_name', 'market_size', 'growth_rate', 'target_segments',
            'customer_personas', 'competitors', 'competitive_advantages',
            'trends', 'opportunities', 'barriers', 'pricing_data', 'sources',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['created_by'] = request.user
        return super().create(validated_data)


class MVPPlanSerializer(serializers.ModelSerializer):
    created_by_details = UserBriefSerializer(source='created_by', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    
    class Meta:
        model = MVPPlan
        fields = [
            'id', 'project', 'project_name', 'created_by', 'created_by_details',
            'name', 'description', 'goals', 'core_features', 'nice_to_have_features',
            'tech_stack', 'infrastructure_needs', 'team_requirements',
            'estimated_budget', 'estimated_timeline_weeks', 'success_metrics',
            'launch_strategy', 'target_users_count', 'status',
            'completion_percentage', 'planned_start_date', 'planned_launch_date',
            'actual_launch_date', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['created_by'] = request.user
        return super().create(validated_data)


class RevenueModelSerializer(serializers.ModelSerializer):
    created_by_details = UserBriefSerializer(source='created_by', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    
    class Meta:
        model = RevenueModel
        fields = [
            'id', 'project', 'project_name', 'created_by', 'created_by_details',
            'name', 'model_type', 'description', 'pricing_tiers',
            'revenue_streams', 'projections', 'cost_structure', 'key_metrics',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['created_by'] = request.user
        return super().create(validated_data)
