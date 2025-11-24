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
            'premium_tier', 'onboarding_complete', 'user_intent',
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
