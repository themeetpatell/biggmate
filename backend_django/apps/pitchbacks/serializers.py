from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import PitchBack
from apps.pitches.serializers import PitchListSerializer, PitchSerializer
from apps.profiles.models import Profile
from apps.users.models import OnboardingData

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class PitchbackUserProfileSerializer(serializers.ModelSerializer):
    """Enhanced user serializer with profile and onboarding data for pitchbacks"""
    profile = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']
    
    def get_profile(self, obj):
        try:
            profile = Profile.objects.get(user=obj)
            onboarding = OnboardingData.objects.filter(user=obj).first()
            
            return {
                'role': profile.role,
                'bio': profile.bio,
                'avatar': profile.avatar,
                'location': profile.location,
                'skills': profile.skills or (onboarding.skills if onboarding else []),
                'experience': profile.experience or (onboarding.experience if onboarding else ''),
                'previous_startups': profile.previous_startups or [],
                'availability': profile.availability,
                'industries': profile.industries or (onboarding.industries if onboarding else []),
                'education': onboarding.education if onboarding else [],
                'work_experience': onboarding.work_experience if onboarding else [],
            }
        except Profile.DoesNotExist:
            return None


class PitchBackSerializer(serializers.ModelSerializer):
    sender_details = PitchbackUserProfileSerializer(source='sender', read_only=True)
    receiver_details = PitchbackUserProfileSerializer(source='receiver', read_only=True)
    pitch_details = PitchSerializer(source='pitch', read_only=True)
    
    class Meta:
        model = PitchBack
        fields = [
            'id', 'pitch', 'pitch_details', 'sender', 'sender_details',
            'receiver', 'receiver_details', 'role', 'message',
            'equity_offer', 'time_commitment', 'start_date', 'skills',
            'experience', 'motivation', 'status', 'compatibility_score',
            'created_at', 'updated_at', 'responded_at'
        ]
        read_only_fields = ['sender', 'receiver', 'status', 'compatibility_score', 'responded_at', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        pitch = validated_data['pitch']
        
        # Set sender as current user
        validated_data['sender'] = request.user
        
        # Set receiver as pitch author
        validated_data['receiver'] = pitch.author
        
        return super().create(validated_data)
    
    def validate(self, data):
        request = self.context.get('request')
        pitch = data.get('pitch')
        
        # Check if user is trying to pitchback to their own pitch
        if pitch.author == request.user:
            raise serializers.ValidationError("You cannot send a pitchback to your own pitch.")
        
        # Check if user has already sent a pitchback to this pitch
        if self.instance is None:  # Only check on creation
            existing = PitchBack.objects.filter(
                pitch=pitch,
                sender=request.user
            ).exists()
            if existing:
                raise serializers.ValidationError("You have already sent a pitchback to this pitch.")
        
        return data


class PitchBackListSerializer(serializers.ModelSerializer):
    sender_details = PitchbackUserProfileSerializer(source='sender', read_only=True)
    receiver_details = PitchbackUserProfileSerializer(source='receiver', read_only=True)
    pitch_details = PitchSerializer(source='pitch', read_only=True)
    
    class Meta:
        model = PitchBack
        fields = [
            'id', 'pitch', 'pitch_details', 'sender', 'sender_details',
            'receiver', 'receiver_details', 'role', 'message', 'skills',
            'experience', 'motivation', 'status', 'compatibility_score', 
            'created_at', 'responded_at'
        ]
