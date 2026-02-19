from rest_framework import serializers
from Comentario.models import Comentario


class ComentarioSerializer(serializers.ModelSerializer):
    autor_nombre = serializers.CharField(source="autor.first_name", read_only=True)

    class Meta:
        model = Comentario
        fields = "__all__"
        read_only_fields = ("fecha_registro", "autor_nombre")
