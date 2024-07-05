from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Post
class HomeView(TemplateView):
    template_name = 'core/pages/home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["post"] = Post.objects.all() 
        return context
    