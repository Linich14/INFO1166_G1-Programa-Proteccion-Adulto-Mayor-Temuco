from django.contrib import admin
from .models import PrestadorServicio, Servicio, Usuario, Atencion

# Register your models here.
admin.site.register(PrestadorServicio)
admin.site.register(Servicio)
admin.site.register(Usuario)
admin.site.register(Atencion)