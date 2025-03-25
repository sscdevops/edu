from rest_framework import serializers
from .models import FeeCategory, FeeStructure, FeeTransaction, Discount, StudentDiscount

class FeeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeCategory
        fields = '__all__'

class FeeStructureSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeStructure
        fields = '__all__'

class FeeTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeTransaction
        fields = '__all__'

class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = '__all__'

class StudentDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDiscount
        fields = '__all__' 