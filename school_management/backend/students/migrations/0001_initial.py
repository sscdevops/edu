# Generated by Django 5.0.2 on 2025-03-23 00:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Attendance",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateField()),
                ("is_present", models.BooleanField(default=False)),
                ("remarks", models.TextField(blank=True)),
            ],
            options={
                "db_table": "attendance",
            },
        ),
        migrations.CreateModel(
            name="Class",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("section", models.CharField(max_length=10)),
                ("academic_year", models.CharField(max_length=9)),
            ],
            options={
                "verbose_name_plural": "classes",
                "db_table": "classes",
            },
        ),
        migrations.CreateModel(
            name="Grade",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("subject", models.CharField(max_length=50)),
                ("marks", models.DecimalField(decimal_places=2, max_digits=5)),
                ("maximum_marks", models.DecimalField(decimal_places=2, max_digits=5)),
                ("exam_type", models.CharField(max_length=50)),
                ("semester", models.CharField(max_length=20)),
                ("academic_year", models.CharField(max_length=9)),
                ("remarks", models.TextField(blank=True)),
            ],
            options={
                "db_table": "grades",
            },
        ),
        migrations.CreateModel(
            name="Student",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("admission_number", models.CharField(max_length=20, unique=True)),
                ("roll_number", models.CharField(max_length=20)),
                ("date_of_birth", models.DateField()),
                ("blood_group", models.CharField(blank=True, max_length=5)),
                ("parent_name", models.CharField(max_length=100)),
                ("parent_phone", models.CharField(max_length=15)),
                ("parent_email", models.EmailField(max_length=254)),
                ("emergency_contact", models.CharField(max_length=15)),
            ],
            options={
                "db_table": "students",
            },
        ),
    ]
