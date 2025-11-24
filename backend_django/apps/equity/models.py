from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.projects.models import Project


class EquityCalculation(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='equity_calculations'
    )
    member = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='equity_calculations'
    )
    
    # Contribution factors (weights 0-100)
    idea_contribution = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    time_commitment = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    capital_investment = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )
    skills_expertise = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    risk_taken = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    
    # Calculated equity
    calculated_equity = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Calculated equity percentage"
    )
    agreed_equity = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Final agreed equity percentage"
    )
    
    # Additional details
    role = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)
    calculation_details = models.JSONField(default=dict, blank=True)
    
    # Status
    is_approved = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['project', 'member']
        ordering = ['-calculated_equity']
        verbose_name = 'Equity Calculation'
        verbose_name_plural = 'Equity Calculations'
    
    def __str__(self):
        return f"{self.member.username} - {self.project.name}: {self.calculated_equity}%"


class VestingSchedule(models.Model):
    SCHEDULE_TYPE_CHOICES = [
        ('time_based', 'Time-Based'),
        ('milestone_based', 'Milestone-Based'),
        ('hybrid', 'Hybrid'),
    ]
    
    equity_calculation = models.ForeignKey(
        EquityCalculation,
        on_delete=models.CASCADE,
        related_name='vesting_schedules'
    )
    
    # Schedule details
    schedule_type = models.CharField(max_length=20, choices=SCHEDULE_TYPE_CHOICES, default='time_based')
    total_equity = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    
    # Time-based vesting
    cliff_months = models.IntegerField(
        default=12,
        validators=[MinValueValidator(0)],
        help_text="Cliff period in months"
    )
    vesting_period_months = models.IntegerField(
        default=48,
        validators=[MinValueValidator(1)],
        help_text="Total vesting period in months"
    )
    
    # Dates
    start_date = models.DateField()
    cliff_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    
    # Milestone-based vesting
    milestones = models.JSONField(
        default=list,
        blank=True,
        help_text="List of milestone objects for milestone-based vesting"
    )
    
    # Vested amount tracking
    vested_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Vesting Schedule'
        verbose_name_plural = 'Vesting Schedules'
    
    def __str__(self):
        return f"Vesting for {self.equity_calculation.member.username} - {self.total_equity}%"


class CapTable(models.Model):
    SHAREHOLDER_TYPE_CHOICES = [
        ('founder', 'Founder'),
        ('cofounder', 'Co-Founder'),
        ('employee', 'Employee'),
        ('advisor', 'Advisor'),
        ('investor', 'Investor'),
        ('other', 'Other'),
    ]
    
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='cap_table_entries'
    )
    shareholder = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='cap_table_entries',
        null=True,
        blank=True
    )
    shareholder_name = models.CharField(
        max_length=200,
        help_text="Name for external shareholders"
    )
    shareholder_type = models.CharField(max_length=20, choices=SHAREHOLDER_TYPE_CHOICES)
    
    # Ownership
    shares = models.PositiveIntegerField(default=0)
    ownership_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    
    # Investment
    investment_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )
    investment_date = models.DateField(null=True, blank=True)
    
    # Share class
    share_class = models.CharField(
        max_length=50,
        default='Common',
        help_text="e.g., Common, Preferred, Series A, etc."
    )
    
    # Additional details
    notes = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-ownership_percentage']
        verbose_name = 'Cap Table Entry'
        verbose_name_plural = 'Cap Table'
        indexes = [
            models.Index(fields=['project', '-ownership_percentage']),
        ]
    
    def __str__(self):
        name = self.shareholder.username if self.shareholder else self.shareholder_name
        return f"{name} - {self.project.name}: {self.ownership_percentage}%"
    
    def save(self, *args, **kwargs):
        # Auto-populate shareholder_name if shareholder is set
        if self.shareholder and not self.shareholder_name:
            self.shareholder_name = f"{self.shareholder.first_name} {self.shareholder.last_name}" or self.shareholder.username
        super().save(*args, **kwargs)
