from django.db import models

# Create your models here.
class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    rut = models.CharField(max_length=12)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    sector = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)
    email = models.EmailField()
    telefono = models.IntegerField()
    nacionalidad = models.CharField(max_length=50)
    
    def __str__(self):
        return self.id_cliente
