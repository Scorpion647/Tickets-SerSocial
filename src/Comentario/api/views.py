from rest_framework import viewsets
from Comentario.models import Comentario
from Comentario.api.serializers import ComentarioSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all().order_by("-fecha_registro")
    serializer_class = ComentarioSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)
