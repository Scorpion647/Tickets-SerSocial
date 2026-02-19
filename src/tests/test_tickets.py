import pytest
from rest_framework import status
from Ticket.models import Ticket


@pytest.mark.django_db
class TestTicketAPI:
    def test_list_tickets_empty(self, authenticated_client):
        response = authenticated_client.get("/api/Ticket/")
        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 0

    def test_create_ticket(self, authenticated_client):
        data = {
            "titulo": "Ticket de prueba",
            "descripcion": "Descripción de prueba",
            "categoria": "soporte",
            "prioridad": "media",
            "estado": "abierto",
        }
        response = authenticated_client.post("/api/Ticket/", data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Ticket.objects.count() == 1
        ticket = Ticket.objects.first()
        assert ticket.titulo == data["titulo"]
        assert ticket.creado_por is not None

    def test_filter_tickets_by_estado(self, authenticated_client):
        user = authenticated_client.handler._force_user
        Ticket.objects.create(
            titulo="T1", descripcion="D1", categoria="soporte", prioridad="media", estado="abierto", creado_por=user
        )
        Ticket.objects.create(
            titulo="T2", descripcion="D2", categoria="soporte", prioridad="media", estado="cerrado", creado_por=user
        )
        response = authenticated_client.get("/api/Ticket/?estado=abierto")
        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 1
        assert response.data["results"][0]["estado"] == "abierto"
