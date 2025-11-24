from django.contrib import admin
from .models import Event, EventRegistration


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'category', 'date', 'time', 'organizer', 'registered_count', 'capacity', 'is_published', 'is_cancelled']
    list_filter = ['type', 'category', 'is_online', 'is_published', 'is_cancelled', 'date']
    search_fields = ['title', 'description', 'location', 'organizer__username']
    readonly_fields = ['registered_count', 'created_at', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'type', 'category', 'organizer')
        }),
        ('Date & Time', {
            'fields': ('date', 'time', 'duration_minutes')
        }),
        ('Location', {
            'fields': ('location', 'location_details', 'is_online', 'meeting_link')
        }),
        ('Pricing & Capacity', {
            'fields': ('price', 'capacity', 'registered_count')
        }),
        ('Details', {
            'fields': ('tags', 'speakers', 'agenda', 'banner_image')
        }),
        ('Status', {
            'fields': ('is_published', 'is_cancelled')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ['event', 'user', 'status', 'payment_status', 'registered_at']
    list_filter = ['status', 'payment_status', 'registered_at']
    search_fields = ['event__title', 'user__username']
    readonly_fields = ['registered_at', 'updated_at']
    fieldsets = (
        ('Registration', {
            'fields': ('event', 'user', 'status')
        }),
        ('Details', {
            'fields': ('notes', 'payment_status')
        }),
        ('Timestamps', {
            'fields': ('registered_at', 'updated_at')
        }),
    )
