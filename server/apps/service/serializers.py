from rest_framework import serializers

from apps.service.models import Service


class ServiceSearchSerializer(serializers.Serializer):
    class OrderBySerializer(serializers.Serializer):
        id = serializers.CharField()
        desc = serializers.BooleanField()

    search = serializers.CharField(required=False)
    per_page = serializers.IntegerField(default=10)
    page = serializers.IntegerField(default=1)
    order_by = serializers.CharField(required=False, default='name')


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class UpdateServiceSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)
    active = serializers.BooleanField(required=False)
    
    class Meta:
        model = Service
        fields = ('name', 'active')
