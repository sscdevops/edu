from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import AdmissionSession, Application, MeritList
from .serializers import AdmissionSessionSerializer, ApplicationSerializer, MeritListSerializer

# Create your views here.

class AdmissionSessionViewSet(viewsets.ModelViewSet):
    queryset = AdmissionSession.objects.all()
    serializer_class = AdmissionSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Application.objects.filter(session__is_active=True)

class MeritListViewSet(viewsets.ModelViewSet):
    queryset = MeritList.objects.all()
    serializer_class = MeritListSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return MeritList.objects.filter(session__is_active=True)
