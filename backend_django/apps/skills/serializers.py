from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import SkillProfile, ServicePackage, ClientProject

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class SkillProfileSerializer(serializers.ModelSerializer):
    user_details = UserBriefSerializer(source='user', read_only=True)
    
    class Meta:
        model = SkillProfile
        fields = [
            'id', 'user', 'user_details', 'skills', 'primary_skills', 'industries',
            'years_of_experience', 'experience_level', 'bio', 'portfolio_url',
            'linkedin_url', 'github_url', 'available_for_hire', 'hourly_rate',
            'available_hours_per_week', 'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']


class ServicePackageSerializer(serializers.ModelSerializer):
    provider_details = UserBriefSerializer(source='provider', read_only=True)
    
    class Meta:
        model = ServicePackage
        fields = [
            'id', 'provider', 'provider_details', 'name', 'description',
            'package_type', 'price', 'deliverables', 'delivery_time_days',
            'revisions', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['provider', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['provider'] = request.user
        return super().create(validated_data)


class ClientProjectSerializer(serializers.ModelSerializer):
    client_details = UserBriefSerializer(source='client', read_only=True)
    service_provider_details = UserBriefSerializer(source='service_provider', read_only=True)
    package_details = ServicePackageSerializer(source='package', read_only=True)
    
    class Meta:
        model = ClientProject
        fields = [
            'id', 'client', 'client_details', 'service_provider',
            'service_provider_details', 'package', 'package_details',
            'title', 'description', 'status', 'budget', 'requirements',
            'start_date', 'deadline', 'completed_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['client', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['client'] = request.user
        return super().create(validated_data)
