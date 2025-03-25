from django.contrib import admin
from .models import AdmissionSession, Application, MeritList

@admin.register(AdmissionSession)
class AdmissionSessionAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name',)
    ordering = ('-start_date',)

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'applying_for_class', 'status', 'created_at')
    list_filter = ('status', 'applying_for_class', 'session')
    search_fields = ('first_name', 'last_name', 'email', 'phone_number')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'

@admin.register(MeritList)
class MeritListAdmin(admin.ModelAdmin):
    list_display = ('application', 'merit_score', 'rank', 'created_at')
    list_filter = ('session',)
    search_fields = ('application__first_name', 'application__last_name')
    ordering = ('rank',)
