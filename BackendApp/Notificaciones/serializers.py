from rest_framework import serializers
from .models import Notificaciones

class NotificacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificaciones
        fields = ['id', 'titulo', 'cuerpo']


