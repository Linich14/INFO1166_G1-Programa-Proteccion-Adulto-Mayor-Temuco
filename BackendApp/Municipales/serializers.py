from rest_framework import serializers

from .models import Municipales

class MunicipalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipales
        partial = True
        fields = ['id', 'rut', 'nombre', 'apellido', 'privilegios', 'cargo', 'telefono','contraseña']
        extra_kwargs = {
            'rut': {'required': True},
            'nombre': {'required': True},
            'apellido': {'required': True},
            'privilegios': {'required': True},
            'cargo': {'required': True},
            'telefono': {'required': True},
            'contraseña': {'required': False}
        }

