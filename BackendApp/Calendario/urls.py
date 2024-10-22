from django.urls import path
from .views import *

urlpatterns = [
    path('', CalendarioView.as_view()),
    #path('<str:id>/', CalendarioView.as_view()),
    path('invitar/', InvitarCalendario_APIView.as_view()),
    path('evento/', Eventos_APIView.as_view()), 
    #path('v1/post/<int:pk>/', Post_APIView_Detail.as_view()),
]