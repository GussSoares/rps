from uuid import UUID

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from apps.client.models import Client
from apps.client import serializers
from rps_server.pagination import CustomPagination


class ClientViewSet(ViewSet):
    def get(self, request: Request, pk: UUID):
        client = get_object_or_404(Client, pk=pk)
        return Response(serializers.ClientSerializer(client).data, status=status.HTTP_200_OK)

    def list(self, request: Request):
        serializer = serializers.ClientSearchSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        queryset = Client.objects.order_by(serializer.data['order_by'])

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)
        serializer = serializers.ClientSerializer(paginated_qs, many=True)
        return paginator.get_paginated_response(serializer.data)

    def patch(self, request: Request, pk: UUID):
        service = get_object_or_404(Client, pk=pk)

        serializer = serializers.UpdateClientSerializer(service, data=request.data)
        serializer.is_valid(raise_exception=True)
        service = serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
