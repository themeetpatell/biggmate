from django.contrib import admin
from .models import EquityCalculation, VestingSchedule, CapTable


@admin.register(EquityCalculation)
class EquityCalculationAdmin(admin.ModelAdmin):
    list_display = ['member', 'project', 'role', 'calculated_equity', 'agreed_equity', 'is_approved', 'created_at']
    list_filter = ['is_approved', 'created_at']
    search_fields = ['member__username', 'project__name', 'role']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(VestingSchedule)
class VestingScheduleAdmin(admin.ModelAdmin):
    list_display = ['equity_calculation', 'schedule_type', 'total_equity', 'vested_percentage', 'start_date', 'end_date']
    list_filter = ['schedule_type', 'start_date']
    search_fields = ['equity_calculation__member__username']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(CapTable)
class CapTableAdmin(admin.ModelAdmin):
    list_display = ['shareholder_name', 'project', 'shareholder_type', 'ownership_percentage', 'shares', 'investment_amount']
    list_filter = ['shareholder_type', 'share_class', 'created_at']
    search_fields = ['shareholder_name', 'project__name']
    readonly_fields = ['created_at', 'updated_at']
