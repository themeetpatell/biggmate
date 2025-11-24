from django.db import models
from django.conf import settings


class Profile(models.Model):
    """Entrepreneur Profile"""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    
    # Basic info
    role = models.CharField(max_length=100)
    bio = models.TextField()
    tagline = models.CharField(max_length=200, blank=True)
    
    # Media
    avatar = models.URLField(blank=True)
    cover_image = models.URLField(blank=True)
    
    # Professional details
    skills = models.JSONField(default=list)  # List of skills
    experience = models.CharField(max_length=100)
    previous_startups = models.JSONField(default=list)  # List of previous startups
    location = models.CharField(max_length=200)
    
    # Looking for
    looking_for = models.JSONField(default=list)  # Roles they're looking for
    industries = models.JSONField(default=list)  # Industries of interest
    
    # Archetype
    archetype = models.CharField(
        max_length=50,
        choices=[
            ('visionary', 'Visionary'),
            ('executor', 'Executor'),
            ('hustler', 'Hustler'),
            ('technologist', 'Technologist'),
            ('designer', 'Designer'),
            ('marketer', 'Marketer'),
        ],
        null=True,
        blank=True
    )
    
    # Availability
    availability = models.CharField(
        max_length=50,
        choices=[
            ('full-time', 'Full Time'),
            ('part-time', 'Part Time'),
            ('weekends', 'Weekends'),
            ('flexible', 'Flexible'),
        ],
        default='full-time'
    )
    
    # Stage preference
    stage_preference = models.JSONField(default=list)  # ['idea', 'mvp', 'early', 'growth']
    
    # Social links
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    website_url = models.URLField(blank=True)
    
    # Stats
    profile_views = models.IntegerField(default=0)
    pitch_responses = models.IntegerField(default=0)
    successful_matches = models.IntegerField(default=0)
    
    # Visibility
    is_public = models.BooleanField(default=True)
    accepting_pitches = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'profiles'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username}'s profile"


class PortfolioItem(models.Model):
    """Portfolio items for profiles"""
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='portfolio_items')
    title = models.CharField(max_length=200)
    description = models.TextField()
    image_url = models.URLField()
    project_url = models.URLField(blank=True)
    technologies = models.JSONField(default=list)
    order = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'portfolio_items'
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return self.title


class Testimonial(models.Model):
    """Testimonials for profiles"""
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='testimonials')
    author_name = models.CharField(max_length=100)
    author_role = models.CharField(max_length=100)
    author_avatar = models.URLField(blank=True)
    content = models.TextField()
    rating = models.IntegerField(default=5)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'testimonials'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Testimonial by {self.author_name}"
