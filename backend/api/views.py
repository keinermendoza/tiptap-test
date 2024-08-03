from django import forms
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods 
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
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = CursoSerializer
    queryset = Curso.objects.all()

# SIMPLE DJANGO VERSION
@require_http_methods(['DELETE'])
def basic_delete_image(request, *args, **kwargs):
    image = get_object_or_404(ImageCurso, pk=kwargs.get('image_id'))
    image.delete()
    return JsonResponse({'message': 'Eliminado con exito'}, status=status.HTTP_200_OK)

class DeleteImage(APIView):
    def delete(self, request, *args, **kwargs):
        image = get_object_or_404(ImageCurso, pk=kwargs.get('image_id'))
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
        print(request.data)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            image = serializer.save(curso=curso)
            return Response({"url": image.image.url, "id":image.id}, status=status.HTTP_200_OK)
        return Response({'serializer': serializer.error_messages}, status=400)

# SIMPLE DJANGO VERSION
class CursoImageForm(forms.ModelForm):
    class Meta:
        model = ImageCurso
        fields = ["image"]

@require_http_methods(['POST'])
def basic_upload_image(request, *args, **kwargs):
    curso = get_object_or_404(Curso, pk=kwargs.get('pk'))
    form = CursoImageForm(request.POST, request.FILES)
    if form.is_valid():
        image = form.save(commit=False)
        image.curso = curso
        image.save()
        return  JsonResponse({"url": image.image.url, "id":image.id}, status=200)
    return JsonResponse({"errors":form.errors.as_json()}, status=400)

class EditorJSUploadImage(GenericAPIView):
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
    
