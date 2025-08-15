from django.core.management import BaseCommand, CommandError
from django.db import transaction
from faker import Faker

from apps.client.models import Client
from apps.client.factory import ClientFactory


fake = Faker()

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument(
            '--number',
            required=False,
            help='Total Clients to be created',
            type=int
        )
        parser.add_argument(
            '--add-email',
            action='store_true'
        )

    def handle(self, *args, **options):
        try:
            with transaction.atomic():
                if options['add_email']:
                    for client in Client.objects.all():
                        client.email = fake.email()
                        client.save(update_fields=['email'])
                    return

                ClientFactory.create_batch(size=options['number'])
                self.stdout.write(self.style.SUCCESS(f"{options['number']} new fake Clients have been added."))
        except Exception as e:
            raise CommandError(f"Erro: {str(e)}") from e
