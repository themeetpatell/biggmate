from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator


class Event(models.Model):
    TYPE_CHOICES = [
        ('workshop', 'Workshop'),
        ('webinar', 'Webinar'),
        ('networking', 'Networking'),
        ('conference', 'Conference'),
        ('meetup', 'Meetup'),
        ('pitch_event', 'Pitch Event'),
        ('hackathon', 'Hackathon'),
        ('other', 'Other'),
    ]
    
    CATEGORY_CHOICES = [
        ('technology', 'Technology'),
        ('business', 'Business'),
        ('marketing', 'Marketing'),
        ('design', 'Design'),
        ('finance', 'Finance'),
        ('startup', 'Startup'),
        ('entrepreneurship', 'Entrepreneurship'),
        ('other', 'Other'),
    ]
    
    # Basic information
    title = models.CharField(max_length=200)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    
    # Organizer
    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='organized_events'
    )
    
    # Date and time
    date = models.DateField()
    time = models.TimeField()
    duration_minutes = models.IntegerField(
        validators=[MinValueValidator(1)],
        help_text="Duration in minutes"
    )
    
    # Location
    location = models.CharField(max_length=255, blank=True, help_text="Physical location or 'Online'")
    location_details = models.TextField(blank=True, help_text="Additional location details or meeting link")
    is_online = models.BooleanField(default=False)
    meeting_link = models.URLField(blank=True, help_text="Online meeting link")
    
    # Pricing and capacity
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)],
        help_text="0 for free events"
    )
    capacity = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Maximum number of attendees (null for unlimited)"
    )
    registered_count = models.PositiveIntegerField(default=0)
    
    # Event details
    tags = models.JSONField(default=list, blank=True)
    speakers = models.JSONField(default=list, blank=True, help_text="List of speaker objects")
    agenda = models.JSONField(default=list, blank=True, help_text="Event agenda/schedule")
    
    # Media
    banner_image = models.URLField(blank=True)
    
    # Status
    is_published = models.BooleanField(default=True)
    is_cancelled = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['date', 'time']
        verbose_name = 'Event'
        verbose_name_plural = 'Events'
        indexes = [
            models.Index(fields=['date', 'time']),
            models.Index(fields=['type', 'date']),
            models.Index(fields=['category', 'date']),
            models.Index(fields=['organizer', '-created_at']),
            models.Index(fields=['is_published', 'date']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.date}"
    
    def is_full(self):
        """Check if the event is at capacity"""
        if self.capacity is None:
            return False
        return self.registered_count >= self.capacity
    
    def can_register(self):
        """Check if new registrations are allowed"""
        return not self.is_cancelled and not self.is_full()


class EventRegistration(models.Model):
    STATUS_CHOICES = [
        ('registered', 'Registered'),
        ('attended', 'Attended'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    ]
    
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name='registrations'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='event_registrations'
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='registered')
    
    # Registration details
    notes = models.TextField(blank=True, help_text="User's notes or questions")
    payment_status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('completed', 'Completed'),
            ('failed', 'Failed'),
            ('refunded', 'Refunded'),
        ],
        default='pending'
    )
    
    # Timestamps
    registered_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['event', 'user']
        ordering = ['-registered_at']
        verbose_name = 'Event Registration'
        verbose_name_plural = 'Event Registrations'
        indexes = [
            models.Index(fields=['event', 'status']),
            models.Index(fields=['user', '-registered_at']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.event.title}"
