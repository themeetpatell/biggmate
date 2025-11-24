from django.contrib import admin
from .models import ServiceProvider, ServiceListing, Inquiry


@admin.register(ServiceProvider)
class ServiceProviderAdmin(admin.ModelAdmin):
    list_display = ['business_name', 'user', 'rating', 'reviews_count', 'is_verified', 'is_active', 'created_at']
    list_filter = ['is_verified', 'is_active', 'created_at']
    search_fields = ['business_name', 'description', 'user__username']
    readonly_fields = ['rating', 'reviews_count', 'created_at', 'updated_at']


@admin.register(ServiceListing)
class ServiceListingAdmin(admin.ModelAdmin):
    list_display = ['title', 'provider', 'category', 'starting_price', 'price_type', 'is_active', 'views_count']
    list_filter = ['category', 'price_type', 'is_active', 'created_at']
    search_fields = ['title', 'description', 'provider__business_name']
    readonly_fields = ['views_count', 'created_at', 'updated_at']


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ['listing', 'sender', 'status', 'budget', 'created_at', 'responded_at']
    list_filter = ['status', 'created_at']
    search_fields = ['listing__title', 'sender__username', 'message']
    readonly_fields = ['responded_at', 'created_at', 'updated_at']
