from django.db import models

from apps.client.models import Client
from apps.service.models import Service
from rps_server.models import BaseUUIDModel


class PaymentMethod(models.IntegerChoices):
    CASH = 1, "Espécie"
    DEBIT = 2, "Débito"
    CREDIT = 3, "Crédito"
    PIX = 4, "PIX"


class PaymentStatus(models.IntegerChoices):
    PENDING = 1, "Pendente"
    PAID = 2, "Pago"
    OVERDUE = 3, "Vencido"
    CANCELED = 4, "Cancelado"


class BillType(models.IntegerChoices):
    TO_PAY = 1, "Conta à Pagar"
    TO_RECEIVE = 2, "Conta à Receber"


class Bill(BaseUUIDModel):
    description = models.CharField(max_length=200, null=True)
    type = models.IntegerField(choices=BillType.choices, default=BillType.TO_PAY.value)
    client = models.ForeignKey(to=Client, on_delete=models.SET_NULL, null=True)
    service = models.ForeignKey(to=Service, on_delete=models.SET_NULL, null=True)
    value = models.DecimalField(decimal_places=2, max_digits=10)
    paid_value = models.DecimalField(decimal_places=2, max_digits=10, null=True)
    payment_method = models.IntegerField(choices=PaymentMethod.choices, default=PaymentMethod.CASH.value)
    payment_status = models.IntegerField(choices=PaymentStatus.choices, default=PaymentStatus.PENDING.value)
    payment_status_date = models.DateTimeField(null=True)
