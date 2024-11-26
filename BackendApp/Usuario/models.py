from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Manager de Usuario
class UsuarioManager(BaseUserManager):
    use_in_migration = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is Required')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff = True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser = True')

        return self.create_user(email, password, **extra_fields)

# Modelo de Usuario
class UserData(AbstractUser):
    # Clases de opciones para el modelo
    class SectorChoices(models.TextChoices):
        CENTRO = 'CE', 'Centro'
        AMANECER = 'AM', 'Amanecer'
        EL_CARMEN = 'EC', 'El Carmen'
        LABRANZA = 'LA', 'Labranza'
        PEDRO_DE_VALDIVIA = 'PV', 'Pedro de Valdivia'
        PONIENTE = 'PO', 'Poniente'
        PUEBLO_NUEVO = 'PN', 'Pueblo Nuevo'
        SANTA_ROSA = 'SR', 'Santa Rosa'

    class NacionalidadChoices(models.TextChoices):
        CHILENO = 'CL', 'Chileno'
        EXTRANJERO = 'EX', 'Extranjero'
        
    username = None
    rut = models.IntegerField(
        validators=[
            MaxValueValidator(999999999)  
        ], unique=True
    )
    email = models.EmailField(max_length=100, unique=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    sector = sector = models.CharField(
        max_length=2,
        choices=SectorChoices.choices,
        default=SectorChoices.CENTRO,
    )
    direccion = models.CharField(max_length=50)
    nacimiento = models.DateField()
    telefono = models.IntegerField(
          validators=[
            MinValueValidator(10000000),  
            MaxValueValidator(99999999),  
        ])
    nacionalidad = models.CharField(
        max_length=2,
        choices=NacionalidadChoices.choices,
        default=NacionalidadChoices.CHILENO,
    )
    autorizado = models.BooleanField(default=False)
    
    # Valores por defecto necesarios por el usuario
    date_joined = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    objects = UsuarioManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['rut', 'nombre', 'apellido',
                       'sector', 'direccion', 'nacimiento',
                       'telefono', 'nacionalidad', 'autorizado', 'password']
        
    def __str__(self):
        return self.rut
