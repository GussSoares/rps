import factory
import faker
import re

from apps.service.models import Service

fake = faker.Faker()


class ServiceFactory(factory.django.DjangoModelFactory):
    
    @factory.lazy_attribute
    def name(self):
        return fake.name().upper()

    @factory.lazy_attribute
    def active(self):
        return fake.boolean()

    class Meta:
        model = Service
    