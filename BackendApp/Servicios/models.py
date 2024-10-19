from django.db import models
from Usuario.models import Usuario
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
    estado = models.BooleanField(default=True)  #TRUE = ESTADO DEL USUARIO TRABAJANDO, FALSE = ESTADO DEL USUARIO SIN TRABAJAR
    fotoperfil = models.FileField(upload_to='archivos/', null=True)
    
    def __str__(self):
        return self.rut



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

class Asistencia(models.Model):
    prestador = models.ForeignKey(PrestadorServicio, on_delete=models.CASCADE)
    hora_entrada = models.DateTimeField(null=True, blank=True)
    hora_salida = models.DateTimeField(null=True, blank=True)
    estado = models.BooleanField()  # True = Entrada, False = Salida
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Asistencia de {self.prestador.nombre} - {self.creado_en}"
