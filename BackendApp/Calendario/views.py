from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from utils.LeerCredenciales import ObtenerAutenticacion
from .serializers import *
from datetime import datetime, timedelta




class Eventos_APIView(APIView):
    def get(self, request):
        servicio = ObtenerAutenticacion()
        
        idCalendario = request.query_params.get('idCalendario', None)

        if (servicio == None):
            return Response("No se pudo obtener la autenticación", status=status.HTTP_400_BAD_REQUEST)
        
        valorCalendario = idCalendario if idCalendario != None else 'primary'
        # Fecha Actual
        fechaActual = datetime.utcnow().isoformat() + 'Z'
        print(fechaActual)
        
        try:
            listaEventos = servicio.events().list(calendarId=valorCalendario,
                                                  timeMin=fechaActual,singleEvents=True,
                                                  orderBy='startTime').execute()
            eventos = listaEventos.get('items', [])
            
            eventosFiltrados = [
                {
                    'id': evento.get('id'),
                    'nombre': evento.get('summary'),
                    'descripcion': evento.get('description', ''),
                    'localizacion': evento.get('location', ''),
                    'fecha': datetime.fromisoformat(evento.get('start').get('dateTime')).date(),  
                    'horaInicio': datetime.fromisoformat(evento.get('start').get('dateTime')).strftime("%H:%M"), 
                    'horaFin': datetime.fromisoformat(evento.get('end').get('dateTime')).strftime("%H:%M"),
                }
                for evento in eventos
            ]
            return Response(eventosFiltrados, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response("No se pudo obtener los eventos", status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = EventosSerializer(data=request.data)
        
        servicio = ObtenerAutenticacion()
        
        if (servicio == None):
            return Response({"mensaje":"No se pudo obtener la autenticación", "tipo":"error"}, status=status.HTTP_400_BAD_REQUEST)
        
        if (not serializer.is_valid()):
            return Response({"mensaje":"Evento no valido", "tipo":"error"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:     
            evento = {
                'summary': serializer.validated_data['nombre'],
                'location': serializer.validated_data['localizacion'],  
                'description': serializer.validated_data['descripcion'],
                'start': {
                    'dateTime': serializer.validated_data['fechaInicio'].isoformat(),
                    'timeZone': 'America/Santiago',
                },
                'end': {
                    'dateTime': (serializer.validated_data['fechaInicio'] 
                                + timedelta(minutes=serializer.validated_data['duracionMinutos'])).isoformat(),
                    'timeZone': 'America/Santiago',
                },
                #'attendees': [
                #    {'email': serializer.validated_data['invitados']},
                #],
                'reminders': {
                    'useDefault': not serializer.validated_data['recordatorio'],
                    'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 30},
                    ],
                },
            }
        
            respuesta = servicio.events().insert(calendarId=serializer.validated_data['idCalendario'], body=evento).execute()
            print(respuesta)
            return Response({"mensaje":"Evento creado", "tipo":"success"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            print(e)
            return Response({"mensaje":"No se pudo crear el evento", "tipo":"error"}, status=status.HTTP_400_BAD_REQUEST)
        
        

# Create your views here.
class CalendarioView(APIView):
    def get(self, request, id=None):
        servicio = ObtenerAutenticacion()

        if (servicio == None):
            return Response({"mensaje":"No se pudo obtener la autenticación", "tipo":"error"}, status=status.HTTP_400_BAD_REQUEST)

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
        if (not serializer.is_valid()):
            return Response({"mensaje":"Invitacion no valida", "tipo":"error"}, status=status.HTTP_400_BAD_REQUEST)
        
        servicio = ObtenerAutenticacion()
        
        if (servicio == None):
            return Response({"mensaje":"No se pudo obtener la autenticación", "tipo":"error"}, status=status.HTTP_400_BAD_REQUEST)
        
        calendario = {
            'summary': serializer.validated_data['nombre'],
            'description': serializer.validated_data['descripcion'],
            'timeZone': 'America/Santiago',  
            'colorId': serializer.validated_data['color'] 
        }
        try:
            calendarioCreado = servicio.calendars().insert(body=calendario).execute()
            
            if "id" in calendarioCreado:
                return Response({"mensaje":"Calendario creado", "tipo":"success"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"mensaje":"No se pudo crear el calendario", "tipo":"success"}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        id = request.query_params.get('id', None)
        servicio = ObtenerAutenticacion()
        
        if servicio is None:
            return Response({"mensaje": "No se pudo obtener la autenticación", "tipo": "error"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Eliminamos el calendario utilizando su ID
            servicio.calendars().delete(calendarId=id).execute()
            return Response({"mensaje": "Calendario eliminado", "tipo": "success"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"mensaje": "No se pudo eliminar el calendario", "tipo": "error"}, status=status.HTTP_400_BAD_REQUEST)
        



class InvitarCalendario_APIView(APIView):
    def post(self, request):
        serializer = InvitacionSerializer(data=request.data)
        
        if (not serializer.is_valid()):
            print("Datos no validos")
            return Response({"mensaje":"Invitacion no valida", "tipo":"error"}, status=status.HTTP_400_BAD_REQUEST)
        
        servicio = ObtenerAutenticacion()
        if (servicio == None):
            return Response({"mensaje":"No se pudo obtener la autenticación", "tipo":"error"}, status=status.HTTP_400_BAD_REQUEST)
                
                
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
                return Response({"mensaje":"Invitacion al calendario creada", "tipo":"success"}, status=status.HTTP_200_OK) 
            else:
                return Response({"mensaje":"No se pudo crear la invitacion","tipo":"success"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"mensaje":"No se pudo crear la invitacion","tipo":"success"}, status=status.HTTP_400_BAD_REQUEST)
            
            
        

