from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import ExpenseCategory, Vendor, PurchaseOrder, Expense, Budget
from .serializers import (
    ExpenseCategorySerializer, VendorSerializer, PurchaseOrderSerializer,
    ExpenseSerializer, BudgetSerializer
)

# Create your views here.

class ExpenseCategoryViewSet(viewsets.ModelViewSet):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [permissions.IsAuthenticated]

class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'accountant']:
            return PurchaseOrder.objects.all()
        return PurchaseOrder.objects.filter(created_by=user)

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'accountant']:
            return Expense.objects.all()
        return Expense.objects.filter(created_by=user)

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [permissions.IsAuthenticated]
