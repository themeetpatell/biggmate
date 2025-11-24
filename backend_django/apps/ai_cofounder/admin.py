from django.contrib import admin
from .models import AISession, AIMessage, AIOutput


class AIMessageInline(admin.TabularInline):
    model = AIMessage
    extra = 0
    readonly_fields = ['role', 'content', 'tokens_used', 'created_at']
    can_delete = False


@admin.register(AISession)
class AISessionAdmin(admin.ModelAdmin):
    list_display = ['user', 'tool', 'title', 'created_at', 'updated_at']
    list_filter = ['tool', 'created_at']
    search_fields = ['user__username', 'title']
    readonly_fields = ['created_at', 'updated_at']
    inlines = [AIMessageInline]


@admin.register(AIMessage)
class AIMessageAdmin(admin.ModelAdmin):
    list_display = ['session', 'role', 'content_preview', 'tokens_used', 'created_at']
    list_filter = ['role', 'created_at']
    search_fields = ['content']
    readonly_fields = ['created_at']
    
    def content_preview(self, obj):
        return obj.content[:100] + '...' if len(obj.content) > 100 else obj.content
    content_preview.short_description = 'Content'


@admin.register(AIOutput)
class AIOutputAdmin(admin.ModelAdmin):
    list_display = ['title', 'output_type', 'user', 'is_saved', 'rating', 'created_at']
    list_filter = ['output_type', 'is_saved', 'created_at']
    search_fields = ['title', 'content', 'user__username']
    readonly_fields = ['user', 'created_at', 'updated_at']
