from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('categories', views.ExpenseCategoryViewSet, basename='expense-categories')
router.register('vendors', views.VendorViewSet, basename='vendors')
router.register('purchase-orders', views.PurchaseOrderViewSet, basename='purchase-orders')
router.register('expenses', views.ExpenseViewSet, basename='expenses')
router.register('budgets', views.BudgetViewSet, basename='budgets')

urlpatterns = router.urls 