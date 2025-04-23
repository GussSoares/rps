from django.db import models

from rps_server.models import BaseUUIDModel


class Service(BaseUUIDModel):
    name = models.CharField()
    active = models.BooleanField()
