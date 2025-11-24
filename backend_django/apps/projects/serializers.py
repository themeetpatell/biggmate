from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Project, TeamMember, Task, Milestone

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class TeamMemberSerializer(serializers.ModelSerializer):
    user_details = UserBriefSerializer(source='user', read_only=True)
    
    class Meta:
        model = TeamMember
        fields = ['id', 'project', 'user', 'user_details', 'role', 'responsibilities', 'joined_at']
        read_only_fields = ['joined_at']


class TaskSerializer(serializers.ModelSerializer):
    assigned_to_details = UserBriefSerializer(source='assigned_to', read_only=True)
    created_by_details = UserBriefSerializer(source='created_by', read_only=True)
    
    class Meta:
        model = Task
        fields = [
            'id', 'project', 'title', 'description', 'status', 'priority',
            'assigned_to', 'assigned_to_details', 'created_by', 'created_by_details',
            'due_date', 'completed_at', 'tags', 'estimated_hours', 'actual_hours',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['created_by'] = request.user
        return super().create(validated_data)


class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = [
            'id', 'project', 'title', 'description', 'status',
            'target_date', 'completed_at', 'deliverables',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class ProjectSerializer(serializers.ModelSerializer):
    owner_details = UserBriefSerializer(source='owner', read_only=True)
    team_members = TeamMemberSerializer(many=True, read_only=True)
    tasks_count = serializers.SerializerMethodField()
    milestones_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'owner', 'owner_details', 'status',
            'start_date', 'end_date', 'budget', 'tags', 'goals',
            'team_members', 'tasks_count', 'milestones_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['owner', 'created_at', 'updated_at']
    
    def get_tasks_count(self, obj):
        return obj.tasks.count()
    
    def get_milestones_count(self, obj):
        return obj.milestones.count()
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['owner'] = request.user
        return super().create(validated_data)


class ProjectListSerializer(serializers.ModelSerializer):
    owner_details = UserBriefSerializer(source='owner', read_only=True)
    tasks_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'status', 'owner', 'owner_details',
            'tasks_count', 'start_date', 'end_date', 'created_at'
        ]
    
    def get_tasks_count(self, obj):
        return obj.tasks.count()
