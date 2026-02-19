from Ticket.models import Ticket
from rest_framework import serializers
from Cuentas.api.serializers import UserSerializer
from Comentario.api.serializers import ComentarioSerializer


class TicketSerializer(serializers.ModelSerializer):
    Comentario = ComentarioSerializer(many=True, read_only=True)
    creado_por = UserSerializer(read_only=True)

    class Meta:
        model = Ticket
        fields = "__all__"
