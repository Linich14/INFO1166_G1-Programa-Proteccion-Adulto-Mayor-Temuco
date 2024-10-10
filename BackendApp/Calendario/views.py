from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from utils.LeerCredenciales import ObtenerAutenticacion




class Eventos_APIView(APIView):
    def get(self, request):
        servicio = ObtenerAutenticacion()

        calendar_list_result = servicio.calendarList().list().execute()
        calendar_list = calendar_list_result.get('items', [])

        for calendar in calendar_list:
            print(f"Nombre: {calendar['summary']}")
            print(f"ID: {calendar['id']}")
            print(f"Descripción: {calendar.get('description', 'Sin descripción')}")
            print(f"Ubicación: {calendar.get('location', 'Sin ubicación')}")
            print(f"Acceso: {calendar['accessRole']}")
            print('-' * 40)


        return Response("Hello, world!")

    def post(self, request):
        serializer = PostSerializers(data=request.data)
        print(serializer)
            
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
