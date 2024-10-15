from django.urls import path, include
from rest_framework import routers #Lee vista y genera URLs
from Servicios import views

router = routers.DefaultRouter()
router.register(r'prestadores', views.PrestadorServicioView, 'prestadores')
router.register(r'servicios', views.ServicioView, 'servicios')
router.register(r'usuarios', views.UsuarioView, 'usuarios')
router.register(r'atenciones', views.AtencionView, 'atenciones')

urlpatterns = [
    path("api/", include(router.urls)),
    path('api/prestador/<str:nombre>/', views.obtener_prestador_por_nombre, name='obtener_prestador_por_nombre'),
    path('api/servicio/<int:prestador_id>/', views.obtener_servicio_por_prestador, name='obtener_servicio_por_prestador'),
    path('api/atenciones/<int:servicio_id>/', views.obtener_atenciones_por_servicio, name='obtener_atenciones_por_servicio'),
]
