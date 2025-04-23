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
            required=True,
            help='Total Talents to be created',
            type=int
        )

    def handle(self, *args, **options):
        try:
            with transaction.atomic():
                Service.objects.create(name='Retífica de Motores')
                Service.objects.create(name='Retífica de Cabeçotes')
                Service.objects.create(name='Retífica de Virabrequim')
                Service.objects.create(name='Retífica de Bloco de Motor')
                Service.objects.create(name='Plaina de Cabeçote')
                Service.objects.create(name='Montagem de Motor')
                Service.objects.create(name='Honeamento de Cilindros')
                Service.objects.create(name='Reparação de Bielas')
                Service.objects.create(name='Solda de Alumínio em Cabeçotes')
                Service.objects.create(name='Alinhamento de Virabrequim')
                Service.objects.create(name='Recondicionamento de Válvulas')
                Service.objects.create(name='Troca de Guias e Sedes de Válvulas')
                Service.objects.create(name='Furação e Rosqueamento')
                Service.objects.create(name='Usinagem de Volante do Motor')
                Service.objects.create(name='Balanceamento de Virabrequim')
                Service.objects.create(name='Aplainamento de Coletor de Admissão/Escape')
                Service.objects.create(name='Teste Hidrostático de Cabeçotes')
                Service.objects.create(name='Rebaixamento de Cabeçote')
                Service.objects.create(name='Soldagem e Recuperação de Blocos Trincados')
                Service.objects.create(name='Limpeza Química de Peças')
                Service.objects.create(name='Análise Técnica e Laudo de Componentes')
                Service.objects.create(name='Montagem Parcial de Cabeçotes')
                Service.objects.create(name='Polimento de Virabrequim')
                Service.objects.create(name='Ajuste de Altura de Pistões')
                Service.objects.create(name='Serviço de Torno e Fresa')
                self.stdout.write(self.style.SUCCESS(f"{options['number']} new fake Clients have been added."))
        except Exception as e:
            raise CommandError(f"Erro: {str(e)}") from e
