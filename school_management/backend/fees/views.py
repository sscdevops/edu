from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import FeeCategory, FeeStructure, FeeTransaction, Discount, StudentDiscount
from .serializers import (
    FeeCategorySerializer, FeeStructureSerializer, FeeTransactionSerializer,
    DiscountSerializer, StudentDiscountSerializer
)

# Create your views here.

class FeeCategoryViewSet(viewsets.ModelViewSet):
    queryset = FeeCategory.objects.all()
    serializer_class = FeeCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class FeeStructureViewSet(viewsets.ModelViewSet):
    queryset = FeeStructure.objects.all()
    serializer_class = FeeStructureSerializer
    permission_classes = [permissions.IsAuthenticated]

class FeeTransactionViewSet(viewsets.ModelViewSet):
    queryset = FeeTransaction.objects.all()
    serializer_class = FeeTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin' or user.role == 'accountant':
            return FeeTransaction.objects.all()
        return FeeTransaction.objects.filter(student__user=user)

class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
    permission_classes = [permissions.IsAuthenticated]

class StudentDiscountViewSet(viewsets.ModelViewSet):
    queryset = StudentDiscount.objects.all()
    serializer_class = StudentDiscountSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin' or user.role == 'accountant':
            return StudentDiscount.objects.all()
        return StudentDiscount.objects.filter(student__user=user)
