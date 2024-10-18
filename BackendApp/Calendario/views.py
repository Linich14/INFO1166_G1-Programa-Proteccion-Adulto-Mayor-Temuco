from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from utils.LeerCredenciales import ObtenerAutenticacion
from .serializers import *




class Eventos_APIView(APIView):
    def get(self, request):
        servicio = ObtenerAutenticacion()

        if (servicio == None):
            return Response("No se pudo obtener la autenticación", status=status.HTTP_400_BAD_REQUEST)


        return Response("Hello, world!")

    def post(self, request):
        serializer = PostSerializers(data=request.data)
        print(serializer)
            
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
class CalendarioView(APIView):
    def get(self, request):
        servicio = ObtenerAutenticacion()

        if (servicio == None):
            return Response("No se pudo obtener la autenticación", status=status.HTTP_400_BAD_REQUEST)

        # Consultamos todos los calendarios creados en la cuenta de servicio
        listaCalendarResultado = servicio.calendarList().list().execute()
        listaCalendarios = listaCalendarResultado.get('items', [])
        
        # Filtramos la información que nos interesa transformamos a json
        calendarios_filtrados = [
            {
                'id': calendario.get('id'),
                'nombre': calendario.get('summary'),
                'descripcion': calendario.get('description', '')  # Se pone '' si no tiene descripción
            }
            for calendario in listaCalendarios
        ]
        
        return Response(calendarios_filtrados, status=status.HTTP_200_OK)
    
    def post(self, request):
        
        # Creamos un Serializador con los datos
        serializer = CalendarioSerializer(data=request.data)
        
        # Verificamos si los datos son válidos
        if (serializer.is_valid()):
            servicio = ObtenerAutenticacion()
            
            if (servicio == None):
                return Response("No se pudo obtener la autenticación", status=status.HTTP_400_BAD_REQUEST)
            
            calendario = {
                'summary': serializer.validated_data['nombre'],
                'description': serializer.validated_data['descripcion'],
                'timeZone': 'America/Santiago',  
                'colorId': serializer.validated_data['color'] 
            }
            
            calendarioCreado = servicio.calendars().insert(body=calendario).execute()
            
            if "id" in calendarioCreado:
                return Response("Calendario creado", status=status.HTTP_201_CREATED)
                        
            return Response("No se pudo crear el calendario", status=status.HTTP_400_BAD_REQUEST)
        
        return Response("Datos no validos")



class InvitarCalendario_APIView(APIView):
    def post(self, request):
        serializer = InvitacionSerializer(data=request.data)
        
        if (not serializer.is_valid()):
            print("Datos no validos")
            return Response("Invitacion no valida", status=status.HTTP_400_BAD_REQUEST)
        
        servicio = ObtenerAutenticacion()
        if (servicio == None):
            return Response("No se pudo obtener la autenticación", status=status.HTTP_400_BAD_REQUEST)
                
                
        cuerpoInvitacion = {
            'role': serializer.validated_data['rol'],  
            'scope': {
                'type': 'user',
                'value': serializer.validated_data['email']
            }
        }
        
        try:
            respuesta = servicio.acl().insert(calendarId=serializer.validated_data['idCalendario'], body=cuerpoInvitacion).execute()

            if "id" in respuesta:    
                return Response("Invitacion al calendario creada", status=status.HTTP_200_OK) 
            else:
                return Response("No se pudo crear la invitacion", status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response("No se pudo crear la invitacion", status=status.HTTP_400_BAD_REQUEST)
            
            
        

