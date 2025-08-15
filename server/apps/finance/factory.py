import pytz
from datetime import timedelta
from decimal import Decimal
from random import randint, uniform, choice

import factory
import faker
from django.utils import timezone

from apps.finance.models import Bill, BillType, PaymentMethod, PaymentStatus
from apps.client.models import Client
from apps.service.models import Service

fake = faker.Faker()


class BillFactory(factory.django.DjangoModelFactory):
    @staticmethod
    def random_client():
        clients = Client.objects.all()
        return choice(clients) if clients else None

    @staticmethod
    def random_service():
        services = Service.objects.all()
        return choice(services) if services else None

    type = factory.LazyFunction(
        lambda: BillType.TO_PAY.value if randint(0, 1) else BillType.TO_RECEIVE.value
    )
    client = factory.LazyFunction(random_client)
    service = factory.LazyFunction(random_service)
    value = factory.LazyFunction(lambda: Decimal(f"{uniform(100, 10000):.2f}"))
    paid_value = factory.LazyAttribute(
        lambda o: o.value if randint(0, 1) else Decimal("0.00")
    )
    payment_method = factory.LazyFunction(
        lambda: randint(1, len(PaymentMethod.choices))
    )
    payment_status_date = factory.LazyFunction(timezone.now)

    created_at = factory.LazyFunction(
        lambda: fake.date_time_between(
            start_date="-3y", end_date="now", tzinfo=pytz.UTC
        )
    )

    @factory.lazy_attribute
    def payment_status(self):
        if self.value == self.paid_value:
            return 2
        return choice([1, 3, 4])

    @factory.lazy_attribute
    def due_date(self):
        return self.created_at.date() + timedelta(days=randint(1, 30))

    @factory.lazy_attribute
    def description(self):
        BILL_TO_PAY_DESCRIPTIONS = (
            "Aluguel do escritório",
            "Conta de energia elétrica",
            "Conta de água e esgoto",
            "Compra de material de escritório",
            "Internet e telefone",
        )
        BILL_TO_RECEIVE_DESCRIPTIONS = (
            "Prestação de serviço",
            "Depósito bancário de cliente",
            "Recebimento via PIX",
            "Transferência bancária",
            "Venda via cartão de crédito",
        )
        if self.type == BillType.TO_PAY.value:
            return choice(BILL_TO_PAY_DESCRIPTIONS)
        else:
            return choice(BILL_TO_RECEIVE_DESCRIPTIONS)

    class Meta:
        model = Bill
