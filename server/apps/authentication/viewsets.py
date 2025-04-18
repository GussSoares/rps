from datetime import datetime

from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from apps.authentication import serializers
from apps.authentication.authentication import JWTAuthentication
from apps.authentication.google import GoogleClient


class PublicViewSet(ViewSet):
    permission_classes = []
    authentication_classes = []


class AuthViewSet(PublicViewSet):
    """Authentication endpoints"""
    
    @swagger_auto_schema(
        request_body=serializers.LoginSerializer,
        responses={
            200: serializers.TokenResponseSerializer,
            401: serializers.MessageSerializer
        }
    )
    def login(self, request: Request):
        """Login endpoint to receive token"""
        serializer = serializers.LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        User = get_user_model()

        try:
            user = User.objects.get(username=serializer.data['username'])
        except User.DoesNotExist:
            return Response({'message': 'User does not exist'}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.check_password(serializer.data['password']):
            return Response({'message': 'Incorrect password'}, status=status.HTTP_401_UNAUTHORIZED)

        user.last_login = datetime.now()
        user.save(update_fields=('last_login',))

        return Response({"token": JWTAuthentication.create_jwt(user)}, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=serializers.RegisterSerializer,
        responses={
            200: serializers.TokenResponseSerializer,
            401: serializers.MessageSerializer
        }
    )
    def register(self, request: Request):
        serializer = serializers.RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        return Response(serializers.UserSerializer(user).data, status=status.HTTP_201_CREATED)

    def logout(self, request: Request):
        refresh = request.data['refresh']
        RefreshToken(refresh).blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)


class AuthWithGoogleViewSet(PublicViewSet):
    def login(self, request):
        serializer = serializers.LoginWithGoogleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        User = get_user_model()

        access_token = GoogleClient.get_token(code=serializer.data['code'])
        user_info = GoogleClient.get_user_info(access_token=access_token)

        email = user_info["email"]
        name = user_info.get("name", email)

        user, _ = User.objects.get_or_create(email=email, defaults={"username": email, "first_name": name})

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })


class AuthWithGithubViewSet(PublicViewSet):
    def login(self, request):
        serializer = serializers.LoginWithGithubSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        User = get_user_model()

        access_token = GoogleClient.get_token(code=serializer.data['code'])
        user_info = GoogleClient.get_user_info(access_token=access_token)

        email = user_info["email"]
        name = user_info.get("name", email)

        user, _ = User.objects.get_or_create(email=email, defaults={"username": email, "first_name": name})

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })


class UserViewSet(ViewSet):
    def get(self, request: Request):
        return Response(serializers.UserSerializer(request.user).data, status=status.HTTP_200_OK)
