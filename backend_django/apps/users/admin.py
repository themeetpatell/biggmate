from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, GlobalLocation, OTPVerification
from .models_onboarding import (
    ValueCategory, Value, Intent, Industry, Skill, ExperienceLevel
)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'full_name', 'is_verified', 'premium_tier', 'created_at']
    list_filter = ['is_verified', 'premium_tier', 'user_intent', 'onboarding_complete']
    search_fields = ['username', 'email', 'first_name', 'last_name', 'whatsapp_number']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Profile Information', {
            'fields': ('profile_image', 'whatsapp_number', 'country_code', 'user_intent')
        }),
        ('Verification & Safety', {
            'fields': ('is_verified', 'email_verified', 'phone_verified', 'safety_score')
        }),
        ('Premium & Onboarding', {
            'fields': ('premium_tier', 'onboarding_complete')
        }),
        ('Settings', {
            'fields': ('email_notifications', 'push_notifications')
        }),
    )


@admin.register(GlobalLocation)
class GlobalLocationAdmin(admin.ModelAdmin):
    list_display = ['user', 'city', 'country', 'timezone', 'region']
    search_fields = ['user__username', 'city', 'country']


@admin.register(OTPVerification)
class OTPVerificationAdmin(admin.ModelAdmin):
    list_display = ['whatsapp_number', 'purpose', 'otp', 'is_used', 'expires_at', 'created_at']
    list_filter = ['purpose', 'is_used']
    search_fields = ['whatsapp_number', 'otp']


# Onboarding Options Admin
@admin.register(ValueCategory)
class ValueCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'created_at']
    ordering = ['order']


@admin.register(Value)
class ValueAdmin(admin.ModelAdmin):
    list_display = ['name', 'value_id', 'category', 'order', 'created_at']
    list_filter = ['category']
    search_fields = ['name', 'value_id']
    ordering = ['category__order', 'order']


@admin.register(Intent)
class IntentAdmin(admin.ModelAdmin):
    list_display = ['title', 'intent_id', 'icon', 'order', 'created_at']
    search_fields = ['title', 'intent_id']
    ordering = ['order']


@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'created_at']
    search_fields = ['name']
    ordering = ['order']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'created_at']
    search_fields = ['name']
    ordering = ['order']


@admin.register(ExperienceLevel)
class ExperienceLevelAdmin(admin.ModelAdmin):
    list_display = ['name', 'level_id', 'description', 'order', 'created_at']
    search_fields = ['name', 'level_id']
    ordering = ['order']
