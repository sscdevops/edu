from django.db import models
from django.conf import settings
from students.models import Student

class FeeCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_recurring = models.BooleanField(default=True)
    frequency = models.CharField(max_length=20, choices=[
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
        ('annually', 'Annually'),
        ('one_time', 'One Time'),
    ], default='monthly')
    
    class Meta:
        db_table = 'fee_categories'
        verbose_name_plural = 'fee categories'
        
    def __str__(self):
        return self.name

class FeeStructure(models.Model):
    category = models.ForeignKey(FeeCategory, on_delete=models.CASCADE)
    class_name = models.CharField(max_length=50)
    academic_year = models.CharField(max_length=9)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    late_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    class Meta:
        db_table = 'fee_structures'
        unique_together = ['category', 'class_name', 'academic_year']
        
    def __str__(self):
        return f"{self.category} - {self.class_name} ({self.academic_year})"

class FeeTransaction(models.Model):
    PENDING = 'pending'
    SUCCESS = 'success'
    FAILED = 'failed'
    REFUNDED = 'refunded'
    
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (SUCCESS, 'Success'),
        (FAILED, 'Failed'),
        (REFUNDED, 'Refunded'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    fee_structure = models.ForeignKey(FeeStructure, on_delete=models.CASCADE)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=50)
    transaction_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)
    receipt_number = models.CharField(max_length=50, unique=True)
    remarks = models.TextField(blank=True)
    
    class Meta:
        db_table = 'fee_transactions'
        
    def __str__(self):
        return f"{self.student} - {self.fee_structure} - {self.receipt_number}"

class Discount(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)
    is_active = models.BooleanField(default=True)
    valid_from = models.DateField()
    valid_until = models.DateField(null=True, blank=True)
    
    class Meta:
        db_table = 'discounts'
        
    def __str__(self):
        return f"{self.name} ({self.percentage}%)"

class StudentDiscount(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    discount = models.ForeignKey(Discount, on_delete=models.CASCADE)
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    approved_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'student_discounts'
        unique_together = ['student', 'discount']
        
    def __str__(self):
        return f"{self.student} - {self.discount}"
