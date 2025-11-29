from django.db import models
from django.conf import settings
from apps.projects.models import Project


class UserStakeholder(models.Model):
    """
    User-owned stakeholder for personal CRM functionality.
    This is independent of projects and owned directly by the user.
    """
    TYPE_CHOICES = [
        ('advisor', 'Advisor'),
        ('investor', 'Investor'),
        ('mentor', 'Mentor'),
        ('early-adopter', 'Early Adopter'),
        ('beta-tester', 'Beta Tester'),
        ('supporter', 'Supporter'),
        ('team-prospect', 'Team Prospect'),
        ('partner', 'Partner'),
        ('customer', 'Customer'),
        ('other', 'Other'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='personal_stakeholders'
    )
    
    # Basic information
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    company = models.CharField(max_length=200, blank=True)
    title = models.CharField(max_length=100, blank=True)
    
    # Stakeholder details
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='advisor')
    
    # Social links
    linkedin_url = models.URLField(blank=True)
    twitter_handle = models.CharField(max_length=100, blank=True)
    
    # Additional details
    tags = models.JSONField(default=list, blank=True)
    notes = models.TextField(blank=True)
    
    # Relationship tracking
    relationship_strength = models.IntegerField(default=5, help_text="1-10 scale")
    is_favorite = models.BooleanField(default=False)
    
    # Dates
    last_contact_date = models.DateField(null=True, blank=True)
    next_followup_date = models.DateField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'User Stakeholder'
        verbose_name_plural = 'User Stakeholders'
        indexes = [
            models.Index(fields=['user', 'type']),
            models.Index(fields=['user', 'is_favorite']),
            models.Index(fields=['user', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.type}) - {self.user.email}"


class Stakeholder(models.Model):
    TYPE_CHOICES = [
        ('investor', 'Investor'),
        ('advisor', 'Advisor'),
        ('mentor', 'Mentor'),
        ('partner', 'Partner'),
        ('customer', 'Customer'),
        ('supplier', 'Supplier'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('lead', 'Lead'),
        ('prospect', 'Prospect'),
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]
    
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='stakeholders'
    )
    added_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='added_stakeholders'
    )
    
    # Basic information
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    company = models.CharField(max_length=200, blank=True)
    position = models.CharField(max_length=100, blank=True)
    
    # Stakeholder details
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='lead')
    
    # Contact information
    linkedin_url = models.URLField(blank=True)
    website = models.URLField(blank=True)
    
    # Additional details
    tags = models.JSONField(default=list, blank=True)
    notes = models.TextField(blank=True)
    interests = models.JSONField(default=list, blank=True, help_text="Areas of interest")
    
    # Investment specific (for investors)
    investment_capacity = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Potential investment amount"
    )
    investment_stage_preference = models.CharField(max_length=100, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_contact_date = models.DateField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Stakeholder'
        verbose_name_plural = 'Stakeholders'
        indexes = [
            models.Index(fields=['project', 'type']),
            models.Index(fields=['project', 'status']),
            models.Index(fields=['type', 'status']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.type}) - {self.project.name}"


class Interaction(models.Model):
    TYPE_CHOICES = [
        ('email', 'Email'),
        ('call', 'Phone Call'),
        ('meeting', 'Meeting'),
        ('pitch', 'Pitch'),
        ('demo', 'Demo'),
        ('note', 'Note'),
        ('other', 'Other'),
    ]
    
    OUTCOME_CHOICES = [
        ('positive', 'Positive'),
        ('neutral', 'Neutral'),
        ('negative', 'Negative'),
        ('pending', 'Pending'),
    ]
    
    stakeholder = models.ForeignKey(
        Stakeholder,
        on_delete=models.CASCADE,
        related_name='interactions'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='stakeholder_interactions'
    )
    
    # Interaction details
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    title = models.CharField(max_length=200)
    description = models.TextField()
    outcome = models.CharField(max_length=20, choices=OUTCOME_CHOICES, default='pending')
    
    # Dates
    interaction_date = models.DateTimeField()
    next_followup_date = models.DateField(null=True, blank=True)
    
    # Additional details
    attachments = models.JSONField(default=list, blank=True, help_text="List of attachment URLs")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-interaction_date']
        verbose_name = 'Interaction'
        verbose_name_plural = 'Interactions'
        indexes = [
            models.Index(fields=['stakeholder', '-interaction_date']),
            models.Index(fields=['user', '-interaction_date']),
        ]
    
    def __str__(self):
        return f"{self.type}: {self.title} with {self.stakeholder.name}"


class Pipeline(models.Model):
    STAGE_CHOICES = [
        ('initial_contact', 'Initial Contact'),
        ('qualified', 'Qualified'),
        ('pitch_scheduled', 'Pitch Scheduled'),
        ('pitch_completed', 'Pitch Completed'),
        ('negotiation', 'Negotiation'),
        ('committed', 'Committed'),
        ('closed_won', 'Closed Won'),
        ('closed_lost', 'Closed Lost'),
    ]
    
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='pipelines'
    )
    stakeholder = models.ForeignKey(
        Stakeholder,
        on_delete=models.CASCADE,
        related_name='pipeline_entries'
    )
    
    # Pipeline details
    stage = models.CharField(max_length=30, choices=STAGE_CHOICES, default='initial_contact')
    deal_value = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Expected deal/investment value"
    )
    probability = models.IntegerField(
        default=0,
        help_text="Success probability (0-100)"
    )
    
    # Dates
    expected_close_date = models.DateField(null=True, blank=True)
    actual_close_date = models.DateField(null=True, blank=True)
    
    # Notes
    notes = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Pipeline Entry'
        verbose_name_plural = 'Pipeline'
        unique_together = ['project', 'stakeholder']
        indexes = [
            models.Index(fields=['project', 'stage']),
            models.Index(fields=['stage', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.stakeholder.name} - {self.stage} ({self.project.name})"
