from rest_framework import serializers
from .models import (
    ImagePost,
    Post,
)

class PostTitleSerializers(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title']

class PostSerializers(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'body_editorjs_text']
         
class ImagePostSerializers(serializers.ModelSerializer):
    class Meta:
        model = ImagePost
        fields = ['image']

    # def save(self, **kwargs):
    #     return super().save(**kwargs)