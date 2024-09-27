from django.db import models

# Create your models here.


class Municipales(models.Model):
    id = models.AutoField(primary_key=True)
    rut = models.CharField(max_length=12)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    privilegios = models.IntegerField()
    cargo = models.CharField(max_length=50)
    telefono = models.PositiveIntegerField()


    