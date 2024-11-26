from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from rest_framework import serializers
from .models import UserData

# Serializador de Usuario
class UsuarioSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ['id','rut', 'nombre', 'apellido', 'sector',
                  'direccion', 'nacimiento', 'email','autorizado',
                  'telefono', 'nacionalidad', 'password']
        
    def create(self, validated_data):
        user = UserData.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
# Serializador de Token intento para devolver el token con el rut y nombre
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['rut'] = user.rut
        token['nombre'] = user.nombre

        return token




