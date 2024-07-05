
from django.db import models
from django_editorjs_fields import EditorJsJSONField  # Django >= 3.1
from django_editorjs_fields import EditorJsTextField


class Post(models.Model):
    body_default = models.TextField()
    body_editorjs = EditorJsJSONField()  # Django >= 3.1
    body_editorjs_text = EditorJsTextField()
