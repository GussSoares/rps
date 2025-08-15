from django.core.management import BaseCommand, CommandError
from django.db import transaction
from faker import Faker

from apps.finance.factory import BillFactory


fake = Faker()

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument(
            '--number',
            required=False,
            help='Total Clients to be created',
            type=int
        )

    def handle(self, *args, **options):
        try:
            with transaction.atomic():
                BillFactory.create_batch(size=options['number'])
                self.stdout.write(self.style.SUCCESS(f"{options['number']} new fake Bills have been added."))
        except Exception as e:
            raise CommandError(f"Erro: {str(e)}") from e
