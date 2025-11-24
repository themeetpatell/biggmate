from django.contrib import admin
from .models import Project, TeamMember, Task, Milestone


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner', 'status', 'start_date', 'end_date', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'description', 'owner__username']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description', 'owner', 'status')
        }),
        ('Project Details', {
            'fields': ('start_date', 'end_date', 'budget', 'tags', 'goals')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['user', 'project', 'role', 'joined_at']
    list_filter = ['role', 'joined_at']
    search_fields = ['user__username', 'project__name']
    readonly_fields = ['joined_at']


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'project', 'status', 'priority', 'assigned_to', 'due_date', 'created_at']
    list_filter = ['status', 'priority', 'created_at']
    search_fields = ['title', 'description', 'project__name', 'assigned_to__username']
    readonly_fields = ['created_by', 'completed_at', 'created_at', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('project', 'title', 'description', 'status', 'priority')
        }),
        ('Assignment', {
            'fields': ('assigned_to', 'created_by')
        }),
        ('Dates', {
            'fields': ('due_date', 'completed_at')
        }),
        ('Details', {
            'fields': ('tags', 'estimated_hours', 'actual_hours')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    list_display = ['title', 'project', 'status', 'target_date', 'completed_at']
    list_filter = ['status', 'target_date']
    search_fields = ['title', 'description', 'project__name']
    readonly_fields = ['completed_at', 'created_at', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('project', 'title', 'description', 'status')
        }),
        ('Dates', {
            'fields': ('target_date', 'completed_at')
        }),
        ('Details', {
            'fields': ('deliverables',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
