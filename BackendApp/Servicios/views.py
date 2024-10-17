from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework import viewsets
from .serializer import  PrestadorServicioSerializaer, ServicioSerializer, UsuarioSerializer, AtencionSerializer # Importo PrestadorServicioSerializaer
from .models import PrestadorServicio, Servicio, Usuario, Atencion

class PrestadorServicioView(viewsets.ModelViewSet):
    serializer_class = PrestadorServicioSerializaer
    queryset = PrestadorServicio.objects.all()

class ServicioView(viewsets.ModelViewSet):
    serializer_class = ServicioSerializer
    queryset = Servicio.objects.all()

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

class AtencionView(viewsets.ModelViewSet):
    serializer_class = AtencionSerializer
    queryset = Atencion.objects.all()

def obtener_prestador_por_nombre(request, nombre):
    prestador = get_object_or_404(PrestadorServicio, nombre=nombre)
    return JsonResponse({
        'id': prestador.id,
        'nombre': prestador.nombre,
        'apellido': prestador.apellido,
        'trabajo': prestador.trabajo,
        'email': prestador.email,
        'nacimiento': prestador.nacimiento,
        'telefono': prestador.telefono
    })

def obtener_servicio_por_prestador(request, prestador_id):
    servicio = get_object_or_404(Servicio, prestadorID=prestador_id)
    return JsonResponse({
        'id': servicio.id,
        'nombre': servicio.nombre,
        'tipo': servicio.tipo,
        'direccion': servicio.direccion,
        'descripcion': servicio.descripcion,
        'disponibilidad': servicio.disponibilidad
    })

def obtener_atenciones_por_servicio(request, servicio_id):
    atenciones = Atencion.objects.filter(servicioID=servicio_id)
    atenciones_list = list(atenciones.values())
    print(f"Atenciones encontradas para el servicio {servicio_id}: {atenciones_list}")  # Log for debugging
    for atencion in atenciones_list:
        print(f"Atencion ID: {atencion['id']}, Cliente ID: {atencion['clienteID']}, Observacion: {atencion['observacion']}")  # Detailed log
    return JsonResponse(atenciones_list, safe=False)