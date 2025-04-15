from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    GENDER_IN_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    phone = models.CharField(max_length=20, blank=True, null=True, unique=True)
    gender = models.CharField(max_length=6, choices=GENDER_IN_CHOICES, null=True, blank=True)
    country = models.CharField(max_length=120, null=True, blank=True)
    city = models.CharField(max_length=120, null=True, blank=True)
    state = models.CharField(max_length=120, null=True, blank=True)
