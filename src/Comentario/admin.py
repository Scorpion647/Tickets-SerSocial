from django.contrib import admin
from .models import Comentario

@admin.register(Comentario)
class ComentarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'ticket', 'Titulo', 'fecha_registro')
    list_filter = ('fecha_registro',)
    search_fields = ('Titulo', 'Descripcion')
