from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import GlobalLocation, OTPVerification

User = get_user_model()


class GlobalLocationSerializer(serializers.ModelSerializer):
    coordinates = serializers.SerializerMethodField()
    
    class Meta:
        model = GlobalLocation
        fields = ['country', 'city', 'timezone', 'coordinates', 'region', 'language']
    
    def get_coordinates(self, obj):
        if obj.latitude and obj.longitude:
            return {'lat': float(obj.latitude), 'lng': float(obj.longitude)}
        return None


class UserSerializer(serializers.ModelSerializer):
    global_location = GlobalLocationSerializer(read_only=True)
    full_name = serializers.ReadOnlyField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'full_name',
            'profile_image', 'whatsapp_number', 'country_code',
            'is_verified', 'email_verified', 'phone_verified', 'safety_score',
            'premium_tier', 'onboarding_complete', 'user_intent', 'user_stage', 'user_mask', 'user_role',
            'global_location', 'created_at', 'updated_at', 'last_active',
            'email_notifications', 'push_notifications'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_verified', 'safety_score']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'confirm_password',
            'first_name', 'last_name', 'whatsapp_number', 'country_code'
        ]
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class PasswordResetRequestSerializer(serializers.Serializer):
    whatsapp_number = serializers.CharField()
    country_code = serializers.CharField(default='+1')


class PasswordResetVerifySerializer(serializers.Serializer):
    whatsapp_number = serializers.CharField()
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        return data


class UsernameRecoveryRequestSerializer(serializers.Serializer):
    whatsapp_number = serializers.CharField()
    country_code = serializers.CharField(default='+1')


class UsernameRecoveryVerifySerializer(serializers.Serializer):
    whatsapp_number = serializers.CharField()
    otp = serializers.CharField(max_length=6)


class OnboardingDataSerializer(serializers.Serializer):
    """Serializer for comprehensive onboarding data"""
    # User fields
    user_intent = serializers.CharField(required=False)
    user_stage = serializers.CharField(required=False)
    user_mask = serializers.CharField(required=False)
    user_role = serializers.CharField(required=False)
    onboarding_complete = serializers.BooleanField(required=False)
    
    # Mission & Values (from QuickSetup)
    mission_statement = serializers.CharField(required=False, allow_blank=True)
    whyHere = serializers.CharField(required=False, allow_blank=True)  # Alias
    selected_values = serializers.ListField(required=False)
    selectedValues = serializers.ListField(required=False)  # Alias
    
    # Background
    industries = serializers.ListField(required=False)
    yourIndustries = serializers.ListField(required=False)  # Alias
    skills = serializers.ListField(required=False)
    yourSkills = serializers.ListField(required=False)  # Alias
    experience = serializers.CharField(required=False, allow_blank=True)
    yourExperience = serializers.CharField(required=False, allow_blank=True)  # Alias
    background = serializers.CharField(required=False, allow_blank=True)
    yourBackground = serializers.CharField(required=False, allow_blank=True)  # Alias
    about_self = serializers.CharField(required=False, allow_blank=True)
    yourSelf = serializers.CharField(required=False, allow_blank=True)  # Alias
    birth_place = serializers.CharField(required=False, allow_blank=True)
    birthPlace = serializers.CharField(required=False, allow_blank=True)  # Alias
    
    # Pitch & Media
    pitch_text = serializers.CharField(required=False, allow_blank=True)
    pitchText = serializers.CharField(required=False, allow_blank=True)  # Alias
    pitch_format = serializers.CharField(required=False, allow_blank=True)
    pitchFormat = serializers.CharField(required=False, allow_blank=True)  # Alias
    has_voice_note = serializers.BooleanField(required=False)
    hasVoiceNote = serializers.BooleanField(required=False)  # Alias
    pitch_deck_file_name = serializers.CharField(required=False, allow_blank=True)
    pitchDeckFileName = serializers.CharField(required=False, allow_blank=True)  # Alias
    pitch_deck_file_size = serializers.CharField(required=False, allow_blank=True)
    pitchDeckFileSize = serializers.CharField(required=False, allow_blank=True)  # Alias
    
    # Cofounder Preferences (from AnonymousProfileFixed)
    cofounder_preferences = serializers.JSONField(required=False)
    cofounderPreferences = serializers.JSONField(required=False)  # Alias
    
    # Offer Skills Data (from OfferSkills)
    offer_skills_data = serializers.JSONField(required=False)
    offerSkillsPreferences = serializers.JSONField(required=False)  # Alias
    
    # Idea Sprint Data (from IdeaSprint)
    idea_sprint_data = serializers.JSONField(required=False)
    ideaSprintDetails = serializers.JSONField(required=False)  # Alias
