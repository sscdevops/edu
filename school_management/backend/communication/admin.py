from django.contrib import admin
from .models import Announcement, Message, Notification, ParentTeacherMeeting

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'start_date', 'end_date', 'is_active')
    list_filter = ('is_active', 'start_date', 'end_date')
    search_fields = ('title', 'content')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'subject', 'created_at', 'read_at')
    list_filter = ('created_at', 'read_at')
    search_fields = ('subject', 'content', 'sender__username', 'receiver__username')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'channel', 'status', 'created_at', 'sent_at')
    list_filter = ('channel', 'status', 'created_at')
    search_fields = ('title', 'message', 'user__username')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'

@admin.register(ParentTeacherMeeting)
class ParentTeacherMeetingAdmin(admin.ModelAdmin):
    list_display = ('teacher', 'parent', 'scheduled_date', 'duration', 'status')
    list_filter = ('status', 'scheduled_date')
    search_fields = ('teacher__username', 'parent__username', 'notes')
    ordering = ('-scheduled_date',)
    date_hierarchy = 'scheduled_date'
