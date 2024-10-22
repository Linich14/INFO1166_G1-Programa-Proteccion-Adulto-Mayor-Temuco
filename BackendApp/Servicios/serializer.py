from rest_framework import serializers
from .models import PrestadorServicio, Servicio, Usuario, Atencion

# Json!

class PrestadorServicioSerializaer(serializers.ModelSerializer):
    fotoperfil_url = serializers.SerializerMethodField()  # Campo adicional para la URL

    class Meta:
        model = PrestadorServicio
        fields = '__all__'  # Incluye todos los campos del modelo, incluido fotoperfil

    def get_fotoperfil_url(self, obj):
        if obj.fotoperfil:
            return obj.fotoperfil.url  # Devuelve la URL si la imagen existe
        return None  # Si no hay imagen, retorna None
    
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