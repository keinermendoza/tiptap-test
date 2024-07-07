from django import forms 
from .models import Post

class PostTitleForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title']