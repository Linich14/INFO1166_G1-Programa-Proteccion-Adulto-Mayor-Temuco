from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.http import Http404
from Usuario.models import Usuario

from Usuario.serializers import UsuarioSerializers

# Create your views here.
class Usuario_APIView(APIView):
    def get(self, request):
        usuario = Usuario.objects.all()
        serializer = UsuarioSerializers(usuario, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UsuarioSerializers(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






