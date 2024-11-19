from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from django.http import Http404

from rest_framework.permissions import IsAuthenticated
from Usuario.models import UserData
from Usuario.serializers import UsuarioSerializers, CustomTokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView

# Clase que corresponde al Login
"""
class InicioSesion_Usuario(APIView):
    def get(self, request):
        usuario = Usuario.objects.all()
        return Response(serializer.data)
    
    def post(self, request):
        print(request.data)            
        return Response(request.data, status=status.HTTP_201_CREATED)
"""

# Clase del register de usuario 
class Registro_Usuario(APIView):    
    def post(self, request):
        serializer = UsuarioSerializers(data=request.data) 
        
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            print("Buenos")
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        except Exception as e:
            print(e)
            print("Malos")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Esta clase se encarga de mostrar los datos del usuario
class UsuarioDetalles(APIView):
    # Protegimos la vista con autenticación
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Accede a la información del usuario autenticado
        user = request.user
        serializer = UsuarioSerializers(user)
        # Filtramos los datos que queremos mostrar
        usuario = {
            "rut": serializer.data['rut'],
            "nombre": serializer.data['nombre'],
            "apellido": serializer.data['apellido'],
            "email": serializer.data['email'],
            "telefono": serializer.data['telefono'],
            "direccion": serializer.data['direccion'],
            "nacimiento": serializer.data['nacimiento'],
        }
        
        return Response(usuario, status=status.HTTP_201_CREATED)
    
    # Implementacion de actualizacion de datos
    def update(self, request, pk):
        
        user = self.get_object(pk)
        serializer = UsuarioSerializers(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Devuelve todos los usuarios (usado en historialCompleto.jsx)
@api_view(['GET'])
def ObtenerUsuarios (request):
    usuarios = UserData.objects.all() 
    serializer = UsuarioSerializers(usuarios, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Supuesta customizacion de la vista de login
class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer

