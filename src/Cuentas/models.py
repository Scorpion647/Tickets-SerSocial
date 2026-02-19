from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Cuentas(models.Model):
    ROLES = [
        ("solicitante", "Solicitante"),
        ("agente", "Agente"),
    ]

    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    rol = models.CharField(max_length=20, choices=ROLES, default="solicitante")

    def __str__(self):
        return f"{self.usuario} - {self.rol}"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Cuentas.objects.create(usuario=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
