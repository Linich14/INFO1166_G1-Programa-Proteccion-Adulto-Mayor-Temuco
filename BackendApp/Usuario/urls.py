from django.urls import path
from .views import *

urlpatterns = [
  #  path('inicio_sesion/', InicioSesion_Usuario.as_view()),
    path('registro/', Registro_Usuario.as_view()),
    path('usuario/', UsuarioDetalles.as_view()),
    path('usuariosLista/', AutentificacionUsuario.as_view())
] 
