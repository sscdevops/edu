from django.contrib import admin
from .models import FeeCategory, FeeStructure, FeeTransaction, Discount, StudentDiscount

@admin.register(FeeCategory)
class FeeCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_recurring', 'frequency')
    list_filter = ('is_recurring', 'frequency')
    search_fields = ('name',)

@admin.register(FeeStructure)
class FeeStructureAdmin(admin.ModelAdmin):
    list_display = ('category', 'class_name', 'academic_year', 'amount', 'due_date')
    list_filter = ('category', 'academic_year')
    search_fields = ('class_name',)
    ordering = ('academic_year', 'class_name')

@admin.register(FeeTransaction)
class FeeTransactionAdmin(admin.ModelAdmin):
    list_display = ('student', 'fee_structure', 'amount_paid', 'payment_date', 'status', 'receipt_number')
    list_filter = ('status', 'payment_method', 'payment_date')
    search_fields = ('student__user__username', 'receipt_number', 'transaction_id')
    ordering = ('-payment_date',)
    date_hierarchy = 'payment_date'

@admin.register(Discount)
class DiscountAdmin(admin.ModelAdmin):
    list_display = ('name', 'percentage', 'is_active', 'valid_from', 'valid_until')
    list_filter = ('is_active',)
    search_fields = ('name',)
    ordering = ('name',)

@admin.register(StudentDiscount)
class StudentDiscountAdmin(admin.ModelAdmin):
    list_display = ('student', 'discount', 'approved_by', 'approved_date')
    list_filter = ('discount', 'approved_date')
    search_fields = ('student__user__username', 'discount__name')
    ordering = ('-approved_date',)
