from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Pitch, SavedPitch

User = get_user_model()


class PitchAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class PitchSerializer(serializers.ModelSerializer):
    author_details = PitchAuthorSerializer(source='author', read_only=True)
    is_saved = serializers.SerializerMethodField()
    
    class Meta:
        model = Pitch
        fields = [
            'id', 'title', 'tagline', 'description', 'problem', 'solution',
            'market_size', 'target_market', 'competitive_advantage',
            'business_model', 'funding_needs', 'timeline', 'team',
            'skills_needed', 'industries', 'stage', 'video_url',
            'audio_url', 'deck_url', 'author', 'author_details',
            'is_public', 'views_count', 'saves_count', 'is_saved',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['author', 'views_count', 'saves_count', 'created_at', 'updated_at']
    
    def get_is_saved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return SavedPitch.objects.filter(user=request.user, pitch=obj).exists()
        return False
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['author'] = request.user
        return super().create(validated_data)


class PitchListSerializer(serializers.ModelSerializer):
    author_details = PitchAuthorSerializer(source='author', read_only=True)
    
    class Meta:
        model = Pitch
        fields = [
            'id', 'title', 'tagline', 'stage', 'industries',
            'funding_needs', 'author', 'author_details',
            'views_count', 'saves_count', 'created_at'
        ]


class SavedPitchSerializer(serializers.ModelSerializer):
    pitch_details = PitchSerializer(source='pitch', read_only=True)
    
    class Meta:
        model = SavedPitch
        fields = ['id', 'pitch', 'pitch_details', 'created_at']
        read_only_fields = ['created_at']
