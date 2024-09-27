from django.db import models

# Create your models here.


class PrestadorServicio(models.Model):
    id = models.AutoField(primary_key=True)
    rut = models.CharField(max_length=10)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    trabajo = models.CharField(max_length=50)
    email = models.EmailField()
    nacimiento = models.DateField()
    telefono = models.IntegerField() 
    
    def __str__(self):
        return self.id_servicio



class Servicio(models.Model):
    id = models.AutoField(primary_key=True)
    prestadorID = models.ForeignKey(PrestadorServicio, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)
    descripcion = models.TextField()
    disponibilidad = models.DateField()   
    
    def __str__(self):
        return self.nombre

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


class Atencion(models.Model):
    id = models.AutoField(primary_key=True)
    servicioID = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    clienteID = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateField()
    sector = models.CharField(max_length=50)
    hora = models.TimeField()
    atencionAsistencia = models.BooleanField()
    atencionTipo = models.CharField(max_length=50)
    observacion = models.TextField()


