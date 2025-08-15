from rest_framework import serializers

from apps.client.models import Client


class ClientSearchSerializer(serializers.Serializer):
    class OrderBySerializer(serializers.Serializer):
        id = serializers.CharField()
        desc = serializers.BooleanField()

    search = serializers.CharField(required=False)
    per_page = serializers.IntegerField(default=10)
    page = serializers.IntegerField(default=1)
    order_by = serializers.CharField(required=False, default='name')


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class UpdateClientSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    active = serializers.BooleanField(required=False)
    
    class Meta:
        model = Client
        fields = ('name', 'active', 'phone', 'email')
