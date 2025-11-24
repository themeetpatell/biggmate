from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.pitches.models import Pitch


class PitchBack(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
        ('withdrawn', 'Withdrawn'),
    ]
    
    ROLE_CHOICES = [
        ('cofounder', 'Co-Founder'),
        ('technical_lead', 'Technical Lead'),
        ('cto', 'CTO'),
        ('cmo', 'CMO'),
        ('coo', 'COO'),
        ('advisor', 'Advisor'),
        ('developer', 'Developer'),
        ('designer', 'Designer'),
        ('marketer', 'Marketer'),
        ('sales', 'Sales Lead'),
        ('investor', 'Investor'),
        ('other', 'Other'),
    ]
    
    # Relationships
    pitch = models.ForeignKey(
        Pitch,
        on_delete=models.CASCADE,
        related_name='pitchbacks'
    )
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_pitchbacks'
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='received_pitchbacks'
    )
    
    # Proposal Details
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    message = models.TextField()
    equity_offer = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True,
        blank=True,
        help_text="Equity percentage offered (0-100)"
    )
    time_commitment = models.CharField(
        max_length=100,
        blank=True,
        help_text="e.g., Full-time, Part-time, 10 hours/week"
    )
    start_date = models.DateField(null=True, blank=True)
    
    # Skills & Experience
    skills = models.JSONField(default=list, blank=True)
    experience = models.TextField(blank=True)
    motivation = models.TextField(blank=True)
    
    # Status & Compatibility
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    compatibility_score = models.FloatField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    responded_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'PitchBack'
        verbose_name_plural = 'PitchBacks'
        unique_together = ['pitch', 'sender']  # One pitchback per user per pitch
        indexes = [
            models.Index(fields=['pitch', '-created_at']),
            models.Index(fields=['sender', '-created_at']),
            models.Index(fields=['receiver', '-created_at']),
            models.Index(fields=['status', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.sender.username} → {self.pitch.title} ({self.role})"
    
    def accept(self):
        self.status = 'accepted'
        self.responded_at = models.functions.Now()
        self.save(update_fields=['status', 'responded_at', 'updated_at'])
    
    def decline(self):
        self.status = 'declined'
        self.responded_at = models.functions.Now()
        self.save(update_fields=['status', 'responded_at', 'updated_at'])
    
    def withdraw(self):
        self.status = 'withdrawn'
        self.save(update_fields=['status', 'updated_at'])
