from rest_framework import serializers
from .models import PrestadorServicio, Servicio, Usuario, Atencion

# Json!
class PrestadorServicioSerializaer(serializers.ModelSerializer):
    class Meta:
        model = PrestadorServicio
        fields = '__all__'

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class AtencionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atencion
        fields = '__all__'