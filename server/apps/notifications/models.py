import uuid
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class NotificationType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField()
    active = models.BooleanField(default=True)


class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.ForeignKey(to=NotificationType, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=200, null=True)
    user = models.ForeignKey(to=User, null=True, on_delete=models.CASCADE)
    is_readed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    readed_at = models.DateTimeField(auto_now=True)
