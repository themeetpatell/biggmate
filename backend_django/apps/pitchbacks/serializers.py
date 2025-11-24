from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import PitchBack
from apps.pitches.serializers import PitchListSerializer

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class PitchBackSerializer(serializers.ModelSerializer):
    sender_details = UserBriefSerializer(source='sender', read_only=True)
    receiver_details = UserBriefSerializer(source='receiver', read_only=True)
    pitch_details = PitchListSerializer(source='pitch', read_only=True)
    
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
    sender_details = UserBriefSerializer(source='sender', read_only=True)
    pitch_details = PitchListSerializer(source='pitch', read_only=True)
    
    class Meta:
        model = PitchBack
        fields = [
            'id', 'pitch', 'pitch_details', 'sender', 'sender_details',
            'role', 'status', 'compatibility_score', 'created_at'
        ]
