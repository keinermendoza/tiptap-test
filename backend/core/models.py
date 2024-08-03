from django.db import models
from django.urls import reverse_lazy
from django_editorjs_fields import EditorJsJSONField  # Django >= 3.1
from django_editorjs_fields import EditorJsTextField
# from django_editorjs import EditorJsField

class Post(models.Model):
    # body_default = models.TextField()
    # body_editorjs = EditorJsJSONField()  # Django >= 3.1
    title = models.CharField(max_length=250)
    body_editorjs_text = EditorJsTextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=False)
    
    @classmethod
    def get_image_model(cls):
        return ImagePost

    def __str__(self):
        return self.title

class ImagePost(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="images",
    )
    image = models.ImageField(upload_to="posts_images")


    def delete(self, *args, **kwargs):
        if self.image:
            self.image.delete(save=False)
        super().delete(*args, **kwargs)



class Curso(models.Model):
    name = models.CharField(max_length=250)
    image = models.ImageField(upload_to="primaries_curso_images", blank=True, null=True)
    # description = models.JSONField(blank=True, null=True)
    # body = models.TextField(blank=True)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=False)
    
    @classmethod
    def get_image_model(cls):
        return ImageCurso

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse_lazy("update_curso", args=[self.pk])
    

class ImageCurso(models.Model):
    curso = models.ForeignKey(
        Curso,
        on_delete=models.CASCADE,
        related_name="images_curso",
    )
    image = models.ImageField(upload_to="cursos_images")


    def delete(self, *args, **kwargs):
        if self.image:
            self.image.delete(save=False)
        super().delete(*args, **kwargs)