from django.db import models
from django.conf import settings

class Report(models.Model):
    ADMISSION = 'admission'
    ACADEMIC = 'academic'
    ATTENDANCE = 'attendance'
    FINANCIAL = 'financial'
    EXPENSE = 'expense'
    
    REPORT_TYPE_CHOICES = [
        (ADMISSION, 'Admission Report'),
        (ACADEMIC, 'Academic Report'),
        (ATTENDANCE, 'Attendance Report'),
        (FINANCIAL, 'Financial Report'),
        (EXPENSE, 'Expense Report'),
    ]
    
    PDF = 'pdf'
    EXCEL = 'excel'
    
    FORMAT_CHOICES = [
        (PDF, 'PDF'),
        (EXCEL, 'Excel'),
    ]
    
    title = models.CharField(max_length=200)
    report_type = models.CharField(max_length=20, choices=REPORT_TYPE_CHOICES)
    format = models.CharField(max_length=10, choices=FORMAT_CHOICES)
    parameters = models.JSONField(default=dict)  # Store report parameters
    file = models.FileField(upload_to='reports/')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField()
    end_date = models.DateField()
    
    class Meta:
        db_table = 'reports'
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.title} ({self.report_type})"

class Dashboard(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    layout = models.JSONField(default=dict)  # Store dashboard layout configuration
    is_public = models.BooleanField(default=False)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'dashboards'
        
    def __str__(self):
        return self.title

class Widget(models.Model):
    CHART = 'chart'
    TABLE = 'table'
    METRIC = 'metric'
    
    WIDGET_TYPE_CHOICES = [
        (CHART, 'Chart'),
        (TABLE, 'Table'),
        (METRIC, 'Metric'),
    ]
    
    dashboard = models.ForeignKey(Dashboard, on_delete=models.CASCADE, related_name='widgets')
    title = models.CharField(max_length=200)
    widget_type = models.CharField(max_length=20, choices=WIDGET_TYPE_CHOICES)
    configuration = models.JSONField(default=dict)  # Store widget configuration
    position = models.JSONField(default=dict)  # Store widget position in dashboard
    refresh_interval = models.IntegerField(default=0)  # In minutes, 0 means no auto-refresh
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'widgets'
        ordering = ['dashboard', 'position']
        
    def __str__(self):
        return f"{self.dashboard.title} - {self.title}"

class ScheduledReport(models.Model):
    DAILY = 'daily'
    WEEKLY = 'weekly'
    MONTHLY = 'monthly'
    QUARTERLY = 'quarterly'
    
    FREQUENCY_CHOICES = [
        (DAILY, 'Daily'),
        (WEEKLY, 'Weekly'),
        (MONTHLY, 'Monthly'),
        (QUARTERLY, 'Quarterly'),
    ]
    
    report = models.ForeignKey(Report, on_delete=models.CASCADE)
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES)
    recipients = models.JSONField(default=list)  # List of email addresses
    is_active = models.BooleanField(default=True)
    last_sent = models.DateTimeField(null=True, blank=True)
    next_run = models.DateTimeField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'scheduled_reports'
        
    def __str__(self):
        return f"{self.report.title} ({self.frequency})"
