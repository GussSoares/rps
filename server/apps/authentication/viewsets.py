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
from apps.authentication.github import GithubClient
from rps_server.decorators import websocket_notify_decorator
from apps.notifications.enums import NotificationTypes
from apps.notifications.utils import NotificationUtil


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
    @websocket_notify_decorator
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
        NotificationUtil.create(
            title='Usuário logado',
            description=f'Usuário <b>{user.get_full_name()}</b> logou via Google em {datetime.now().strftime("%d/%m/%Y")}',
            user_id=user.id,
            type_id=NotificationTypes.LOGIN.value
        )
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })


class AuthWithGithubViewSet(PublicViewSet):

    @websocket_notify_decorator
    def login(self, request):
        serializer = serializers.LoginWithGithubSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        User = get_user_model()

        access_token = GithubClient.get_token(code=serializer.data['code'])
        user_info = GithubClient.get_user_info(access_token=access_token)

        email = user_info["email"]
        username = user_info.get("login", email)

        user, _ = User.objects.get_or_create(email=email, defaults={"username": username, "first_name": username})

        refresh = RefreshToken.for_user(user)

        NotificationUtil.create(
            title='Usuário logado',
            description=f'Usuário <b>{user.get_full_name()}</b> logou via Github em {datetime.now().strftime("%d/%m/%Y")}',
            user_id=user.id,
            type_id=NotificationTypes.LOGIN.value
        )
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })


class UserViewSet(ViewSet):
    def get(self, request: Request):
        return Response(serializers.UserSerializer(request.user).data, status=status.HTTP_200_OK)

    def patch(self, request: Request):
        serializer = serializers.EditUserSerializer(request.user, data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(serializers.UserSerializer(user).data, status=status.HTTP_200_OK)
