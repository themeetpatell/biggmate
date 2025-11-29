from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Pitch, SavedPitch, LikedPitch, PitchComment

User = get_user_model()


class PitchAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class PitchCommentSerializer(serializers.ModelSerializer):
    author_details = PitchAuthorSerializer(source='author', read_only=True)
    replies_count = serializers.SerializerMethodField()
    
    class Meta:
        model = PitchComment
        fields = ['id', 'pitch', 'author', 'author_details', 'content', 'parent', 'replies_count', 'created_at', 'updated_at']
        read_only_fields = ['author', 'created_at', 'updated_at']
    
    def get_replies_count(self, obj):
        return obj.replies.count()
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['author'] = request.user
        comment = super().create(validated_data)
        # Increment comments count on pitch
        comment.pitch.comments_count += 1
        comment.pitch.save(update_fields=['comments_count'])
        return comment


class PitchSerializer(serializers.ModelSerializer):
    author_details = PitchAuthorSerializer(source='author', read_only=True)
    is_saved = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = Pitch
        fields = [
            'id', 'title', 'tagline', 'description', 'problem', 'solution',
            'market_size', 'target_market', 'competitive_advantage',
            'business_model', 'funding_needs', 'timeline', 'team',
            'skills_needed', 'industries', 'stage', 'video_url',
            'audio_url', 'deck_url', 'author', 'author_details',
            'is_public', 'views_count', 'saves_count', 'likes_count', 'comments_count',
            'is_saved', 'is_liked', 'created_at', 'updated_at'
        ]
        read_only_fields = ['author', 'views_count', 'saves_count', 'likes_count', 'comments_count', 'created_at', 'updated_at']
    
    def get_is_saved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return SavedPitch.objects.filter(user=request.user, pitch=obj).exists()
        return False
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return LikedPitch.objects.filter(user=request.user, pitch=obj).exists()
        return False
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['author'] = request.user
        return super().create(validated_data)


class PitchListSerializer(serializers.ModelSerializer):
    author_details = PitchAuthorSerializer(source='author', read_only=True)
    is_saved = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = Pitch
        fields = [
            'id', 'title', 'tagline', 'stage', 'industries', 'skills_needed',
            'funding_needs', 'author', 'author_details',
            'views_count', 'saves_count', 'likes_count', 'comments_count',
            'is_saved', 'is_liked', 'created_at'
        ]
    
    def get_is_saved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return SavedPitch.objects.filter(user=request.user, pitch=obj).exists()
        return False
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return LikedPitch.objects.filter(user=request.user, pitch=obj).exists()
        return False


class SavedPitchSerializer(serializers.ModelSerializer):
    pitch_details = PitchSerializer(source='pitch', read_only=True)
    
    class Meta:
        model = SavedPitch
        fields = ['id', 'pitch', 'pitch_details', 'created_at']
        read_only_fields = ['created_at']
