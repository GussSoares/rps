from django.urls import path
from apps.notifications.viewsets import NotificationViewSet


notification_urls = [
    path('', NotificationViewSet.as_view({"get": "get"}), name="notification"),
    path('/<uuid:pk>/', NotificationViewSet.as_view({"get": "get"}), name="notification"),
]

urlpatterns = [
    *notification_urls,
]
