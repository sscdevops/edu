from django.db import models
from django.conf import settings

class AdmissionSession(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'admission_sessions'
        
    def __str__(self):
        return self.name

class Application(models.Model):
    PENDING = 'pending'
    APPROVED = 'approved'
    REJECTED = 'rejected'
    
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (APPROVED, 'Approved'),
        (REJECTED, 'Rejected'),
    ]
    
    session = models.ForeignKey(AdmissionSession, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    address = models.TextField()
    previous_school = models.CharField(max_length=200, blank=True)
    previous_class = models.CharField(max_length=50, blank=True)
    applying_for_class = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)
    documents = models.FileField(upload_to='admission_documents/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'applications'
        
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.applying_for_class}"

class MeritList(models.Model):
    session = models.ForeignKey(AdmissionSession, on_delete=models.CASCADE)
    application = models.OneToOneField(Application, on_delete=models.CASCADE)
    merit_score = models.DecimalField(max_digits=5, decimal_places=2)
    rank = models.PositiveIntegerField()
    remarks = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'merit_lists'
        ordering = ['rank']
        
    def __str__(self):
        return f"{self.application} - Rank: {self.rank}"
