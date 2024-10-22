from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate

class Municipales(models.Model):
    id = models.CharField(max_length=128, primary_key=True)
    rut = models.CharField(max_length=12)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    privilegios = models.IntegerField()
    cargo = models.CharField(max_length=50)
    telefono = models.PositiveIntegerField()
    contraseña = models.CharField(max_length=128)

    def set_contraseña(self, raw_password):
        self.contraseña = make_password(raw_password)

    def check_contraseña(self, raw_password):
        return check_password(raw_password, self.contraseña)

    def save(self, *args, **kwargs):
        if not self.contraseña:
            self.set_contraseña(self.contraseña)
        super().save(*args, **kwargs)

    @classmethod
    def authenticate(cls, rut, contraseña):
        try:
            municipales = cls.objects.get(rut=rut)
            if municipales.check_contraseña(contraseña):
                return municipales
            else:
                return None
        except cls.DoesNotExist:
            return None

    def login(self, request):
        authenticate(request, rut=self.rut, contraseña=self.contraseña)
        return request.user