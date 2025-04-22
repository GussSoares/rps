from rest_framework import serializers

from apps.notifications.models import Notification


class NotificationSearchSerializer(serializers.Serializer):
    search = serializers.CharField(required=False)
    per_page = serializers.IntegerField(default=5)
    page = serializers.IntegerField(default=1)

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"
