from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator


class Match(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('rejected', 'Rejected'),
        ('expired', 'Expired'),
    ]
    
    user1 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='matches_as_user1'
    )
    user2 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='matches_as_user2'
    )
    compatibility_score = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Compatibility score from 0 to 100"
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Match reasons and details
    match_reasons = models.JSONField(
        default=dict,
        blank=True,
        help_text="Reasons for the match (skills, industries, goals, etc.)"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-compatibility_score', '-created_at']
        verbose_name = 'Match'
        verbose_name_plural = 'Matches'
        indexes = [
            models.Index(fields=['user1', '-compatibility_score']),
            models.Index(fields=['user2', '-compatibility_score']),
            models.Index(fields=['status', '-created_at']),
        ]
        constraints = [
            models.CheckConstraint(
                check=~models.Q(user1=models.F('user2')),
                name='different_users'
            )
        ]
    
    def __str__(self):
        return f"{self.user1.username} ↔ {self.user2.username} ({self.compatibility_score}%)"


class Connection(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
        ('blocked', 'Blocked'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_connections'
    )
    connected_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='received_connections'
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    message = models.TextField(blank=True, help_text="Connection request message")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    responded_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Connection'
        verbose_name_plural = 'Connections'
        unique_together = ['user', 'connected_user']
        indexes = [
            models.Index(fields=['user', 'status']),
            models.Index(fields=['connected_user', 'status']),
            models.Index(fields=['-created_at']),
        ]
    
    def __str__(self):
        return f"{self.user.username} → {self.connected_user.username} ({self.status})"
    
    @classmethod
    def are_connected(cls, user1, user2):
        """Check if two users are connected"""
        return cls.objects.filter(
            models.Q(user=user1, connected_user=user2, status='accepted') |
            models.Q(user=user2, connected_user=user1, status='accepted')
        ).exists()


class CompatibilityScore(models.Model):
    """Store detailed compatibility scores between users"""
    user1 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='compatibility_scores_as_user1'
    )
    user2 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='compatibility_scores_as_user2'
    )
    
    # Score breakdowns
    overall_score = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    skills_score = models.FloatField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    interests_score = models.FloatField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    goals_score = models.FloatField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    experience_score = models.FloatField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    
    # Detailed breakdown
    score_details = models.JSONField(
        default=dict,
        blank=True,
        help_text="Detailed breakdown of compatibility factors"
    )
    
    # Timestamps
    calculated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-overall_score']
        verbose_name = 'Compatibility Score'
        verbose_name_plural = 'Compatibility Scores'
        unique_together = ['user1', 'user2']
        indexes = [
            models.Index(fields=['user1', '-overall_score']),
            models.Index(fields=['user2', '-overall_score']),
        ]
    
    def __str__(self):
        return f"{self.user1.username} ↔ {self.user2.username}: {self.overall_score}%"
