from django.urls import path
from apps.authentication.viewsets import AuthViewSet, UserViewSet, AuthWithGoogleViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


auth_urls = [
    path('token/', TokenObtainPairView.as_view(), name="token"),
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('login/', AuthViewSet.as_view({"post": "login"}), name="login"),
    path('login/google', AuthWithGoogleViewSet.as_view({"post": "login"}), name="login_with_google"),
    path('register/', AuthViewSet.as_view({"post": "register"}), name="register"),
    path('logout/', AuthViewSet.as_view({"post": "logout"}), name="logout"),
]

user_urls = [
    path('user/', UserViewSet.as_view({"get": "get"})),
]

urlpatterns = [
    *auth_urls,
    *user_urls
]
