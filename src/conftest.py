import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def create_user(db):
    def make_user(username="testuser", password="testpass", rol="solicitante"):
        user = User.objects.create_user(username=username, password=password)
        user.profile.rol = rol
        user.profile.save()
        return user

    return make_user


@pytest.fixture
def authenticated_client(api_client, create_user):
    user = create_user()
    api_client.force_authenticate(user=user)
    return api_client
