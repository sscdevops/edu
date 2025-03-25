from rest_framework import serializers
from .models import Announcement, Message, Notification, ParentTeacherMeeting

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class ParentTeacherMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentTeacherMeeting
        fields = '__all__' 