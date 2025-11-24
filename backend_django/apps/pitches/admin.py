from django.contrib import admin
from .models import Pitch, SavedPitch


@admin.register(Pitch)
class PitchAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'stage', 'is_public', 'views_count', 'saves_count', 'created_at']
    list_filter = ['stage', 'is_public', 'created_at']
    search_fields = ['title', 'tagline', 'description', 'author__username']
    readonly_fields = ['views_count', 'saves_count', 'created_at', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'tagline', 'description', 'author', 'is_public')
        }),
        ('Problem & Solution', {
            'fields': ('problem', 'solution', 'competitive_advantage')
        }),
        ('Market & Business', {
            'fields': ('market_size', 'target_market', 'business_model', 'funding_needs', 'timeline')
        }),
        ('Team & Requirements', {
            'fields': ('team', 'skills_needed', 'industries', 'stage')
        }),
        ('Media', {
            'fields': ('video_url', 'audio_url', 'deck_url')
        }),
        ('Metrics', {
            'fields': ('views_count', 'saves_count', 'created_at', 'updated_at')
        }),
    )


@admin.register(SavedPitch)
class SavedPitchAdmin(admin.ModelAdmin):
    list_display = ['user', 'pitch', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'pitch__title']
    readonly_fields = ['created_at']
