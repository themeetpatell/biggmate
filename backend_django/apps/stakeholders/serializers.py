from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Stakeholder, Interaction, Pipeline

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class StakeholderSerializer(serializers.ModelSerializer):
    added_by_details = UserBriefSerializer(source='added_by', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    interactions_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Stakeholder
        fields = [
            'id', 'project', 'project_name', 'added_by', 'added_by_details',
            'name', 'email', 'phone', 'company', 'position', 'type', 'status',
            'linkedin_url', 'website', 'tags', 'notes', 'interests',
            'investment_capacity', 'investment_stage_preference',
            'last_contact_date', 'interactions_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['added_by', 'created_at', 'updated_at']
    
    def get_interactions_count(self, obj):
        return obj.interactions.count()
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['added_by'] = request.user
        return super().create(validated_data)


class InteractionSerializer(serializers.ModelSerializer):
    user_details = UserBriefSerializer(source='user', read_only=True)
    stakeholder_name = serializers.CharField(source='stakeholder.name', read_only=True)
    
    class Meta:
        model = Interaction
        fields = [
            'id', 'stakeholder', 'stakeholder_name', 'user', 'user_details',
            'type', 'title', 'description', 'outcome', 'interaction_date',
            'next_followup_date', 'attachments', 'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user
        
        # Update stakeholder's last contact date
        stakeholder = validated_data['stakeholder']
        interaction_date = validated_data['interaction_date'].date()
        if not stakeholder.last_contact_date or interaction_date > stakeholder.last_contact_date:
            stakeholder.last_contact_date = interaction_date
            stakeholder.save(update_fields=['last_contact_date'])
        
        return super().create(validated_data)


class PipelineSerializer(serializers.ModelSerializer):
    stakeholder_details = StakeholderSerializer(source='stakeholder', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    
    class Meta:
        model = Pipeline
        fields = [
            'id', 'project', 'project_name', 'stakeholder', 'stakeholder_details',
            'stage', 'deal_value', 'probability', 'expected_close_date',
            'actual_close_date', 'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
