from datetime import datetime

import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import authentication
from rest_framework import exceptions
from rest_framework.request import Request

User = get_user_model()


class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request: Request):
        # Extract the JWT from the Authorization header
        jwt_token = request.META.get('HTTP_AUTHORIZATION')
        if jwt_token is None:
            raise exceptions.NotAuthenticated()

        jwt_token = JWTAuthentication.get_the_token_from_header(jwt_token)  # clean the token

        # Decode the JWT and verify its signature
        try:
            payload: dict = jwt.decode(jwt_token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.exceptions.InvalidSignatureError:
            raise exceptions.AuthenticationFailed('Invalid signature')
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Expired token')
        except:
            raise exceptions.ParseError()

        # Get the user from the database
        username_or_phone_number = payload.get('username')
        if username_or_phone_number is None:
            raise exceptions.AuthenticationFailed('User identifier not found in JWT')

        user = User.objects.filter(username=username_or_phone_number).first()
        if user is None:
            user = User.objects.filter(phone_number=username_or_phone_number).first()
            if user is None:
                raise exceptions.AuthenticationFailed('User not found')

        # Return the user and token payload
        return user, payload

    def authenticate_header(self, request):
        return 'Bearer'

    @classmethod
    def create_jwt(cls, user):
        # Create the JWT payload
        payload = {
            'user_identifier': user.username,
            'exp': int((datetime.now() + settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']).timestamp()),
            # set the expiration time for 5 hour from now
            'iat': datetime.now().timestamp(),
            'username': user.username,
            'phone_number': user.phone
        }

        # Encode the JWT with your secret key
        jwt_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

        return jwt_token

    @classmethod
    def get_the_token_from_header(cls, token):
        token = token.replace('Bearer', '').replace(' ', '')  # clean the token
        return token
