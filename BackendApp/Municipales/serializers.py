from rest_framework import serializers

from .models import Municipales

class MunicipalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipales
        fields = ['id', 'rut', 'nombre', 'apellido', 'privilegios', 'cargo', 'telefono']