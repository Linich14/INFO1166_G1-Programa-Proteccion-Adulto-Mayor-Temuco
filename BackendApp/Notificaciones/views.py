from django.shortcuts import render
from rest_framework import generics
from .models import Notificaciones
from .serializers import NotificacionesSerializer
from django.http import JsonResponse

class NotificacionesList(generics.ListAPIView):
    queryset = Notificaciones.objects.all()
    serializer_class = NotificacionesSerializer


def obtener_notificaciones(request):
    try:
        # Obtiene la notificación más reciente
        notificacion = Notificaciones.objects.latest('id')
        data = {
            "titulo": notificacion.titulo,
            "cuerpo": notificacion.cuerpo
        }
    except Notificaciones.DoesNotExist:
        data = {
            "titulo": "No hay notificaciones",
            "cuerpo": ""
        }
    return JsonResponse(data)
