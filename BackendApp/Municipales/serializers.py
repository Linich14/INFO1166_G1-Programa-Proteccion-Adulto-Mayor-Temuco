from rest_framework import serializers

from .models import Municipales

class MunicipalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipales
        partial = True
        fields = ['id', 'rut', 'nombre', 'apellido', 'privilegios', 'cargo', 'telefono','contraseña']
        extra_kwargs = {
            'rut': {'required': False},
            'nombre': {'required': False},
            'apellido': {'required': False},
            'privilegios': {'required': False},
            'cargo': {'required': False},
            'telefono': {'required': False},
            'contraseña': {'required': False}
        }

