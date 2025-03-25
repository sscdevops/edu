from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Announcement, Message, Notification, ParentTeacherMeeting
from .serializers import (
    AnnouncementSerializer, MessageSerializer, NotificationSerializer,
    ParentTeacherMeetingSerializer
)
from django.db import models

# Create your views here.

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Announcement.objects.all()
        return Announcement.objects.filter(target_roles__contains=[user.role])

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(
            models.Q(sender=user) | models.Q(receiver=user)
        )

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

class ParentTeacherMeetingViewSet(viewsets.ModelViewSet):
    queryset = ParentTeacherMeeting.objects.all()
    serializer_class = ParentTeacherMeetingSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return ParentTeacherMeeting.objects.all()
        elif user.role == 'teacher':
            return ParentTeacherMeeting.objects.filter(teacher=user)
        elif user.role == 'parent':
            return ParentTeacherMeeting.objects.filter(parent=user)
        return ParentTeacherMeeting.objects.none()
