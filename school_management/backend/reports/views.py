from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Report, Dashboard, Widget, ScheduledReport
from .serializers import ReportSerializer, DashboardSerializer, WidgetSerializer, ScheduledReportSerializer

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        queryset = Report.objects.all()
        report_type = self.request.query_params.get('type', None)
        if report_type is not None:
            queryset = queryset.filter(report_type=report_type)
        return queryset

class DashboardViewSet(viewsets.ModelViewSet):
    queryset = Dashboard.objects.all()
    serializer_class = DashboardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        return Dashboard.objects.filter(created_by=self.request.user)

class WidgetViewSet(viewsets.ModelViewSet):
    queryset = Widget.objects.all()
    serializer_class = WidgetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        dashboard_id = self.request.query_params.get('dashboard', None)
        queryset = Widget.objects.all()
        if dashboard_id:
            queryset = queryset.filter(dashboard_id=dashboard_id)
        return queryset

class ScheduledReportViewSet(viewsets.ModelViewSet):
    queryset = ScheduledReport.objects.all()
    serializer_class = ScheduledReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        return ScheduledReport.objects.filter(created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def toggle_active(self, request, pk=None):
        scheduled_report = self.get_object()
        scheduled_report.is_active = not scheduled_report.is_active
        scheduled_report.save()
        return Response({'status': 'success', 'is_active': scheduled_report.is_active})
