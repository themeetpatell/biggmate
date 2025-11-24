from rest_framework import serializers
from .models import Profile, PortfolioItem, Testimonial


class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = ['id', 'title', 'description', 'image_url', 'project_url', 'technologies', 'order', 'created_at']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'author_name', 'author_role', 'author_avatar', 'content', 'rating', 'created_at']


class ProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    full_name = serializers.CharField(source='user.full_name', read_only=True)
    portfolio_items = PortfolioItemSerializer(many=True, read_only=True)
    testimonials = TestimonialSerializer(many=True, read_only=True)
    
    class Meta:
        model = Profile
        fields = [
            'id', 'user_id', 'username', 'email', 'full_name',
            'role', 'bio', 'tagline', 'avatar', 'cover_image',
            'skills', 'experience', 'previous_startups', 'location',
            'looking_for', 'industries', 'archetype', 'availability',
            'stage_preference', 'linkedin_url', 'twitter_url', 'github_url', 'website_url',
            'profile_views', 'pitch_responses', 'successful_matches',
            'is_public', 'accepting_pitches',
            'portfolio_items', 'testimonials',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'profile_views', 'pitch_responses', 'successful_matches', 'created_at', 'updated_at']


class ProfileCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'role', 'bio', 'tagline', 'avatar', 'cover_image',
            'skills', 'experience', 'previous_startups', 'location',
            'looking_for', 'industries', 'archetype', 'availability',
            'stage_preference', 'linkedin_url', 'twitter_url', 'github_url', 'website_url',
            'is_public', 'accepting_pitches'
        ]
