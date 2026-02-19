from django.contrib import admin
from .models import Cuentas


@admin.register(Cuentas)
class CuentasAdmin(admin.ModelAdmin):
    list_display = ("usuario", "rol")
    list_filter = ("rol",)
    search_fields = ("usuario__username", "usuario__email")
