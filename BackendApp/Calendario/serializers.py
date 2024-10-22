from rest_framework import serializers
from datetime import timedelta
from django.utils import timezone

class CalendarioSerializer(serializers.Serializer):
    nombre = serializers.CharField(max_length=255, required=True)
    descripcion = serializers.CharField(max_length=1000, required=True)
    color = serializers.IntegerField(required=False, default=7)


class InvitacionSerializer(serializers.Serializer):
    idCalendario = serializers.CharField(max_length=255, required=True)
    email = serializers.EmailField(required=True)
    rol = serializers.CharField(max_length=10, required=True)


class EventosSerializer(serializers.Serializer):
    idCalendario = serializers.CharField(max_length=255, required=True)
    nombre = serializers.CharField(max_length=255, required=True)
    descripcion = serializers.CharField(max_length=1000, required=True)
    fechaInicio = serializers.DateTimeField(required=True)
    duracionMinutos = serializers.IntegerField(required=False, default=0)
    invitados = serializers.EmailField()
    localizacion = serializers.CharField(max_length=255, required=True)
    recordatorio = serializers.BooleanField(required=False, default=False)
    
    def validate_fechaInicio(self, value):
        # Por que la hora no me coincide al verlo en el gcalendar
        value = value + timedelta(hours=3)
        if value < timezone.now():
            raise serializers.ValidationError("La fecha de inicio no puede ser menor a la fecha actual")
        return value 