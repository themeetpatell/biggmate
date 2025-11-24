from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import ServiceProvider, ServiceListing, Inquiry

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class ServiceProviderSerializer(serializers.ModelSerializer):
    user_details = UserBriefSerializer(source='user', read_only=True)
    
    class Meta:
        model = ServiceProvider
        fields = [
            'id', 'user', 'user_details', 'business_name', 'description',
            'tagline', 'categories', 'specializations', 'website',
            'portfolio_url', 'rating', 'reviews_count', 'is_verified',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'rating', 'reviews_count', 'is_verified', 'created_at', 'updated_at']


class ServiceListingSerializer(serializers.ModelSerializer):
    provider_details = ServiceProviderSerializer(source='provider', read_only=True)
    
    class Meta:
        model = ServiceListing
        fields = [
            'id', 'provider', 'provider_details', 'title', 'description',
            'category', 'tags', 'starting_price', 'price_type',
            'delivery_time_days', 'features', 'images', 'is_active',
            'views_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['provider', 'views_count', 'created_at', 'updated_at']


class ServiceListingListSerializer(serializers.ModelSerializer):
    provider_name = serializers.CharField(source='provider.business_name', read_only=True)
    provider_rating = serializers.DecimalField(source='provider.rating', max_digits=3, decimal_places=2, read_only=True)
    
    class Meta:
        model = ServiceListing
        fields = [
            'id', 'title', 'category', 'starting_price', 'price_type',
            'delivery_time_days', 'provider_name', 'provider_rating',
            'views_count', 'created_at'
        ]


class InquirySerializer(serializers.ModelSerializer):
    sender_details = UserBriefSerializer(source='sender', read_only=True)
    listing_details = ServiceListingListSerializer(source='listing', read_only=True)
    
    class Meta:
        model = Inquiry
        fields = [
            'id', 'listing', 'listing_details', 'sender', 'sender_details',
            'message', 'budget', 'timeline', 'requirements', 'status',
            'provider_response', 'responded_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['sender', 'status', 'provider_response', 'responded_at', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['sender'] = request.user
        return super().create(validated_data)
