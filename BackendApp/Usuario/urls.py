from django.urls import path
from .views import *

urlpatterns = [
    path('', Usuario_APIView.as_view()),
]
