from django.urls import path
from apps.client.viewsets import ClientViewSet


clients_urls = [
    path('', ClientViewSet.as_view({"get": "list"}), name="clients"),
    path('<uuid:pk>/', ClientViewSet.as_view({"get": "get", "patch": "patch"}), name="client"),
]

urlpatterns = [
    *clients_urls,
]
