from rest_framework import serializers
from .models import DocumentoSubido

class DocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentoSubido
        fields = ['nombre', 'archivo']
