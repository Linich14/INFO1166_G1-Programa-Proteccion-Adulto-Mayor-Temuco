import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.http import JsonResponse
from rest_framework import viewsets
from .serializer import  PrestadorServicioSerializaer, ServicioSerializer, UsuarioSerializer, AtencionSerializer # Importo PrestadorServicioSerializaer
from .models import PrestadorServicio, Servicio, Usuario, Atencion, Asistencia

class PrestadorServicioView(viewsets.ModelViewSet):
    serializer_class = PrestadorServicioSerializaer
    queryset = PrestadorServicio.objects.all()

class ServicioView(viewsets.ModelViewSet):
    serializer_class = ServicioSerializer
    queryset = Servicio.objects.all()

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

class AtencionView(viewsets.ModelViewSet):
    serializer_class = AtencionSerializer
    queryset = Atencion.objects.all()

def obtener_servicios(request):
    servicios = Servicio.objects.all().values('id', 'nombre', 'tipo', 'direccion', 'descripcion', 'disponibilidad')
    return JsonResponse(list(servicios), safe=False)

def obtener_prestadores(request):
    prestadores = PrestadorServicio.objects.all().values('id', 'rut', 'nombre', 'apellido', 'trabajo', 'email', 'nacimiento', 'telefono', 'estado')
    return JsonResponse(list(prestadores), safe=False)

def obtener_servicios_detalle(request):
    servicios = Servicio.objects.all().values('id', 'nombre', 'prestadorID__nombre')
    servicios_list = [
        {
            'id': servicio['id'],
            'nombre_servicio': servicio['nombre'],
            'nombre_prestador': servicio['prestadorID__nombre']
        }
        for servicio in servicios
    ]
    return JsonResponse(servicios_list, safe=False)

def datosServicio(request, servicio_id):
    try:
        # Filtrar las atenciones por el servicio_id proporcionado y hacer un join con los datos de Usuario
        atenciones = Atencion.objects.filter(servicioID=servicio_id).select_related('clienteID')
        
        # Crear una lista de diccionarios con los datos que necesitas
        atenciones_list = []
        for atencion in atenciones:
            atenciones_list.append({
                "id": atencion.id,
                "cliente_id": atencion.clienteID.id,
                "cliente_nombre": atencion.clienteID.nombre,
                "cliente_apellido": atencion.clienteID.apellido,
                "observacion": atencion.observacion,
                "sector": atencion.sector,
                "fecha": atencion.fecha,
                "hora": atencion.hora,
            })
        
        # Log para depuración
        print(f"Atenciones encontradas para el servicio {servicio_id}: {atenciones_list}")
        
        # Devolver las atenciones en formato JSON
        return JsonResponse(atenciones_list, safe=False)
    except Atencion.DoesNotExist:
        return JsonResponse({"error": "No se encontraron atenciones para el servicio proporcionado."}, status=404)


def obtener_nombres_servicios(request):
    servicios = Servicio.objects.values('id', 'nombre')
    return JsonResponse(list(servicios), safe=False)

def obtener_prestador_por_nombre(request, nombre):
    prestador = get_object_or_404(PrestadorServicio, nombre=nombre)
    return JsonResponse({
        'id': prestador.id,
        'rut': prestador.rut,
        'nombre': prestador.nombre,
        'apellido': prestador.apellido,
        'trabajo': prestador.trabajo,
        'email': prestador.email,
        'nacimiento': prestador.nacimiento,
        'telefono': prestador.telefono,
        'estado': prestador.estado,
    })

def obtener_prestador_por_rut(request, rut):
    prestador = get_object_or_404(PrestadorServicio, rut=rut)
    return JsonResponse({
        'id': prestador.id,
        'rut': prestador.rut,
        'nombre': prestador.nombre,
        'apellido': prestador.apellido,
        'trabajo': prestador.trabajo,
        'email': prestador.email,
        'nacimiento': prestador.nacimiento,
        'telefono': prestador.telefono,
        'estado': prestador.estado,
    })

def obtener_prestador_estado(request, nombre):
    prestador = get_object_or_404(PrestadorServicio, nombre=nombre)
    return JsonResponse({
        'nombre': prestador.nombre,
        'estado': prestador.estado
    })

def obtener_servicio_por_prestador(request, prestador_id):
    servicio = get_object_or_404(Servicio, prestadorID=prestador_id)
    return JsonResponse({
        'id': servicio.id,
        'nombre': servicio.nombre,
        'tipo': servicio.tipo,
        'direccion': servicio.direccion,
        'descripcion': servicio.descripcion,
        'disponibilidad': servicio.disponibilidad
    })

def obtener_atenciones_por_servicio(request, servicio_id):
    atenciones = Atencion.objects.filter(servicioID=servicio_id)
    atenciones_list = list(atenciones.values())
    print(f"Atenciones encontradas para el servicio {servicio_id}: {atenciones_list}")  # Log for debugging
    for atencion in atenciones_list:
        print(f"Atencion ID: {atencion['id']}, Cliente ID: {atencion['clienteID']}, Observacion: {atencion['observacion']}")  # Detailed log
    return JsonResponse(atenciones_list, safe=False)



@api_view(['POST'])
def crear_servicio(request):
    if request.method == 'POST':
        serializer = ServicioSerializer(data=request.data)
        if serializer.is_valid():
            servicio = serializer.save()
            prestador = PrestadorServicio.objects.get(id=servicio.prestadorID.id)
            response_data = {
                'id': servicio.id,
                'nombre_servicio': servicio.nombre,
                'nombre_prestador': f"{prestador.nombre} {prestador.apellido}"
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({"detail": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['DELETE'])
def eliminar_servicio(request, pk):
    try:
        servicio = Servicio.objects.get(pk=pk)
        servicio.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Servicio.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
def actualizar_servicio(request, pk):
    try:
        servicio = Servicio.objects.get(pk=pk)
    except Servicio.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ServicioSerializer(servicio, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def subir_foto_perfil(request, rut):
    try:
        prestador = PrestadorServicio.objects.get(rut=rut)
        
        if 'fotoperfil' not in request.FILES:
            return Response({"error": "No se ha proporcionado ninguna imagen."}, status=status.HTTP_400_BAD_REQUEST)

        prestador.fotoperfil = request.FILES['fotoperfil']
        prestador.save()

        if prestador.fotoperfil:
            fotoperfil_url = prestador.fotoperfil.url
            fotoperfil_url_completa = request.build_absolute_uri(fotoperfil_url)
        else:
            fotoperfil_url_completa = None

        return Response({
            "message": "Foto de perfil actualizada con éxito",
            "fotoperfil_url": fotoperfil_url_completa
        }, status=status.HTTP_200_OK)

    except PrestadorServicio.DoesNotExist:
        return Response({"error": "Prestador de servicio no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
def marcar_asistencia(request, rut):
    if request.method == 'POST':
        try:
            # Extraer el estado de la solicitud (True para entrada, False para salida)
            data = json.loads(request.body)
            estado = data.get('estado')

            if estado is None:
                return JsonResponse({"success": False, "message": "Estado no proporcionado"}, status=400)

            # Buscar al prestador por RUT
            prestador = get_object_or_404(PrestadorServicio, rut=rut)
            
            # Actualizar el estado del prestador (True o False)
            prestador.estado = estado
            prestador.save()

            # Crear una nueva entrada en el modelo Asistencia
            asistencia = Asistencia.objects.create(
                prestador=prestador,
                hora_entrada=timezone.now() if estado else None,
                hora_salida=timezone.now() if not estado else None,
                estado=estado,
            )
            asistencia.save()

            # Responder con la información adecuada
            if estado:  # Si es entrada
                return JsonResponse({
                    'success': True,
                    'message': 'Entrada registrada',
                    'estado': prestador.estado,
                    'hora_entrada': asistencia.hora_entrada.strftime('%Y-%m-%d %H:%M:%S')
                })
            else:  # Si es salida
                return JsonResponse({
                    'success': True,
                    'message': 'Salida registrada',
                    'estado': prestador.estado,
                    'hora_salida': asistencia.hora_salida.strftime('%Y-%m-%d %H:%M:%S')
                })
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Error en el formato JSON"}, status=400)
        except PrestadorServicio.DoesNotExist:
            return JsonResponse({"success": False, "message": "Prestador no encontrado"}, status=404)
    else:
        return JsonResponse({"success": False, "message": "Método no permitido"}, status=405)
    
@api_view(['PUT', 'PATCH'])
def actualizar_prestador(request, rut):
    try:
        prestador = PrestadorServicio.objects.get(rut=rut)
        data = request.data
        prestador.nombre = data.get('nombre', prestador.nombre)
        prestador.apellido = data.get('apellido', prestador.apellido)
        prestador.telefono = data.get('telefono', prestador.telefono)
        prestador.email = data.get('email', prestador.email)
        prestador.save()

        return Response({
            "message": "Datos actualizados correctamente",
            "prestador": {
                "nombre": prestador.nombre,
                "apellido": prestador.apellido,
                "telefono": prestador.telefono,
                "email": prestador.email
            }
        }, status=status.HTTP_200_OK)
    except PrestadorServicio.DoesNotExist:
        return Response({"error": "Prestador no encontrado"}, status=status.HTTP_404_NOT_FOUND)