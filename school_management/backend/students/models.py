from django.db import models
from django.conf import settings

class Class(models.Model):
    name = models.CharField(max_length=50)
    section = models.CharField(max_length=10)
    academic_year = models.CharField(max_length=9)  # Format: 2023-2024
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='class_teacher')
    
    class Meta:
        db_table = 'classes'
        unique_together = ['name', 'section', 'academic_year']
        verbose_name_plural = 'classes'
        
    def __str__(self):
        return f"{self.name} - {self.section} ({self.academic_year})"

class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    current_class = models.ForeignKey(Class, on_delete=models.SET_NULL, null=True)
    admission_number = models.CharField(max_length=20, unique=True)
    roll_number = models.CharField(max_length=20)
    date_of_birth = models.DateField()
    blood_group = models.CharField(max_length=5, blank=True)
    parent_name = models.CharField(max_length=100)
    parent_phone = models.CharField(max_length=15)
    parent_email = models.EmailField()
    emergency_contact = models.CharField(max_length=15)
    
    class Meta:
        db_table = 'students'
        
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.admission_number}"

class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    is_present = models.BooleanField(default=False)
    remarks = models.TextField(blank=True)
    marked_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    
    class Meta:
        db_table = 'attendance'
        unique_together = ['student', 'date']
        
    def __str__(self):
        return f"{self.student} - {self.date}"

class Grade(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.CharField(max_length=50)
    marks = models.DecimalField(max_digits=5, decimal_places=2)
    maximum_marks = models.DecimalField(max_digits=5, decimal_places=2)
    exam_type = models.CharField(max_length=50)  # Mid-term, Final, etc.
    semester = models.CharField(max_length=20)
    academic_year = models.CharField(max_length=9)
    remarks = models.TextField(blank=True)
    
    class Meta:
        db_table = 'grades'
        
    def __str__(self):
        return f"{self.student} - {self.subject} ({self.exam_type})"

    @property
    def percentage(self):
        return (self.marks / self.maximum_marks) * 100
