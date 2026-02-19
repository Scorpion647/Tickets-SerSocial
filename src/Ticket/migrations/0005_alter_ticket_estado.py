from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Ticket", "0004_ticket_creado_por"),
    ]

    operations = [
        migrations.AlterField(
            model_name="ticket",
            name="estado",
            field=models.CharField(
                choices=[("abierto", "Abierto"), ("en_proceso", "En proceso"), ("resuelto", "Resuelto")],
                default="abierto",
            ),
        ),
    ]