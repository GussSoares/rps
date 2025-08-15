from django.urls import path
from apps.service.viewsets import ServiceViewSet


service_urls = [
    path('', ServiceViewSet.as_view({"get": "list"}), name="services"),
    path('<uuid:pk>/', ServiceViewSet.as_view({"get": "get", "patch": "patch"}), name="service"),
]

urlpatterns = [
    *service_urls,
]
