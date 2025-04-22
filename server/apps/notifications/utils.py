

import uuid

from apps.notifications.models import Notification


class NotificationUtil:
    @staticmethod
    def _send(notification: Notification):
        ...

    @staticmethod
    def create(title: str, description: str, type_id: int, user_id: uuid.UUID = None):
        notification = Notification.objects.create(
            title=title,
            description=description,
            user_id=user_id,
            type_id=type_id
        )
        NotificationUtil._send(notification)
