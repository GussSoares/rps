import requests
from django.conf import settings


class GoogleClient:
	OAUTH_URL = 'https://oauth2.googleapis.com/token'
	API_BASE_URL = 'https://www.googleapis.com/oauth2/v3'

	def get_token(code: str) -> str:
		"""receive code of Frontend and return the access token to call Google Api"""
		response = requests.post(
			url=GoogleClient.OAUTH_URL,
			data={
				"code": code,
				"client_id": settings.GOOGLE_CLIENT_ID,
				"client_secret": settings.GOOGLE_CLIENT_SECRET,
				"redirect_uri": "postmessage",  # padrão para apps frontend
				"grant_type": "authorization_code",
			},
		)
		response.raise_for_status()
		return response.json()['access_token']

	def get_user_info(access_token: str) -> dict:
		response = requests.get(
			url=f"{GoogleClient.API_BASE_URL}/userinfo",
 			headers={"Authorization": f"Bearer {access_token}"}
		)
		response.raise_for_status()
		return response.json()
