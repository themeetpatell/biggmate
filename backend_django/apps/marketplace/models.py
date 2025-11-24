from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator


class ServiceProvider(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='service_provider_profile'
    )
    
    # Provider details
    business_name = models.CharField(max_length=200)
    description = models.TextField()
    tagline = models.CharField(max_length=255, blank=True)
    
    # Categories
    categories = models.JSONField(default=list, blank=True, help_text="Service categories")
    specializations = models.JSONField(default=list, blank=True)
    
    # Profile links
    website = models.URLField(blank=True)
    portfolio_url = models.URLField(blank=True)
    
    # Rating
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )
    reviews_count = models.PositiveIntegerField(default=0)
    
    # Status
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Service Provider'
        verbose_name_plural = 'Service Providers'
        indexes = [
            models.Index(fields=['is_active', '-rating']),
        ]
    
    def __str__(self):
        return f"{self.business_name} ({self.user.username})"


class ServiceListing(models.Model):
    provider = models.ForeignKey(
        ServiceProvider,
        on_delete=models.CASCADE,
        related_name='listings'
    )
    
    # Listing details
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=100)
    tags = models.JSONField(default=list, blank=True)
    
    # Pricing
    starting_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    price_type = models.CharField(
        max_length=20,
        choices=[
            ('fixed', 'Fixed Price'),
            ('hourly', 'Hourly Rate'),
            ('custom', 'Custom Quote'),
        ],
        default='fixed'
    )
    
    # Service details
    delivery_time_days = models.IntegerField(
        validators=[MinValueValidator(1)],
        help_text="Typical delivery time in days"
    )
    features = models.JSONField(default=list, blank=True)
    
    # Media
    images = models.JSONField(default=list, blank=True, help_text="List of image URLs")
    
    # Status
    is_active = models.BooleanField(default=True)
    views_count = models.PositiveIntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Service Listing'
        verbose_name_plural = 'Service Listings'
        indexes = [
            models.Index(fields=['category', 'is_active']),
            models.Index(fields=['provider', 'is_active']),
        ]
    
    def __str__(self):
        return self.title
    
    def increment_views(self):
        self.views_count += 1
        self.save(update_fields=['views_count'])


class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('responded', 'Responded'),
        ('converted', 'Converted to Project'),
        ('declined', 'Declined'),
        ('closed', 'Closed'),
    ]
    
    listing = models.ForeignKey(
        ServiceListing,
        on_delete=models.CASCADE,
        related_name='inquiries'
    )
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_inquiries'
    )
    
    # Inquiry details
    message = models.TextField()
    budget = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)]
    )
    timeline = models.CharField(max_length=200, blank=True)
    requirements = models.JSONField(default=dict, blank=True)
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    provider_response = models.TextField(blank=True)
    responded_at = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Inquiry'
        verbose_name_plural = 'Inquiries'
        indexes = [
            models.Index(fields=['listing', 'status']),
            models.Index(fields=['sender', 'status']),
        ]
    
    def __str__(self):
        return f"Inquiry for {self.listing.title} from {self.sender.username}"
