from django.db import models

# Create your models here.
class Calendario:
    def __init__(self, id, titulo, descripcion):
        self.titulo = titulo
        self.descripcion = descripcion3