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
    path('prestador/nombre/<str:nombre>/', views.obtener_prestador_por_nombre, name='obtener_prestador_por_nombre'),
    path('prestador/rut/<str:rut>/', views.obtener_prestador_por_rut, name='obtener_prestador_por_rut'),
    path('prestador/estado/<str:nombre>/', views.obtener_prestador_estado, name='obtener_prestador_estado'),
    path('marcar-asistencia/<str:rut>/', views.marcar_asistencia, name='marcar_asistencia'),
    path('cambiar-datos/<str:rut>/', views.actualizar_prestador, name='actualizar_prestador'),
    path('servicio/<int:prestador_id>/', views.obtener_servicio_por_prestador, name='obtener_servicio_por_prestador'),
    path('atenciones/<int:servicio_id>/', views.obtener_atenciones_por_servicio, name='obtener_atenciones_por_servicio'),
    path('prestador/rut/<str:rut>/subir_foto_perfil/', views.subir_foto_perfil, name='subir_foto_perfil'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
