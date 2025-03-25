from django.db import models
from django.conf import settings

class ExpenseCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    budget_limit = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    
    class Meta:
        db_table = 'expense_categories'
        verbose_name_plural = 'expense categories'
        
    def __str__(self):
        return self.name

class Vendor(models.Model):
    name = models.CharField(max_length=200)
    contact_person = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    tax_id = models.CharField(max_length=50, blank=True)
    bank_account = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'vendors'
        
    def __str__(self):
        return self.name

class PurchaseOrder(models.Model):
    DRAFT = 'draft'
    PENDING = 'pending'
    APPROVED = 'approved'
    REJECTED = 'rejected'
    COMPLETED = 'completed'
    
    STATUS_CHOICES = [
        (DRAFT, 'Draft'),
        (PENDING, 'Pending Approval'),
        (APPROVED, 'Approved'),
        (REJECTED, 'Rejected'),
        (COMPLETED, 'Completed'),
    ]
    
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    order_number = models.CharField(max_length=50, unique=True)
    order_date = models.DateField()
    delivery_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=DRAFT)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    remarks = models.TextField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='created_purchase_orders')
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='approved_purchase_orders')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'purchase_orders'
        
    def __str__(self):
        return f"{self.order_number} - {self.vendor}"

class Expense(models.Model):
    category = models.ForeignKey(ExpenseCategory, on_delete=models.CASCADE)
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    expense_date = models.DateField()
    payment_method = models.CharField(max_length=50)
    payment_reference = models.CharField(max_length=100, blank=True)
    receipt = models.FileField(upload_to='expense_receipts/', null=True, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'expenses'
        
    def __str__(self):
        return f"{self.category} - {self.amount} ({self.expense_date})"

class Budget(models.Model):
    category = models.ForeignKey(ExpenseCategory, on_delete=models.CASCADE)
    academic_year = models.CharField(max_length=9)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    remarks = models.TextField(blank=True)
    
    class Meta:
        db_table = 'budgets'
        unique_together = ['category', 'academic_year']
        
    def __str__(self):
        return f"{self.category} - {self.academic_year}"
