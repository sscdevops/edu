from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('announcements', views.AnnouncementViewSet, basename='announcements')
router.register('messages', views.MessageViewSet, basename='messages')
router.register('notifications', views.NotificationViewSet, basename='notifications')
router.register('meetings', views.ParentTeacherMeetingViewSet, basename='meetings')

urlpatterns = router.urls 