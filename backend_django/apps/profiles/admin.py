from django.contrib import admin
from .models import Profile, PortfolioItem, Testimonial


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role', 'location', 'archetype', 'availability', 'is_public', 'profile_views']
    list_filter = ['archetype', 'availability', 'is_public', 'accepting_pitches']
    search_fields = ['user__username', 'role', 'bio', 'location']


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'profile', 'order', 'created_at']
    list_filter = ['created_at']
    search_fields = ['title', 'description']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'profile', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['author_name', 'content']
