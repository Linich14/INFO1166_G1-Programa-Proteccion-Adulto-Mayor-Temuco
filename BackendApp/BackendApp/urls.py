"""
URL configuration for BackendApp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from BackendApp import settings
from Notificaciones.views import NotificacionesList
from Notificaciones.views import obtener_notificaciones
from Municipales.views import MunicipalesView
from Municipales.views import login_view
from Municipales.views import get_csrf_token
from Documentos.views import subir_documento
from django.conf.urls.static import static
from Municipales.views import UserDataView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/calendario/', include('Calendario.urls')),
    path('api/usuario', include('Usuario.urls')),
    path('api/notificaciones/', NotificacionesList.as_view(), name='notificaciones-list'),
    path('api/notificaciones/', obtener_notificaciones, name='obtener_notificaciones'),
    path('municipales/', MunicipalesView.as_view(), name='Municipal'),
    path('login/', login_view, name='login'),

    path('get-csrf-token/', get_csrf_token, name='get-csrf-token'),
    path('api/servicios/', include('Servicios.urls')),
    path('api/subir_documento/', subir_documento, name='subir_documento'),
    path('user-data/<str:rut>/', UserDataView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)