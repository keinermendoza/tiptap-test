from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser 
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import (
    ListCreateAPIView,
    GenericAPIView,
    RetrieveUpdateDestroyAPIView
)
from core.models import (
    Curso,
    ImageCurso
)

from .serializers import (
    CursoSerializer,
    ImageCursoSerializers
)

class CursosList(ListCreateAPIView):
    serializer_class = CursoSerializer
    queryset = Curso.objects.all()

class CursoRetriveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = CursoSerializer
    queryset = Curso.objects.all()

class DeleteImage(APIView):
    def delete(self, request, *args, **kwargs):
        image = get_object_or_404(ImageCurso, pk=kwargs.get('pk'))
        image.delete()
        return Response({'message': 'Eliminado con exito'}, status=status.HTTP_200_OK)


class UploadImage(GenericAPIView):
    serializer_class = ImageCursoSerializers
    queryset = ImageCurso.objects.all()
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, pk):
        try:
            curso = Curso.objects.get(pk=pk)
        except Curso.DoesNotExist:
            return Response(
                {"message": "Curso no existe"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        image = serializer.save(curso=curso)
        return Response(
            {
                "success": 1,
                "file": {
                    "url": image.image.url,
                    "id": image.id
                },
            }
        )
    
