from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Post, ImagePost

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, RetrieveDestroyAPIView, CreateAPIView 
from rest_framework.mixins import (
    CreateModelMixin,
    UpdateModelMixin
    # DestroyModelMixin,
) 


from rest_framework.parsers import (
    FormParser,
    MultiPartParser
)
from .serializers import (
    ImagePostSerializers,
    PostSerializers,
    PostTitleSerializers
)

class HomeView(TemplateView):
    template_name = 'core/pages/home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["post"] = Post.objects.first() 
        return context

class CreatePost(CreateAPIView, UpdateModelMixin):
    queryset = Post.objects.all()
    serializer_class = PostSerializers

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class UploadImage(GenericAPIView):
    serializer_class = ImagePostSerializers
    queryset = ImagePost.objects.all()
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({'message': 'Post no existe'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(post=post)
        return Response({'message': 'todo bien'})
        
    
    def get(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({'message': 'Post no existe'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'message': 'todo bien'})