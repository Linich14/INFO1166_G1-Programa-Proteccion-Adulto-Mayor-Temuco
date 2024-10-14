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

def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})
class MunicipalesView(APIView):
    def post(self, request):
        serializer = MunicipalesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_protect   
def login_view(request):
    get_token(request)
    if request.method == 'POST':
        rut = request.POST['rut']
        contraseña = request.POST['contraseña']
        municipales = Municipales.authenticate(rut, contraseña)
        if municipales:
            municipales.login(request)
            return redirect('inicio')
        else:
            return render(request, 'login.html', {'error': 'Usuario o contraseña incorrectos'})
    return render(request, 'login.html')