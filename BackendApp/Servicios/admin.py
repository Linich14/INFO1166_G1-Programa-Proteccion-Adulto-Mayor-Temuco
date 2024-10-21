from django.contrib import admin
from .models import PrestadorServicio, Servicio, Usuario, Atencion, Asistencia

# Register your models here.
admin.site.register(PrestadorServicio)
admin.site.register(Servicio)
admin.site.register(Usuario)
admin.site.register(Atencion)

# Registrar el modelo de Asistencia
class AsistenciaAdmin(admin.ModelAdmin):
    list_display = ('prestador', 'hora_entrada', 'hora_salida', 'estado', 'creado_en')
    list_filter = ('prestador', 'estado')
    search_fields = ('prestador__nombre',)

admin.site.register(Asistencia, AsistenciaAdmin)