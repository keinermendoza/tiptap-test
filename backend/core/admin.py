from django import forms
from django.shortcuts import get_object_or_404
from django.urls import path, reverse_lazy
from django.contrib import admin
from .models import Post, ImagePost, Curso, ImageCurso
from unfold.admin import ModelAdmin, TabularInline
from unfold.contrib.forms.widgets import ArrayWidget, WysiwygWidget
from django.template.response import TemplateResponse
from django.http import JsonResponse

admin.site.register(Post)
admin.site.register(ImagePost)
@admin.register(ImageCurso)
class ImageCursoAdmin(ModelAdmin):
    list_display = ['id', '__str__']

class MinimalCreateForm(forms.ModelForm):
    class Meta:
        fields = ['name']

        

class TrixUploadAdmin(ModelAdmin):
    """
    FOR USE MUST TO SET THE FOLLOWING ATRIBUTES IN THE EXTENDING CLASS
    name_image_field: image
    form_related_image: ModelForm class
    rel_image_to_model: curso
    """
    change_form_template = "admin/change_form_trix_handle_images.html"
    
    def get_form(self, request, obj=None, **kwargs):
        if obj is None:
            kwargs['form'] = MinimalCreateForm
        return super().get_form(request, obj, **kwargs)

    def add_view(self, request, form_url='', extra_context=None):
        context = extra_context or {}
        context.update({
            "show_save": False,
            "show_save_and_add_another" : False
        })
        return super().add_view(request=request, form_url="", extra_context=context)
    
    def change_view(self, request, object_id, form_url="", extra_context=None):
        extra_context = extra_context or {}
        extra_context.update({
            "url_upload_image": reverse_lazy('admin:wysiwyg_upload_image', args=[object_id]),
        })
        return super().change_view(
            request,
            object_id,
            form_url,
            extra_context=extra_context,
        )
    
    def get_urls(self):
        urls = super().get_urls()
        my_urls = [path("<int:pk>/wysiwyg_upload_image/", self.admin_site.admin_view(self.wysiwyg_upload_image), name='wysiwyg_upload_image')]
        return my_urls + urls

    

    def wysiwyg_upload_image(self, request, *args, **kwargs):
        instance = get_object_or_404(self.model, pk=kwargs.get('pk'))
        form = self.form_related_image(request.POST, request.FILES)
        if form.is_valid():
            image = form.save(commit=False)
            setattr(image, self.rel_image_to_model, instance)
            image.save()
            
            return  JsonResponse({"url": getattr(image, self.name_image_field).url, "id":image.id}, status=200)
        return JsonResponse({"errors":form.errors.as_json()}, status=400)
    
    class Media:
        js = ["js/admin.js"]
    

class CursoImageForm(forms.ModelForm):
    class Meta:
        model = ImageCurso
        fields = ["image"]

class CursoAdminForm(forms.ModelForm):
    class Meta:
        model = Curso
        fields = '__all__'
        widgets = {
            'body':WysiwygWidget
        }

class CursoImageInline(TabularInline):
    model = ImageCurso
    
@admin.register(Curso)
class CursoAdmin(TrixUploadAdmin):
    form = CursoAdminForm
    form_related_image = CursoImageForm
    name_image_field = "image"
    rel_image_to_model = "curso"
    inlines = [CursoImageInline]
   