import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.contrib.auth.models import User
from Ticket.models import Ticket
from Comentario.models import Comentario
from faker import Faker

fake = Faker("es_ES")


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument(
            "--tickets",
            type=int,
            default=20,
        )
        parser.add_argument(
            "--comentarios",
            type=int,
            default=50,
        )
        parser.add_argument(
            "--clear",
            action="store_true",
        )

    def handle(self, *args, **options):
        num_tickets = options["tickets"]
        num_comentarios = options["comentarios"]
        clear = options["clear"]

        if clear:
            self.stdout.write("  Eliminando datos existentes...")
            Comentario.objects.all().delete()
            Ticket.objects.all().delete()

        usuarios = list(User.objects.all())
        if not usuarios:
            self.stdout.write(" No hay usuarios. Creando un usuario de prueba...")
            user = User.objects.create_user(
                username="demo", email="demo@example.com", password="demo123", first_name="Usuario", last_name="Demo"
            )
            if hasattr(user, "profile"):
                user.profile.rol = "solicitante"
                user.profile.save()
            usuarios = [user]

        categorias = ["soporte", "ventas", "facturacion", "otros"]
        prioridades = ["baja", "media", "alta"]
        estados = ["abierto", "en_proceso", "resuelto"]

        tickets_creados = []

        self.stdout.write(f" Creando {num_tickets} tickets...")

        for i in range(num_tickets):
            dias_atras = random.randint(0, 30)
            fecha_creacion = timezone.now() - timedelta(days=dias_atras)
            creador = random.choice(usuarios)

            ticket = Ticket.objects.create(
                titulo=fake.sentence(nb_words=6)[:-1],
                descripcion=fake.paragraph(nb_sentences=random.randint(2, 5)),
                categoria=random.choice(categorias),
                prioridad=random.choice(prioridades),
                estado=random.choice(estados),
                creado_por=creador,
            )
            ticket.created_at = fecha_creacion
            ticket.updated_at = fecha_creacion + timedelta(hours=random.randint(1, 48))
            ticket.save()
            tickets_creados.append(ticket)
            self.stdout.write(f" Ticket {i + 1}: {ticket.titulo[:50]}...")

        self.stdout.write(f"\n {len(tickets_creados)} tickets creados")
        comentarios_creados = 0
        self.stdout.write(f" Creando {num_comentarios} comentarios...")

        for _ in range(num_comentarios):
            ticket = random.choice(tickets_creados)
            dias_despues = random.randint(0, max(1, (timezone.now() - ticket.created_at).days))
            fecha_comentario = ticket.created_at + timedelta(days=dias_despues)
            autor = random.choice(usuarios)

            Comentario.objects.create(
                ticket=ticket,
                Titulo=fake.sentence(nb_words=4)[:-1],
                Descripcion=fake.paragraph(nb_sentences=random.randint(1, 3)),
                autor=autor,
                fecha_registro=fecha_comentario,
            )
            comentarios_creados += 1

            if comentarios_creados % 10 == 0:
                self.stdout.write(f"     ... {comentarios_creados} comentarios")

        self.stdout.write(f" {comentarios_creados} comentarios creados")
        self.stdout.write(self.style.SUCCESS("\n🎉 ¡Base de datos poblada exitosamente!"))
