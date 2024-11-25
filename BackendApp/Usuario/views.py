from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError


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
            "id": serializer.data['id'],
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
    

    
# Supuesta customizacion de la vista de login
class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer

class Subir_foto_perfil(APIView):
    # Protegemos la vista con autenticación
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Buscar el usuario autenticado
            user = request.user

            # Validar si la imagen fue proporcionada en el request
            if 'fotoperfil' not in request.FILES:
                return Response({"error": "No se ha proporcionado ninguna imagen."}, status=status.HTTP_400_BAD_REQUEST)

            # Guardar la imagen en el campo fotoperfil del usuario
            user.fotoperfil = request.FILES['fotoperfil']
            user.save()

            # Obtener la URL completa de la foto de perfil
            fotoperfil_url = request.build_absolute_uri(user.fotoperfil.url)

            return Response({
                "message": "Foto de perfil actualizada con éxito",
                "fotoperfil_url": fotoperfil_url
            }, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ActualizarUsuario(APIView):
    # Protegemos la vista con autenticación
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        try:
            user = request.user
            data = request.data

            user.nombre = data.get('nombre', user.nombre)
            user.apellido = data.get('apellido', user.apellido)
            user.telefono = data.get('telefono', getattr(user, 'telefono', None))
            user.email = data.get('email', user.email)

            user.save()

            return Response({
                "message": "Datos actualizados correctamente",
                "usuario": {
                    "nombre": user.nombre,
                    "apellido": user.apellido,
                    "telefono": getattr(user, 'telefono', None),
                    "email": user.email
                }
            }, status=status.HTTP_200_OK)

        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)