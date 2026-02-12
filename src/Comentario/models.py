from django.db import models
from Ticket.models import Ticket

class Comentario(models.Model):

    #se agrega en el modelo de la tabla de base de datos un nuevo campo que llame ticket para simplemente relacionar cada comentario a su ticket que corresponde
    ticket = models.ForeignKey(Ticket,on_delete=models.CASCADE, related_name='Comentario')
    Titulo = models.CharField(max_length=150, blank=False)
    Descripcion = models.TextField()
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comentario del ticket {self.ticket.id} con ID {self.id} - {self.fecha_registro}"

