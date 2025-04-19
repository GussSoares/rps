from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('id', 'groups', 'user_permissions', 'password')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        for k, v in UserSerializer(user).data.items():
            token[k] = v

        return token


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class LoginOAuthSerializer(serializers.Serializer):
    code = serializers.CharField()


class LoginWithGoogleSerializer(LoginOAuthSerializer): ...


class LoginWithGithubSerializer(LoginOAuthSerializer): ...


class TokenResponseSerializer(serializers.Serializer):
    token = serializers.CharField()


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField()

    class Meta:
        model = User
        fields = ('username', 'password', 'confirm_password', 'first_name', 'last_name', 'email', 'phone', 'gender', 'country', 'city', 'state')

    def validate(self, attrs):
        return super().validate(attrs)

    def save(self, **kwargs):
        self.validated_data.pop('confirm_password')
        user = super().save(**kwargs)
        user.set_password(user.password)
        user.save()
        return user