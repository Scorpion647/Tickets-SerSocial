import pytest
from rest_framework import status
from Ticket.models import Ticket
from Comentario.models import Comentario


@pytest.mark.django_db
class TestComentarioAPI:
    def test_create_comentario(self, authenticated_client):
        user = authenticated_client.handler._force_user
        ticket = Ticket.objects.create(
            titulo="Ticket",
            descripcion="Desc",
            categoria="soporte",
            prioridad="media",
            estado="abierto",
            creado_por=user,
        )
        data = {"ticket": ticket.id, "Titulo": "Comentario de prueba", "Descripcion": "Contenido del comentario"}
        response = authenticated_client.post("/api/Comentario/", data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Comentario.objects.count() == 1
        comentario = Comentario.objects.first()
        assert comentario.Titulo == data["Titulo"]
        assert comentario.autor == user

    def test_list_comentarios_by_ticket(self, authenticated_client):
        user = authenticated_client.handler._force_user
        ticket = Ticket.objects.create(
            titulo="Ticket",
            descripcion="Desc",
            categoria="soporte",
            prioridad="media",
            estado="abierto",
            creado_por=user,
        )
        Comentario.objects.create(ticket=ticket, Titulo="C1", Descripcion="D1", autor=user)
        Comentario.objects.create(ticket=ticket, Titulo="C2", Descripcion="D2", autor=user)
        response = authenticated_client.get(f"/api/Comentario/?ticket={ticket.id}")
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data["results"]) == 2
