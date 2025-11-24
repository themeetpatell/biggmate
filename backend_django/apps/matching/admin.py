from django.contrib import admin
from .models import Match, Connection, CompatibilityScore


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ['user1', 'user2', 'compatibility_score', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user1__username', 'user2__username']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Users', {
            'fields': ('user1', 'user2')
        }),
        ('Match Details', {
            'fields': ('compatibility_score', 'status', 'match_reasons')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(Connection)
class ConnectionAdmin(admin.ModelAdmin):
    list_display = ['user', 'connected_user', 'status', 'created_at', 'responded_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__username', 'connected_user__username']
    readonly_fields = ['created_at', 'updated_at', 'responded_at']
    fieldsets = (
        ('Users', {
            'fields': ('user', 'connected_user')
        }),
        ('Connection Details', {
            'fields': ('status', 'message')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'responded_at')
        }),
    )


@admin.register(CompatibilityScore)
class CompatibilityScoreAdmin(admin.ModelAdmin):
    list_display = ['user1', 'user2', 'overall_score', 'skills_score', 'interests_score', 'calculated_at']
    list_filter = ['calculated_at']
    search_fields = ['user1__username', 'user2__username']
    readonly_fields = ['calculated_at']
    fieldsets = (
        ('Users', {
            'fields': ('user1', 'user2')
        }),
        ('Scores', {
            'fields': ('overall_score', 'skills_score', 'interests_score', 'goals_score', 'experience_score')
        }),
        ('Details', {
            'fields': ('score_details', 'calculated_at')
        }),
    )
