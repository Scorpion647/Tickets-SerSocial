from rest_framework import viewsets
from Ticket.models import Ticket
from Ticket.api.serializers import TicketSerializer
from django_filters.rest_framework import DjangoFilterBackend

class TicketView(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['estado', 'prioridad', 'categoria']