from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    """Custom User model extending Django's AbstractUser"""
    
    # Profile fields
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    
    # Contact information
    whatsapp_number = PhoneNumberField(unique=True, null=True, blank=True)
    country_code = models.CharField(max_length=5, default='+1')
    
    # Profile image
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    
    # Verification & Safety
    is_verified = models.BooleanField(default=False)
    email_verified = models.BooleanField(default=False)
    phone_verified = models.BooleanField(default=False)
    safety_score = models.IntegerField(default=80)
    
    # Premium features
    premium_tier = models.CharField(
        max_length=20,
        choices=[
            ('free', 'Free'),
            ('silver', 'Silver'),
            ('gold', 'Gold'),
            ('platinum', 'Platinum'),
        ],
        default='free'
    )
    
    # Onboarding
    onboarding_complete = models.BooleanField(default=False)
    user_intent = models.CharField(
        max_length=50,
        choices=[
            ('idea-sprint', 'Idea Sprint'),
            ('offer-skills', 'Offer Skills'),
            ('find-cofounder', 'Find Cofounder'),
        ],
        null=True,
        blank=True
    )
    user_stage = models.CharField(max_length=100, null=True, blank=True)
    user_mask = models.CharField(max_length=100, null=True, blank=True)
    user_role = models.CharField(max_length=100, null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_active = models.DateTimeField(auto_now=True)
    
    # Settings
    email_notifications = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'users'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.username
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class GlobalLocation(models.Model):
    """Global location data for users"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='global_location')
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    timezone = models.CharField(max_length=50)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    region = models.CharField(max_length=100)
    language = models.CharField(max_length=50, default='English')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'global_locations'
    
    def __str__(self):
        return f"{self.city}, {self.country}"


class OTPVerification(models.Model):
    """OTP verification for WhatsApp"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    whatsapp_number = PhoneNumberField()
    otp = models.CharField(max_length=6)
    purpose = models.CharField(
        max_length=50,
        choices=[
            ('registration', 'Registration'),
            ('login', 'Login'),
            ('password_reset', 'Password Reset'),
            ('username_recovery', 'Username Recovery'),
        ]
    )
    is_used = models.BooleanField(default=False)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'otp_verifications'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"OTP for {self.whatsapp_number}"


class OnboardingData(models.Model):
    """Store all onboarding data collected during user registration"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='onboarding_data')
    
    # Mission & Values
    mission_statement = models.TextField(blank=True)
    selected_values = models.JSONField(default=list)  # Core values selected
    
    # Background
    industries = models.JSONField(default=list)
    skills = models.JSONField(default=list)
    experience = models.CharField(max_length=200, blank=True)
    background = models.TextField(blank=True)
    about_self = models.TextField(blank=True)
    birth_place = models.CharField(max_length=200, blank=True)
    
    # Pitch & Media
    pitch_text = models.TextField(blank=True)
    pitch_format = models.CharField(max_length=20, default='text')  # 'text' or 'voice'
    has_voice_note = models.BooleanField(default=False)
    pitch_deck_file_name = models.CharField(max_length=255, blank=True)
    pitch_deck_file_size = models.CharField(max_length=50, blank=True)
    
    # Cofounder Preferences
    cofounder_preferences = models.JSONField(default=dict)  # All cofounder search criteria
    
    # Offer Skills Data
    offer_skills_data = models.JSONField(default=dict)  # Skills being offered
    
    # Idea Sprint Data
    idea_sprint_data = models.JSONField(default=dict)  # Idea sprint details
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'onboarding_data'
    
    def __str__(self):
        return f"{self.user.username}'s onboarding data"
