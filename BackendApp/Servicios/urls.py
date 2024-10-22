from django.urls import path, include
from rest_framework import routers #Lee vista y genera URLs
from Servicios import views
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'prestadores', views.PrestadorServicioView, 'prestadores')
router.register(r'servicios', views.ServicioView, 'servicios')
router.register(r'usuarios', views.UsuarioView, 'usuarios')
router.register(r'atenciones', views.AtencionView, 'atenciones')

urlpatterns = [
    path('Listarservicios/', views.obtener_servicios, name='obtener_servicios'),
    path('ListarPrestadores/', views.obtener_prestadores, name='obtener_prestadores'),
    path('servicios_detalle/',views. obtener_servicios_detalle, name='obtener_servicios_detalle'),
    path('crear_servicio/', views.crear_servicio, name='crear_servicio'),
    path('Listarservicios/<int:pk>/', views.eliminar_servicio, name='eliminar_servicio'),
    path('Listarservicios/actualizar/<int:pk>',  views.actualizar_servicio, name='actualizar_servicio'),
    path('atenciones/<str:servicio_id>/',  views.datosServicio, name='atenciones'),

    path('prestador/nombre/<str:nombre>/', views.obtener_prestador_por_nombre, name='obtener_prestador_por_nombre'),
    path('prestador/rut/<str:rut>/', views.obtener_prestador_por_rut, name='obtener_prestador_por_rut'),
    path('prestador/estado/<str:nombre>/', views.obtener_prestador_estado, name='obtener_prestador_estado'),
    path('marcar-asistencia/<str:rut>/', views.marcar_asistencia, name='marcar_asistencia'),
    path('cambiar-datos/<str:rut>/', views.actualizar_prestador, name='actualizar_prestador'),
    path('servicio/<int:prestador_id>/', views.obtener_servicio_por_prestador, name='obtener_servicio_por_prestador'),
    path('atenciones/<int:servicio_id>/', views.obtener_atenciones_por_servicio, name='obtener_atenciones_por_servicio'),
    path('prestador/rut/<str:rut>/subir_foto_perfil/', views.subir_foto_perfil, name='subir_foto_perfil'),
    path('nombres/', views.obtener_nombres_servicios, name='obtener_nombres_servicios'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
