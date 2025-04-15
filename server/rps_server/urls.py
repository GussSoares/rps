from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from apps.authentication import urls as auth_urls
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
    
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

v1_urls = [
    path(f'v{major}/', include(urls)),
]

urlpatterns = [
    path('api/', include(v1_urls)),
]
