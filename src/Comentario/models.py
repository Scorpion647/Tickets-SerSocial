from django.db import models
from Ticket.models import Ticket
from django.contrib.auth.models import User


class Comentario(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name="Comentario")
    Titulo = models.CharField(max_length=150, blank=False)
    Descripcion = models.TextField()
    fecha_registro = models.DateTimeField(auto_now_add=True)
    autor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="comentarios")

    def __str__(self):
        return f"Comentario del ticket {self.autor} con ID {self.id} - {self.ticket.id}"

    class Meta:
        ordering = ["-fecha_registro"]
