from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from apps.authentication import urls as auth_urls
from apps.notifications import urls as notification_urls
from apps.client import urls as client_urls
from apps.service import urls as service_urls
from apps.finance import urls as finance_urls
from rps_server.utils import get_version

major, _, _ = get_version()

schema_view = get_schema_view(
   openapi.Info(
      title="Your API Title",
      default_version=f'v{major}',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@yourapi.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
   authentication_classes=[],
)

urls = [
    path('admin/', admin.site.urls),
    path('auth/', include(auth_urls)),
    path('notification/', include(notification_urls)),
    path('client/', include(client_urls)),
    path('service/', include(service_urls)),
    path('finance/', include(finance_urls)),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

v1_urls = [
    path(f'v{major}/', include(urls)),
]

urlpatterns = [
    path('api/', include(v1_urls)),
]
