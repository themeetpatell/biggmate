from django.contrib import admin
from .models import Stakeholder, Interaction, Pipeline


@admin.register(Stakeholder)
class StakeholderAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'status', 'company', 'project', 'email', 'last_contact_date', 'created_at']
    list_filter = ['type', 'status', 'created_at']
    search_fields = ['name', 'email', 'company', 'tags']
    readonly_fields = ['added_by', 'created_at', 'updated_at']


@admin.register(Interaction)
class InteractionAdmin(admin.ModelAdmin):
    list_display = ['title', 'stakeholder', 'type', 'outcome', 'interaction_date', 'user', 'created_at']
    list_filter = ['type', 'outcome', 'interaction_date']
    search_fields = ['title', 'description', 'stakeholder__name']
    readonly_fields = ['user', 'created_at', 'updated_at']


@admin.register(Pipeline)
class PipelineAdmin(admin.ModelAdmin):
    list_display = ['stakeholder', 'project', 'stage', 'deal_value', 'probability', 'expected_close_date', 'actual_close_date']
    list_filter = ['stage', 'created_at']
    search_fields = ['stakeholder__name', 'project__name', 'notes']
    readonly_fields = ['created_at', 'updated_at']
