from rest_framework import serializers
from Usuario.models import Usuario

class UsuarioSerializers(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        exclude = ['is_removed', 'created', 'modified']