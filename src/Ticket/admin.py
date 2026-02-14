from django.contrib import admin
from .models import Ticket

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'categoria', 'prioridad', 'estado', 'created_at')
    list_filter = ('categoria', 'prioridad', 'estado')
    search_fields = ('titulo', 'descripcion')