from django.db import models
from django.conf import settings
from apps.projects.models import Project


class IdeaValidation(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='idea_validations'
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='idea_validations'
    )
    
    # Idea details
    idea_name = models.CharField(max_length=200)
    problem_statement = models.TextField()
    solution_description = models.TextField()
    target_audience = models.TextField()
    
    # Validation data
    validation_methods = models.JSONField(
        default=list,
        blank=True,
        help_text="Methods used for validation (surveys, interviews, etc.)"
    )
    survey_results = models.JSONField(default=dict, blank=True)
    interview_notes = models.JSONField(default=list, blank=True)
    
    # Analysis
    strengths = models.JSONField(default=list, blank=True)
    weaknesses = models.JSONField(default=list, blank=True)
    opportunities = models.JSONField(default=list, blank=True)
    threats = models.JSONField(default=list, blank=True)
    
    # Validation score
    validation_score = models.IntegerField(
        default=0,
        help_text="Validation score out of 100"
    )
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Idea Validation'
        verbose_name_plural = 'Idea Validations'
    
    def __str__(self):
        return f"{self.idea_name} - {self.project.name}"


class MarketResearch(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='market_research'
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='market_research'
    )
    
    # Market details
    market_name = models.CharField(max_length=200)
    market_size = models.CharField(max_length=200, blank=True)
    growth_rate = models.CharField(max_length=100, blank=True)
    
    # Target market
    target_segments = models.JSONField(default=list, blank=True)
    customer_personas = models.JSONField(default=list, blank=True)
    
    # Competition
    competitors = models.JSONField(
        default=list,
        blank=True,
        help_text="List of competitor objects"
    )
    competitive_advantages = models.JSONField(default=list, blank=True)
    
    # Market trends
    trends = models.JSONField(default=list, blank=True)
    opportunities = models.JSONField(default=list, blank=True)
    barriers = models.JSONField(default=list, blank=True)
    
    # Pricing analysis
    pricing_data = models.JSONField(
        default=dict,
        blank=True,
        help_text="Pricing strategies and competitor pricing"
    )
    
    # Research sources
    sources = models.JSONField(default=list, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Market Research'
        verbose_name_plural = 'Market Research'
    
    def __str__(self):
        return f"{self.market_name} - {self.project.name}"


class MVPPlan(models.Model):
    STATUS_CHOICES = [
        ('planning', 'Planning'),
        ('in_development', 'In Development'),
        ('testing', 'Testing'),
        ('launched', 'Launched'),
    ]
    
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='mvp_plans'
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='mvp_plans'
    )
    
    # MVP details
    name = models.CharField(max_length=200)
    description = models.TextField()
    goals = models.JSONField(default=list, blank=True)
    
    # Features
    core_features = models.JSONField(
        default=list,
        blank=True,
        help_text="Must-have features for MVP"
    )
    nice_to_have_features = models.JSONField(
        default=list,
        blank=True,
        help_text="Optional features for future iterations"
    )
    
    # Technical requirements
    tech_stack = models.JSONField(default=list, blank=True)
    infrastructure_needs = models.JSONField(default=list, blank=True)
    
    # Resources
    team_requirements = models.JSONField(default=list, blank=True)
    estimated_budget = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
    estimated_timeline_weeks = models.IntegerField(null=True, blank=True)
    
    # Success metrics
    success_metrics = models.JSONField(
        default=list,
        blank=True,
        help_text="KPIs to measure MVP success"
    )
    
    # Launch plan
    launch_strategy = models.TextField(blank=True)
    target_users_count = models.IntegerField(null=True, blank=True)
    
    # Status and progress
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    completion_percentage = models.IntegerField(default=0)
    
    # Dates
    planned_start_date = models.DateField(null=True, blank=True)
    planned_launch_date = models.DateField(null=True, blank=True)
    actual_launch_date = models.DateField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'MVP Plan'
        verbose_name_plural = 'MVP Plans'
    
    def __str__(self):
        return f"{self.name} - {self.project.name}"


class RevenueModel(models.Model):
    MODEL_TYPE_CHOICES = [
        ('subscription', 'Subscription'),
        ('freemium', 'Freemium'),
        ('one_time', 'One-time Purchase'),
        ('advertising', 'Advertising'),
        ('marketplace', 'Marketplace'),
        ('saas', 'SaaS'),
        ('licensing', 'Licensing'),
        ('hybrid', 'Hybrid'),
        ('other', 'Other'),
    ]
    
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='revenue_models'
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='revenue_models'
    )
    
    # Model details
    name = models.CharField(max_length=200)
    model_type = models.CharField(max_length=20, choices=MODEL_TYPE_CHOICES)
    description = models.TextField()
    
    # Pricing
    pricing_tiers = models.JSONField(
        default=list,
        blank=True,
        help_text="List of pricing tier objects"
    )
    
    # Revenue streams
    revenue_streams = models.JSONField(
        default=list,
        blank=True,
        help_text="Different sources of revenue"
    )
    
    # Financial projections
    projections = models.JSONField(
        default=dict,
        blank=True,
        help_text="Revenue projections by time period"
    )
    
    # Costs
    cost_structure = models.JSONField(
        default=dict,
        blank=True,
        help_text="Fixed and variable costs"
    )
    
    # Metrics
    key_metrics = models.JSONField(
        default=list,
        blank=True,
        help_text="Important metrics to track (CAC, LTV, etc.)"
    )
    
    # Status
    is_active = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Revenue Model'
        verbose_name_plural = 'Revenue Models'
    
    def __str__(self):
        return f"{self.name} ({self.model_type}) - {self.project.name}"
