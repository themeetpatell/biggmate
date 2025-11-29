"""
Models for onboarding options data
"""
from django.db import models


class ValueCategory(models.Model):
    """Categories for user values"""
    name = models.CharField(max_length=100, unique=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'value_categories'
        ordering = ['order']
        verbose_name_plural = 'Value Categories'
    
    def __str__(self):
        return self.name


class Value(models.Model):
    """User values for onboarding"""
    value_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    category = models.ForeignKey(ValueCategory, on_delete=models.CASCADE, related_name='values')
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'values'
        ordering = ['category__order', 'order']
    
    def __str__(self):
        return self.name


class Intent(models.Model):
    """User intents for onboarding"""
    intent_id = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'intents'
        ordering = ['order']
    
    def __str__(self):
        return self.title


class Industry(models.Model):
    """Industries for user background"""
    name = models.CharField(max_length=100, unique=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'industries'
        ordering = ['order']
        verbose_name_plural = 'Industries'
    
    def __str__(self):
        return self.name


class Skill(models.Model):
    """Skills for user expertise"""
    name = models.CharField(max_length=100, unique=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'skills'
        ordering = ['order']
    
    def __str__(self):
        return self.name


class ExperienceLevel(models.Model):
    """Experience levels for users"""
    level_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'experience_levels'
        ordering = ['order']
    
    def __str__(self):
        return self.name


class CofounderRole(models.Model):
    """Cofounder roles for matching"""
    role_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'cofounder_roles'
        ordering = ['order']
    
    def __str__(self):
        return self.name


class WorkStyle(models.Model):
    """Work style preferences"""
    style_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'work_styles'
        ordering = ['order']
    
    def __str__(self):
        return self.name


class TimeCommitment(models.Model):
    """Time commitment options"""
    commitment_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200, blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'time_commitments'
        ordering = ['order']
    
    def __str__(self):
        return self.name


class Availability(models.Model):
    """Availability options"""
    availability_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'availabilities'
        ordering = ['order']
        verbose_name_plural = 'Availabilities'
    
    def __str__(self):
        return self.name


class LocationPreference(models.Model):
    """Location preference options"""
    location_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'location_preferences'
        ordering = ['order']
    
    def __str__(self):
        return self.name


class WorkType(models.Model):
    """Work type options for preferences"""
    work_type_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'work_types'
        ordering = ['order']
    
    def __str__(self):
        return self.name


class HourlyRate(models.Model):
    """Hourly rate options for preferences"""
    rate_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    min_rate = models.IntegerField(null=True, blank=True)
    max_rate = models.IntegerField(null=True, blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'hourly_rates'
        ordering = ['order']
    
    def __str__(self):
        return self.name


class StartupStage(models.Model):
    """Startup stage options"""
    stage_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200, blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'startup_stages'
        ordering = ['order']
    
    def __str__(self):
        return self.name
