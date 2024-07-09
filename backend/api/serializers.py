from rest_framework.serializers import ModelSerializer
from core.models import (
    Curso,
    ImageCurso
)

class CursoSerializer(ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'

class CursoTitleSerializers(ModelSerializer):
    class Meta:
        model = Curso
        fields = ['id', 'title']

         
class ImageCursoSerializers(ModelSerializer):
    class Meta:
        model = ImageCurso
        fields = ['image']