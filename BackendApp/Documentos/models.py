from django.db import models

class DocumentoSubido(models.Model):
    nombre = models.CharField(max_length=100)
    archivo = models.FileField(upload_to='archivos/')

    def __str__(self):
        return self.nombre
