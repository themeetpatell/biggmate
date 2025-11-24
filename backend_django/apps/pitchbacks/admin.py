from django.contrib import admin
from .models import PitchBack


@admin.register(PitchBack)
class PitchBackAdmin(admin.ModelAdmin):
    list_display = ['sender', 'pitch', 'role', 'status', 'equity_offer', 'compatibility_score', 'created_at']
    list_filter = ['status', 'role', 'created_at']
    search_fields = ['sender__username', 'receiver__username', 'pitch__title', 'message']
    readonly_fields = ['created_at', 'updated_at', 'responded_at']
    fieldsets = (
        ('Relationships', {
            'fields': ('pitch', 'sender', 'receiver')
        }),
        ('Proposal', {
            'fields': ('role', 'message', 'equity_offer', 'time_commitment', 'start_date')
        }),
        ('Skills & Experience', {
            'fields': ('skills', 'experience', 'motivation')
        }),
        ('Status', {
            'fields': ('status', 'compatibility_score', 'responded_at')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
