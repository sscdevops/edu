from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('reports', views.ReportViewSet, basename='reports')
router.register('dashboards', views.DashboardViewSet, basename='dashboards')
router.register('widgets', views.WidgetViewSet, basename='widgets')
router.register('scheduled-reports', views.ScheduledReportViewSet, basename='scheduled-reports')

urlpatterns = router.urls 