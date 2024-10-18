from rest_framework import serializers

class CalendarioSerializer(serializers.Serializer):
    nombre = serializers.CharField(max_length=255, required=True)
    descripcion = serializers.CharField(max_length=1000, required=True)
    color = serializers.IntegerField(required=False, default=7)


class InvitacionSerializer(serializers.Serializer):
    idCalendario = serializers.CharField(max_length=255, required=True)
    email = serializers.EmailField(required=True)
    rol = serializers.CharField(max_length=10, required=True)
