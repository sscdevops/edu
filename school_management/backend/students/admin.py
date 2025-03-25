from django.contrib import admin
from .models import Class, Student, Attendance, Grade

@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = ('name', 'section', 'academic_year', 'teacher')
    list_filter = ('academic_year',)
    search_fields = ('name', 'section', 'teacher__username')
    ordering = ('name', 'section')

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('admission_number', 'user', 'current_class', 'roll_number', 'parent_name')
    list_filter = ('current_class',)
    search_fields = ('admission_number', 'user__username', 'user__first_name', 'user__last_name', 'parent_name')
    ordering = ('admission_number',)

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'date', 'is_present', 'marked_by')
    list_filter = ('date', 'is_present')
    search_fields = ('student__user__username', 'student__admission_number')
    ordering = ('-date',)
    date_hierarchy = 'date'

@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'marks', 'maximum_marks', 'exam_type', 'semester', 'academic_year')
    list_filter = ('exam_type', 'semester', 'academic_year', 'subject')
    search_fields = ('student__user__username', 'student__admission_number', 'subject')
    ordering = ('-academic_year', 'semester', 'subject')
