from django.db import models
from django.conf import settings


class AISession(models.Model):
    TOOL_CHOICES = [
        ('cothink', 'CoThink - Brainstorming'),
        ('cowrite', 'CoWrite - Content Creation'),
        ('coplan', 'CoPlan - Strategic Planning'),
        ('coanalyze', 'CoAnalyze - Data Analysis'),
        ('cocode', 'CoCode - Code Assistant'),
        ('codesign', 'CoDesign - Design Ideas'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='ai_sessions'
    )
    tool = models.CharField(max_length=20, choices=TOOL_CHOICES)
    title = models.CharField(max_length=200, blank=True)
    
    # Session data
    context = models.JSONField(
        default=dict,
        blank=True,
        help_text="Session context and parameters"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'AI Session'
        verbose_name_plural = 'AI Sessions'
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['tool', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.tool} - {self.created_at}"


class AIMessage(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
        ('system', 'System'),
    ]
    
    session = models.ForeignKey(
        AISession,
        on_delete=models.CASCADE,
        related_name='messages'
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    content = models.TextField()
    
    # Message metadata
    tokens_used = models.IntegerField(default=0)
    model = models.CharField(max_length=50, default='gpt-3.5-turbo')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
        verbose_name = 'AI Message'
        verbose_name_plural = 'AI Messages'
        indexes = [
            models.Index(fields=['session', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.role}: {self.content[:50]}..."


class AIOutput(models.Model):
    OUTPUT_TYPE_CHOICES = [
        ('brainstorm', 'Brainstorm Ideas'),
        ('content', 'Content'),
        ('plan', 'Strategic Plan'),
        ('analysis', 'Analysis'),
        ('code', 'Code'),
        ('design', 'Design'),
        ('other', 'Other'),
    ]
    
    session = models.ForeignKey(
        AISession,
        on_delete=models.CASCADE,
        related_name='outputs'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='ai_outputs'
    )
    
    # Output details
    output_type = models.CharField(max_length=20, choices=OUTPUT_TYPE_CHOICES)
    title = models.CharField(max_length=200)
    content = models.TextField()
    
    # Additional data
    metadata = models.JSONField(
        default=dict,
        blank=True,
        help_text="Additional output metadata"
    )
    
    # User feedback
    is_saved = models.BooleanField(default=False)
    rating = models.IntegerField(null=True, blank=True, help_text="1-5 rating")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'AI Output'
        verbose_name_plural = 'AI Outputs'
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['output_type', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.output_type}: {self.title}"
