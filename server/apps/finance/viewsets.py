from decimal import Decimal
from uuid import UUID

from django.db.models import Sum, Count
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from apps.finance.models import Bill, BillType
from apps.finance import serializers
from rps_server.pagination import CustomPagination


class FinanceToPayViewSet(ViewSet):
    def get(self, request: Request, pk: UUID):
        client = get_object_or_404(Bill, pk=pk)
        return Response(serializers.BillSerializer(client).data, status=status.HTTP_200_OK)

    def list(self, request: Request):
        serializer = serializers.BillSearchSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        queryset = Bill.objects.filter(type=BillType.TO_PAY.value).order_by(serializer.data['order_by'])

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)
        serializer = serializers.BillSerializer(paginated_qs, many=True)
        return paginator.get_paginated_response(serializer.data)


class FinanceToReceiveViewSet(ViewSet):
    def get(self, request: Request, pk: UUID):
        client = get_object_or_404(Bill, pk=pk)
        return Response(serializers.BillSerializer(client).data, status=status.HTTP_200_OK)

    def list(self, request: Request):
        serializer = serializers.BillSearchSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        queryset = Bill.objects.filter(type=BillType.TO_RECEIVE.value).order_by(serializer.data['order_by'])

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)
        serializer = serializers.BillSerializer(paginated_qs, many=True)
        return paginator.get_paginated_response(serializer.data)


class DashboardFinancesViewSet(ViewSet):
    def get_to_pay_amount_by_service(self, request: Request):
        bills = Bill.objects.filter(type=BillType.TO_RECEIVE.value).values('service__name').annotate(total=Sum('value'))

        items = [
            {"label": entry["service__name"], "value": round(entry["total"], 2)}
            for entry in bills
        ]

        serializer = serializers.ToPayDonutChartSerializer(data={
            'total': sum((item["value"] for item in items), Decimal("0")),
            'items': items
        })
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_to_pay_count_by_service(self, request: Request):
        bills = Bill.objects.filter(type=BillType.TO_RECEIVE.value).values('service__name').annotate(total=Count('value'))

        items = [
            {"label": entry["service__name"], "value": entry["total"]}
            for entry in bills
        ]

        serializer = serializers.ToPayDonutChartSerializer(data={
            'total': sum((item["value"] for item in items), 0),
            'items': items
        })
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)