from rest_framework import permissions


class IsSolicitante(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.profile.rol == "solicitante"


class IsAgente(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.profile.rol == "agente"


class IsOwnerOrAgente(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.profile.rol == "agente":
            return True
        return obj.creado_por == request.user
