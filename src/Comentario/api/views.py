from rest_framework import viewsets
from Comentario.models import Comentario
from Comentario.api.serializers import ComentarioSerializer

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
