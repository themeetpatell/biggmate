from django.contrib import admin
from .models import IdeaValidation, MarketResearch, MVPPlan, RevenueModel, SprintoData


@admin.register(SprintoData)
class SprintoDataAdmin(admin.ModelAdmin):
    list_display = ['pitch', 'created_by', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['pitch__title', 'created_by__username']
    readonly_fields = ['created_by', 'created_at', 'updated_at']
    raw_id_fields = ['pitch', 'created_by']


@admin.register(IdeaValidation)
class IdeaValidationAdmin(admin.ModelAdmin):
    list_display = ['idea_name', 'project', 'status', 'validation_score', 'created_by', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['idea_name', 'problem_statement', 'project__name']
    readonly_fields = ['created_by', 'created_at', 'updated_at']


@admin.register(MarketResearch)
class MarketResearchAdmin(admin.ModelAdmin):
    list_display = ['market_name', 'project', 'market_size', 'growth_rate', 'created_by', 'created_at']
    list_filter = ['created_at']
    search_fields = ['market_name', 'project__name']
    readonly_fields = ['created_by', 'created_at', 'updated_at']


@admin.register(MVPPlan)
class MVPPlanAdmin(admin.ModelAdmin):
    list_display = ['name', 'project', 'status', 'completion_percentage', 'planned_launch_date', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'description', 'project__name']
    readonly_fields = ['created_by', 'created_at', 'updated_at']


@admin.register(RevenueModel)
class RevenueModelAdmin(admin.ModelAdmin):
    list_display = ['name', 'model_type', 'project', 'is_active', 'created_by', 'created_at']
    list_filter = ['model_type', 'is_active', 'created_at']
    search_fields = ['name', 'description', 'project__name']
    readonly_fields = ['created_by', 'created_at', 'updated_at']
