import requests
from django.conf import settings


class GithubClient:
	OAUTH_URL = 'https://github.com/login/oauth/access_token'
	API_BASE_URL = 'https://api.github.com'

	def get_token(code: str) -> str:
		"""receive code of Frontend and return the access token to call Google Api"""
		response = requests.post(
			url=GithubClient.OAUTH_URL,
			data={
				"code": code,
				"client_id": settings.GITHUB_CLIENT_ID,
				"client_secret": settings.GITHUB_CLIENT_SECRET,
			},
			headers={'Accept': 'application/json'}
		)
		response.raise_for_status()
		return response.json()['access_token']

	def get_user_info(access_token: str) -> dict:
		response = requests.get(
			url=f"{GithubClient.API_BASE_URL}/user",
 			headers={"Authorization": f"token {access_token}"}
		)
		response.raise_for_status()
		return response.json()
