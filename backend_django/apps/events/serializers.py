from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Event, EventRegistration

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class EventSerializer(serializers.ModelSerializer):
    organizer_details = UserBriefSerializer(source='organizer', read_only=True)
    is_full = serializers.SerializerMethodField()
    can_register = serializers.SerializerMethodField()
    is_registered = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'type', 'category', 'organizer',
            'organizer_details', 'date', 'time', 'duration_minutes',
            'location', 'location_details', 'is_online', 'meeting_link',
            'price', 'capacity', 'registered_count', 'tags', 'speakers',
            'agenda', 'banner_image', 'is_published', 'is_cancelled',
            'is_full', 'can_register', 'is_registered', 'created_at', 'updated_at'
        ]
        read_only_fields = ['organizer', 'registered_count', 'created_at', 'updated_at']
    
    def get_is_full(self, obj):
        return obj.is_full()
    
    def get_can_register(self, obj):
        return obj.can_register()
    
    def get_is_registered(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return EventRegistration.objects.filter(
                event=obj,
                user=request.user,
                status='registered'
            ).exists()
        return False
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['organizer'] = request.user
        return super().create(validated_data)


class EventListSerializer(serializers.ModelSerializer):
    organizer_name = serializers.CharField(source='organizer.username', read_only=True)
    is_full = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'type', 'category', 'date', 'time',
            'location', 'is_online', 'price', 'capacity',
            'registered_count', 'organizer_name', 'is_full',
            'is_cancelled', 'created_at'
        ]
    
    def get_is_full(self, obj):
        return obj.is_full()


class EventRegistrationSerializer(serializers.ModelSerializer):
    user_details = UserBriefSerializer(source='user', read_only=True)
    event_details = EventListSerializer(source='event', read_only=True)
    
    class Meta:
        model = EventRegistration
        fields = [
            'id', 'event', 'event_details', 'user', 'user_details',
            'status', 'notes', 'payment_status', 'registered_at', 'updated_at'
        ]
        read_only_fields = ['user', 'status', 'payment_status', 'registered_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        event = validated_data['event']
        
        # Check if user is already registered
        if EventRegistration.objects.filter(event=event, user=request.user).exists():
            raise serializers.ValidationError("You are already registered for this event.")
        
        # Check if event can accept registrations
        if not event.can_register():
            raise serializers.ValidationError("This event is full or cancelled.")
        
        validated_data['user'] = request.user
        
        # Set payment status
        if event.price == 0:
            validated_data['payment_status'] = 'completed'
        
        # Create registration
        registration = super().create(validated_data)
        
        # Increment registered count
        event.registered_count += 1
        event.save(update_fields=['registered_count'])
        
        return registration
