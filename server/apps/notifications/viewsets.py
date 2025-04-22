from uuid import UUID
from datetime import datetime

from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.viewsets import ViewSet

from apps.notifications import serializers
from apps.notifications.models import Notification


class NotificationViewSet(ViewSet):
    def get(self, request: Request, pk: UUID = None):
        search = serializers.NotificationSearchSerializer(data=request.data)
        search.is_valid(raise_exception=True)

        if pk:
            notifications = Notification.objects.filter(id=pk, is_readed=False)
        else:
            notifications = Notification.objects.filter(user_id=request.user.id, is_readed=False)

        paginator = Paginator(notifications.order_by('-created_at'), search.data['per_page'])

        try:
            page = paginator.page(search.data['page'])
        except Exception:
            return Response({'message': 'That page contains no results.'}, status.HTTP_400_BAD_REQUEST)

        serializer = serializers.NotificationSerializer(page, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def read(self, request: Request, pk: UUID):
        notification = get_object_or_404(Notification, pk=pk)
        
        notification.is_readed = True
        notification.readed_at = datetime.now()
        notification.save(update_fields=('is_readed', 'readed_at'))

        serializer = serializers.NotificationSerializer(notification)

        return Response(serializer.data, status=status.HTTP_200_OK)
