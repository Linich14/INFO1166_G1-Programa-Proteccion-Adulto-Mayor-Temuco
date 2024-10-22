from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import DocumentoSubido
from .serializers import DocumentoSerializer

@api_view(['POST'])
def subir_documento(request):
    if request.method == 'POST':
        serializer = DocumentoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Archivo subido con éxito"}, status=201)
        return Response(serializer.errors, status=400)
