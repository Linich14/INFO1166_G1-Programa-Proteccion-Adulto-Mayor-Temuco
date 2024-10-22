from django.db import models

# Create your models here.


class Notificaciones(models.Model):
    id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=20, null=True)
    cuerpo = models.CharField(max_length=50, null=True)

