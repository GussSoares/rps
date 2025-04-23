import factory
import faker
import re

from apps.client.models import Client

fake = faker.Faker()


class ClientFactory(factory.django.DjangoModelFactory):
    
    @factory.lazy_attribute
    def name(self):
        return fake.name().upper()

    @factory.lazy_attribute
    def phone(self):
        return re.sub(r'\D', '', factory.Faker('cellphone_number').evaluate(self, None, {'locale': 'pt_BR'}))

    @factory.lazy_attribute
    def active(self):
        return fake.boolean()

    class Meta:
        model = Client
    