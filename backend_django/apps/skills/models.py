from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator


class SkillProfile(models.Model):
    EXPERIENCE_CHOICES = [
        ('beginner', 'Beginner (0-1 years)'),
        ('intermediate', 'Intermediate (1-3 years)'),
        ('advanced', 'Advanced (3-5 years)'),
        ('expert', 'Expert (5+ years)'),
    ]
    
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='skill_profile'
    )
    
    # Skills
    skills = models.JSONField(default=list, blank=True, help_text="List of skills")
    primary_skills = models.JSONField(default=list, blank=True, help_text="Top 3-5 primary skills")
    industries = models.JSONField(default=list, blank=True, help_text="Industries of expertise")
    
    # Experience
    years_of_experience = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    experience_level = models.CharField(
        max_length=20,
        choices=EXPERIENCE_CHOICES,
        default='beginner'
    )
    
    # Profile details
    bio = models.TextField(blank=True)
    portfolio_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    
    # Availability
    available_for_hire = models.BooleanField(default=False)
    hourly_rate = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)]
    )
    available_hours_per_week = models.IntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)]
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Skill Profile'
        verbose_name_plural = 'Skill Profiles'
    
    def __str__(self):
        return f"{self.user.username}'s Skills"


class ServicePackage(models.Model):
    PACKAGE_TYPE_CHOICES = [
        ('basic', 'Basic'),
        ('standard', 'Standard'),
        ('premium', 'Premium'),
        ('custom', 'Custom'),
    ]
    
    provider = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='service_packages'
    )
    name = models.CharField(max_length=200)
    description = models.TextField()
    package_type = models.CharField(max_length=20, choices=PACKAGE_TYPE_CHOICES)
    
    # Pricing
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    
    # Package details
    deliverables = models.JSONField(default=list, blank=True)
    delivery_time_days = models.IntegerField(
        validators=[MinValueValidator(1)],
        help_text="Delivery time in days"
    )
    revisions = models.IntegerField(
        default=1,
        validators=[MinValueValidator(0)]
    )
    
    # Status
    is_active = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['package_type', 'price']
        verbose_name = 'Service Package'
        verbose_name_plural = 'Service Packages'
        indexes = [
            models.Index(fields=['provider', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.provider.username} - {self.name}"


class ClientProject(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='client_projects'
    )
    service_provider = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='provider_projects'
    )
    package = models.ForeignKey(
        ServicePackage,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='projects'
    )
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Project details
    budget = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    requirements = models.JSONField(default=dict, blank=True)
    
    # Dates
    start_date = models.DateField(null=True, blank=True)
    deadline = models.DateField()
    completed_at = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Client Project'
        verbose_name_plural = 'Client Projects'
        indexes = [
            models.Index(fields=['client', 'status']),
            models.Index(fields=['service_provider', 'status']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.client.username} → {self.service_provider.username}"
