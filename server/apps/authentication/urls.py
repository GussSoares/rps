from django.urls import path
from apps.authentication.viewsets import AuthViewSet, UserViewSet


auth_urls = [
    path('login', AuthViewSet.as_view({"post": "login"}), name="login"),
    path('register', AuthViewSet.as_view({"post": "register"}), name="register"),
    # path('logout/', AuthViewSet.as_view({"get": "get"})),
]

user_urls = [
    path('user/', UserViewSet.as_view({"get": "get"})),
]

urlpatterns = [
    *auth_urls,
    *user_urls
]
