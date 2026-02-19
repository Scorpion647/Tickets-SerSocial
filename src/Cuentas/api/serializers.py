from rest_framework import serializers
from django.contrib.auth.models import User
from Cuentas.models import Cuentas
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    rol = serializers.CharField(source="profile.rol", read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "rol"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    rol = serializers.ChoiceField(choices=Cuentas.ROLES, default="solicitante")

    class Meta:
        model = User
        fields = ["username", "email", "password", "first_name", "last_name", "rol"]

    def create(self, validated_data):
        rol = validated_data.pop("rol", "solicitante")
        user = User.objects.create_user(**validated_data)
        user.profile.rol = rol
        user.profile.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["email"] = user.email
        token["rol"] = user.profile.rol
        return token
