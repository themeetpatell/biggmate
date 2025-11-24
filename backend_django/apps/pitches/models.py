from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator, URLValidator


class Pitch(models.Model):
    STAGE_CHOICES = [
        ('idea', 'Idea'),
        ('validation', 'Validation'),
        ('prototype', 'Prototype'),
        ('mvp', 'MVP'),
        ('growth', 'Growth'),
        ('scaling', 'Scaling'),
    ]

    # Basic Information
    title = models.CharField(max_length=200)
    tagline = models.CharField(max_length=255)
    description = models.TextField()
    
    # Problem & Solution
    problem = models.TextField()
    solution = models.TextField()
    
    # Market Information
    market_size = models.CharField(max_length=100, blank=True)
    target_market = models.TextField()
    competitive_advantage = models.TextField()
    
    # Business Details
    business_model = models.TextField()
    funding_needs = models.DecimalField(
        max_digits=12, 
        decimal_places=2, 
        null=True, 
        blank=True,
        validators=[MinValueValidator(0)]
    )
    timeline = models.CharField(max_length=200, blank=True)
    
    # Team & Requirements
    team = models.JSONField(default=list, blank=True)  # List of team member objects
    skills_needed = models.JSONField(default=list, blank=True)  # List of required skills
    industries = models.JSONField(default=list, blank=True)  # List of industry tags
    
    # Stage & Media
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default='idea')
    video_url = models.URLField(blank=True, validators=[URLValidator()])
    audio_url = models.URLField(blank=True, validators=[URLValidator()])
    deck_url = models.URLField(blank=True, validators=[URLValidator()])
    
    # Author & Visibility
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='pitches'
    )
    is_public = models.BooleanField(default=True)
    
    # Metrics
    views_count = models.PositiveIntegerField(default=0)
    saves_count = models.PositiveIntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Pitch'
        verbose_name_plural = 'Pitches'
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['author', '-created_at']),
            models.Index(fields=['stage', '-created_at']),
            models.Index(fields=['is_public', '-created_at']),
        ]
    
    def __str__(self):
        return self.title
    
    def increment_views(self):
        self.views_count += 1
        self.save(update_fields=['views_count'])
    
    def increment_saves(self):
        self.saves_count += 1
        self.save(update_fields=['saves_count'])


class SavedPitch(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='saved_pitches'
    )
    pitch = models.ForeignKey(
        Pitch,
        on_delete=models.CASCADE,
        related_name='saved_by'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'pitch']
        ordering = ['-created_at']
        verbose_name = 'Saved Pitch'
        verbose_name_plural = 'Saved Pitches'
    
    def __str__(self):
        return f"{self.user.username} saved {self.pitch.title}"
