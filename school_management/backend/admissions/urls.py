from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('sessions', views.AdmissionSessionViewSet, basename='admission-sessions')
router.register('applications', views.ApplicationViewSet, basename='applications')
router.register('merit-list', views.MeritListViewSet, basename='merit-list')

urlpatterns = router.urls 