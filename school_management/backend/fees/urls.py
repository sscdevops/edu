from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('categories', views.FeeCategoryViewSet, basename='fee-categories')
router.register('structures', views.FeeStructureViewSet, basename='fee-structures')
router.register('transactions', views.FeeTransactionViewSet, basename='fee-transactions')
router.register('discounts', views.DiscountViewSet, basename='discounts')
router.register('student-discounts', views.StudentDiscountViewSet, basename='student-discounts')

urlpatterns = router.urls 