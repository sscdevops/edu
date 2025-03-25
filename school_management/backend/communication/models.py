from django.db import models
from django.conf import settings

class Announcement(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)
    target_roles = models.JSONField(default=list)  # List of user roles who can see this announcement
    
    class Meta:
        db_table = 'announcements'
        ordering = ['-created_at']
        
    def __str__(self):
        return self.title

class Message(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_messages')
    subject = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)
    is_deleted_by_sender = models.BooleanField(default=False)
    is_deleted_by_receiver = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'messages'
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.sender} to {self.receiver}: {self.subject}"

class Notification(models.Model):
    EMAIL = 'email'
    SMS = 'sms'
    IN_APP = 'in_app'
    
    CHANNEL_CHOICES = [
        (EMAIL, 'Email'),
        (SMS, 'SMS'),
        (IN_APP, 'In-App'),
    ]
    
    PENDING = 'pending'
    SENT = 'sent'
    FAILED = 'failed'
    
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (SENT, 'Sent'),
        (FAILED, 'Failed'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    message = models.TextField()
    channel = models.CharField(max_length=10, choices=CHANNEL_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True)
    
    class Meta:
        db_table = 'notifications'
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.user} - {self.title} ({self.channel})"

class ParentTeacherMeeting(models.Model):
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='teacher_meetings')
    parent = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='parent_meetings')
    scheduled_date = models.DateTimeField()
    duration = models.IntegerField(help_text='Duration in minutes')
    status = models.CharField(max_length=20, choices=[
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ], default='scheduled')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'parent_teacher_meetings'
        ordering = ['-scheduled_date']
        
    def __str__(self):
        return f"{self.teacher} - {self.parent} ({self.scheduled_date})"
