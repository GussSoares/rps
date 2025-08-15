from rest_framework import serializers

from apps.finance.models import Bill
from apps.client.serializers import ClientSerializer
from apps.service.serializers import ServiceSerializer


class BillSearchSerializer(serializers.Serializer):
    class OrderBySerializer(serializers.Serializer):
        id = serializers.CharField()
        desc = serializers.BooleanField()

    search = serializers.CharField(required=False)
    per_page = serializers.IntegerField(default=10)
    page = serializers.IntegerField(default=1)
    order_by = serializers.CharField(required=False, default='date')


class BillSerializer(serializers.ModelSerializer):
    client = ClientSerializer()
    service = ServiceSerializer()

    class Meta:
        model = Bill
        fields = "__all__"


class ToPayDonutChartSerializer(serializers.Serializer):
    class ItemSerializer(serializers.Serializer):
        label = serializers.CharField()
        value = serializers.DecimalField(decimal_places=2, max_digits=10)

    total = serializers.DecimalField(decimal_places=2, max_digits=10)
    items = ItemSerializer(many=True)
