from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.views.generic import TemplateView, CreateView, FormView, ListView, View
from .models import Post, ImagePost
from django.views.generic.detail import SingleObjectMixin


from django_htmx.http import trigger_client_event

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import (
    GenericAPIView,
    RetrieveDestroyAPIView,
    CreateAPIView,
)
from rest_framework.mixins import (
    CreateModelMixin,
    UpdateModelMixin,
    # DestroyModelMixin,
)


from rest_framework.parsers import FormParser, MultiPartParser
from .serializers import ImagePostSerializers, PostSerializers, PostTitleSerializers

from .forms import PostTitleForm


class HomeView(TemplateView):
    template_name = "core/pages/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["post"] = Post.objects.first()
        return context


class DeletePost(View, SingleObjectMixin):
    queryset = Post.objects.all()

    def delete(self, request, *args, **kwargs):
        try:
            post = self.get_object()
            title = post.title
            post.delete()
        except:
            return trigger_client_event(
                HttpResponse(""),
                "display_toast",
                {
                    "ok": False,
                    "status": 400,
                    "message": "No fue posible enviar el mensaje",
                },
            )
        else:
            return trigger_client_event(
                HttpResponse(""),
                "display_toast",
                {
                    "ok": True,
                    "status": status.HTTP_200_OK,
                    "message": f'la publicaicon "{title}" fue eliminada',
                },
            )


class PostList(ListView):
    template_name = "core/partials/post_list.html"
    queryset = Post.objects.all()
    context_object_name = "posts"


class CreatePostTitle(FormView):
    form_class = PostTitleForm
    template_name = "core/partials/post_title_create.html"
    success_template_name = "core/partials/post_full_create.html"

    def form_valid(self, form) -> HttpResponse:
        # response = self.render_to_response(self.template_name)
        self.object = form.save()
        response = render(
            self.request, self.success_template_name, {"post": self.object}
        )
        return trigger_client_event(
            response,
            "display_toast",
            {"ok": True, "status": 201, "message": "post creado con Exito"},
        )

    def form_invalid(self, form) -> HttpResponse:
        response = super().form_invalid(form)
        return trigger_client_event(
            response,
            "display_toast",
            {"ok": False, "status": 400, "message": "No fue posible enviar el mensaje"},
        )

    # def post(self, request, *args, **kwargs):
    #     """
    #     Sends Async Email
    #     """
    #     form = self.get_form()
    #     if form.is_valid():
    #         form.send_email()
    #         return self.form_valid(form)
    #     else:
    #         if "username" in form.errors:
    #             return self.form_valid(form)
    #         else:
    #             return self.form_invalid(form)


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
            return Response(
                {"message": "Post no existe"}, status=status.HTTP_404_NOT_FOUND
            )

        print(request.data)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        image = serializer.save(post=post)
        return Response(
            {
                "success": 1,
                "file": {
                    "url": image.image.url,
                },
            }
        )

    def get(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response(
                {"message": "Post no existe"}, status=status.HTTP_404_NOT_FOUND
            )

        return Response({"message": "todo bien"})
