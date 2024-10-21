from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import MunicipalesSerializer
from django.shortcuts import render, redirect
from .models import Municipales
from django.views.decorators.csrf import csrf_protect
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
import logging

def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})
class MunicipalesView(APIView):
    def post(self, request):
        serializer = MunicipalesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#@csrf_protect  
@csrf_exempt
def login_view(request):
    
    if request.method == 'POST':
        rut = request.POST.get('rut')
        contraseña = request.POST.get('contraseña')
        municipales = Municipales.authenticate(rut, contraseña)
        if municipales:
            municipales.login(request)
            return JsonResponse({'status': 'Login correcto', 'redirect': '/'})
        else:
            return JsonResponse({'status': 'Login incorrecto', 'redirect': '/login2'})
    return JsonResponse({'status': 'Login incorrecto', 'redirect': '/login'})

class UserDataView(APIView):
    def get(self, request, rut):
        user = Municipales.objects.get(rut=rut)
        data = {
            'id':user.id,
            'nombre': user.nombre,
            'rut': user.rut,
            'apellido': user.apellido,
            'privilegios': user.privilegios,
            'cargo': user.cargo,
            'telefono': user.telefono,
        }
        return Response(data)
    
logger = logging.getLogger(__name__)
class UsuarioUpdateView(APIView):
    
    def put(self, request, pk):
        print(request.data)
        try:
            usuario = Municipales.objects.get(id=pk)
        except Municipales.DoesNotExist:
            logger.error('No se encontró el objeto Municipales con el ID proporcionado: %s', pk)
            return Response({'error': 'No se encontró el objeto Municipales con el ID proporcionado', 'id': pk}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = MunicipalesSerializer(usuario, data=request.data)
        
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                logger.error('Error al actualizar el objeto Municipales: %s', e)
                return Response({'error': 'Error al actualizar el objeto Municipales', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'error': 'El objeto JSON no es válido', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)