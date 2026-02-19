from django.db import models
from django.contrib.auth.models import User
import datetime
import random
import string


class Ticket(models.Model):
    SELEC_CATEGORIA = [
        ("soporte", "Soporte"),
        ("ventas", "Ventas"),
        ("facturacion", "Facturacion"),
        ("otros", "Otros"),
    ]
    SELEC_PRIORIDAD = [
        ("baja", "Baja"),
        ("media", "Media"),
        ("alta", "Alta"),
    ]
    SELEC_ESTADO = [
        ("abierto", "Abierto"),
        ("en_proceso", "En proceso"),
        ("resuelto", "Resuelto"),
    ]

    titulo = models.CharField(max_length=150)
    descripcion = models.TextField()
    categoria = models.CharField(choices=SELEC_CATEGORIA)
    prioridad = models.CharField(choices=SELEC_PRIORIDAD)
    estado = models.CharField(choices=SELEC_ESTADO, default="abierto")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    referencia = models.CharField(max_length=20, unique=True, blank=True)
    creado_por = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="tickets")

    def save(self, *args, **kwargs):
        if not self.referencia:
            fecha = datetime.date.today().strftime("%y%m%d")
            random_part = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
            self.referencia = f"TKT-{fecha}-{random_part}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.id} - {self.titulo}"

    class Meta:
        ordering = ["-created_at"]
