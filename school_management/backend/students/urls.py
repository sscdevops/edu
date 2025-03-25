from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('classes', views.ClassViewSet, basename='classes')
router.register('students', views.StudentViewSet, basename='students')
router.register('attendance', views.AttendanceViewSet, basename='attendance')
router.register('grades', views.GradeViewSet, basename='grades')

urlpatterns = router.urls 