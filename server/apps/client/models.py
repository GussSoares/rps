from django.db import models

from rps_server.models import BaseUUIDModel


class ClientPaymentStatus(models.IntegerChoices):
    COMPLIANT = 1, "Adimplente"
    DEFAULTING = 2, "Inadimplente"


class Client(BaseUUIDModel):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=11)
    email = models.EmailField(max_length=50, null=True, default=None)
    active = models.BooleanField()

    def __repr__(self):
        return f'<Client name="{self.name}" active={self.active}>'

    @property
    def payment_status(self):
        from apps.finance.models import Bill, PaymentStatus
        if Bill.objects.filter(client_id=self.id, payment_status=PaymentStatus.OVERDUE.value).exists():
            return ClientPaymentStatus.DEFAULTING.label
        return ClientPaymentStatus.COMPLIANT.label
