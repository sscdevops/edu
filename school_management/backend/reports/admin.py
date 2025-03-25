from django.contrib import admin
from .models import Report, Dashboard, Widget, ScheduledReport

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'report_type', 'format', 'created_by', 'created_at')
    list_filter = ('report_type', 'format', 'created_at')
    search_fields = ('title',)
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'

@admin.register(Dashboard)
class DashboardAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'is_public', 'created_at')
    list_filter = ('is_public', 'created_at')
    search_fields = ('title', 'description')
    ordering = ('-created_at',)

@admin.register(Widget)
class WidgetAdmin(admin.ModelAdmin):
    list_display = ('dashboard', 'title', 'widget_type', 'is_active', 'refresh_interval')
    list_filter = ('widget_type', 'is_active')
    search_fields = ('title', 'dashboard__title')
    ordering = ('dashboard', 'position')

@admin.register(ScheduledReport)
class ScheduledReportAdmin(admin.ModelAdmin):
    list_display = ('report', 'frequency', 'is_active', 'last_sent', 'next_run')
    list_filter = ('frequency', 'is_active')
    search_fields = ('report__title',)
    ordering = ('next_run',)
