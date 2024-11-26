from django.urls import path
from .views import *
from rest_framework import routers #Lee vista y genera URLs
from Usuario import views
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'usuarios', views.UserData, 'usuarios')

urlpatterns = [
  # path('inicio_sesion/', InicioSesion_Usuario.as_view()),
    path('registro/', Registro_Usuario.as_view()),
    path('usuario/', UsuarioDetalles.as_view()),
    path('usuariosLista/', AutentificacionUsuario.as_view())
] 
    path('actualizar_usuario/', ActualizarUsuario.as_view(), name='Actualizar_Usuario'),
    path('subir_foto_perfil/', Subir_foto_perfil.as_view(), name='subir_foto_perfil'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)