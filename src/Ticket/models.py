from django.db import models

class Ticket(models.Model):
    SELEC_CATEGORIA = [
        ('soporte', 'Soporte'),
        ('Ventas', 'Ventas'),
        ('facturacion', 'Facturacion'),
        ('otros', 'Otros'),
    ]
    SELEC_PRIORIDAD = [
        ('baja', 'Baja'),
        ('media', 'Media'),
        ('alta', 'Alta'),
    ]
    SELEC_ESTADO = [
        ('abierto', 'Abierto'),
        ('en_proceso', 'En proceso'),
        ('resuelto', 'Resuelto'),
    ]

    titulo = models.CharField(max_length=150)
    descripcion = models.TextField()
    categoria = models.CharField(choices=SELEC_CATEGORIA)
    prioridad = models.CharField(choices=SELEC_PRIORIDAD)
    estado = models.CharField(choices=SELEC_ESTADO, default='abierto')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} - {self.titulo}"



