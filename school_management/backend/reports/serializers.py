from rest_framework import serializers
from .models import Report, Dashboard, Widget, ScheduledReport

class ReportSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    
    class Meta:
        model = Report
        fields = ['id', 'title', 'report_type', 'format', 'parameters', 'file',
                 'created_by', 'created_at', 'start_date', 'end_date']
        read_only_fields = ['created_by', 'created_at']

class WidgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Widget
        fields = ['id', 'dashboard', 'title', 'widget_type', 'configuration',
                 'position', 'refresh_interval', 'is_active']

class DashboardSerializer(serializers.ModelSerializer):
    widgets = WidgetSerializer(many=True, read_only=True)
    created_by = serializers.ReadOnlyField(source='created_by.username')
    
    class Meta:
        model = Dashboard
        fields = ['id', 'title', 'description', 'layout', 'is_public',
                 'created_by', 'created_at', 'updated_at', 'widgets']
        read_only_fields = ['created_by', 'created_at', 'updated_at']

class ScheduledReportSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    
    class Meta:
        model = ScheduledReport
        fields = ['id', 'report', 'frequency', 'recipients', 'is_active',
                 'last_sent', 'next_run', 'created_by', 'created_at']
        read_only_fields = ['created_by', 'created_at', 'last_sent'] 