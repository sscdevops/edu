from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Class, Student, Attendance, Grade
from .serializers import ClassSerializer, StudentSerializer, AttendanceSerializer, GradeSerializer

# Create your views here.

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    permission_classes = [permissions.IsAuthenticated]

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Student.objects.all()
        elif user.role == 'teacher':
            return Student.objects.filter(current_class__teacher=user)
        return Student.objects.filter(user=user)

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Attendance.objects.all()
        elif user.role == 'teacher':
            return Attendance.objects.filter(student__current_class__teacher=user)
        return Attendance.objects.filter(student__user=user)

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Grade.objects.all()
        elif user.role == 'teacher':
            return Grade.objects.filter(student__current_class__teacher=user)
        return Grade.objects.filter(student__user=user)
