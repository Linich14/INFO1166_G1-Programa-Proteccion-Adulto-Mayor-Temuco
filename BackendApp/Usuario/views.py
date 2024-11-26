from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.http import Http404

from rest_framework.permissions import IsAuthenticated, IsAdminUser
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
            "id" : serializer.data['id'],
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
    
    
class AutentificacionUsuario(APIView):
    #permission_classes = [IsAdminUser]
    def get(self, request):
        # Accede a la información del usuario autenticado
        usuariosNoAutorizados = UserData.objects.filter(autorizado=0)
        
        serializer = UsuarioSerializers(usuariosNoAutorizados, many=True)

        usuarios_filtrados = [
            {
                "rut": usuario['rut'],
                "nombre": usuario['nombre'],
                "apellido": usuario['apellido'],
                "email": usuario['email'],
                "telefono": usuario['telefono'],
                "direccion": usuario['direccion'],
                "nacimiento": usuario['nacimiento'],
                "sector": UserData.objects.get(pk=usuario['id']).get_sector_display(),  
            }
            for usuario in serializer.data
        ]
        
        return Response(usuarios_filtrados, status=status.HTTP_201_CREATED)
    
    def patch(self, request):
        rut = request.data.get('rut')  
        
        if not rut:
            return Response({"error": "El campo 'rut' es requerido."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = UserData.objects.get(rut=rut)
        except Usuario.DoesNotExist:
            return Response({"error": "3Usuario no encontrado con el RUT proporcionado."}, status=status.HTTP_404_NOT_FOUND)
        
        if 'autorizado' not in request.data:
            return Response({"error": "El campo 'autorizado' es requerido."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UsuarioSerializers(user, data={"autorizado": request.data['autorizado']}, partial=True)
        
        if serializer.is_valid():
            serializer.save()  
            return Response({"autorizado": serializer.validated_data['autorizado']}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request):
        rut = request.data.get('rut')  
        
        if not rut:
            return Response({"error": "El campo 'rut' es requerido."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = UserData.objects.get(rut=rut)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado con el RUT proporcionado."}, status=status.HTTP_404_NOT_FOUND)
        
        user.delete()
        return Response({"message": "Usuario eliminado exitosamente."}, status=status.HTTP_204_NO_CONTENT)
    

# Supuesta customizacion de la vista de login
class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer

