from django.contrib import admin
from .models import SkillProfile, ServicePackage, ClientProject


@admin.register(SkillProfile)
class SkillProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'experience_level', 'years_of_experience', 'available_for_hire', 'hourly_rate']
    list_filter = ['experience_level', 'available_for_hire', 'created_at']
    search_fields = ['user__username', 'skills', 'industries', 'bio']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(ServicePackage)
class ServicePackageAdmin(admin.ModelAdmin):
    list_display = ['name', 'provider', 'package_type', 'price', 'delivery_time_days', 'is_active']
    list_filter = ['package_type', 'is_active', 'created_at']
    search_fields = ['name', 'description', 'provider__username']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(ClientProject)
class ClientProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'client', 'service_provider', 'status', 'budget', 'deadline', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['title', 'description', 'client__username', 'service_provider__username']
    readonly_fields = ['completed_at', 'created_at', 'updated_at']
