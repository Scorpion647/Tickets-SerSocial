from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from Cuentas.api.permissions import IsOwnerOrAgente
from Ticket.models import Ticket
from Ticket.api.serializers import TicketSerializer


class TicketView(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by("-created_at")
    serializer_class = TicketSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["estado", "prioridad", "categoria"]
    search_fields = ["referencia", "titulo"]
    permission_classes = [IsAuthenticated, IsOwnerOrAgente]

    def get_queryset(self):
        user = self.request.user
        if user.profile.rol == "agente":
            return Ticket.objects.all()
        else:
            return Ticket.objects.filter(creado_por=user)

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)
