from django.urls import path
from apps.notifications.viewsets import NotificationViewSet


notification_urls = [
    path('', NotificationViewSet.as_view({"get": "get"}), name="notification"),
    path('<uuid:pk>/', NotificationViewSet.as_view({"get": "get"}), name="notification"),
    path('read/<uuid:pk>/', NotificationViewSet.as_view({"post": "read"}), name="notification_read")
]

urlpatterns = [
    *notification_urls,
]
