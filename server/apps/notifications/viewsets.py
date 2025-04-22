from uuid import UUID
from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.viewsets import ViewSet

from apps.notifications import serializers
from apps.notifications.models import Notification


class NotificationViewSet(ViewSet):
    def get(self, request: Request, pk: UUID = None):
        if pk:
            notifications = Notification.objects.filter(id=pk)
        else:
            notifications = Notification.objects.all()
        
        serializer = serializers.NotificationSerializer(notifications, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
