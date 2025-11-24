from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Match, Connection, CompatibilityScore

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class MatchSerializer(serializers.ModelSerializer):
    user1_details = UserBriefSerializer(source='user1', read_only=True)
    user2_details = UserBriefSerializer(source='user2', read_only=True)
    match_partner = serializers.SerializerMethodField()
    
    class Meta:
        model = Match
        fields = [
            'id', 'user1', 'user1_details', 'user2', 'user2_details',
            'match_partner', 'compatibility_score', 'status',
            'match_reasons', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def get_match_partner(self, obj):
        """Get the other user in the match relative to the request user"""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            if obj.user1 == request.user:
                return UserBriefSerializer(obj.user2).data
            elif obj.user2 == request.user:
                return UserBriefSerializer(obj.user1).data
        return None


class ConnectionSerializer(serializers.ModelSerializer):
    user_details = UserBriefSerializer(source='user', read_only=True)
    connected_user_details = UserBriefSerializer(source='connected_user', read_only=True)
    
    class Meta:
        model = Connection
        fields = [
            'id', 'user', 'user_details', 'connected_user',
            'connected_user_details', 'status', 'message',
            'created_at', 'updated_at', 'responded_at'
        ]
        read_only_fields = ['user', 'status', 'created_at', 'updated_at', 'responded_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user
        return super().create(validated_data)
    
    def validate(self, data):
        request = self.context.get('request')
        connected_user = data.get('connected_user')
        
        # Check if trying to connect with self
        if connected_user == request.user:
            raise serializers.ValidationError("You cannot connect with yourself.")
        
        # Check if connection already exists
        if self.instance is None:  # Only check on creation
            existing = Connection.objects.filter(
                user=request.user,
                connected_user=connected_user
            ).exists()
            if existing:
                raise serializers.ValidationError("Connection request already exists.")
        
        return data


class CompatibilityScoreSerializer(serializers.ModelSerializer):
    user1_details = UserBriefSerializer(source='user1', read_only=True)
    user2_details = UserBriefSerializer(source='user2', read_only=True)
    
    class Meta:
        model = CompatibilityScore
        fields = [
            'id', 'user1', 'user1_details', 'user2', 'user2_details',
            'overall_score', 'skills_score', 'interests_score',
            'goals_score', 'experience_score', 'score_details',
            'calculated_at'
        ]
        read_only_fields = ['calculated_at']
