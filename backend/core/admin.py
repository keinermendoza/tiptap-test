from django import forms
from django.contrib import admin
from .models import Post, ImagePost, Curso, ImageCurso
from unfold.admin import ModelAdmin, TabularInline
from unfold.contrib.forms.widgets import ArrayWidget, WysiwygWidget

admin.site.register(Post)
admin.site.register(ImagePost)
# admin.site.register(Curso)
@admin.register(ImageCurso)
class ImageCursoAdmin(ModelAdmin):
    list_display = ['id', '__str__']

class MinimalCreateForm(forms.ModelForm):
    class Meta:
        fields = ['name']

# class ReachTextForm(forms.ModelForm):
#     class Meta:
#         fields = '__all__'
#         widgets = {"body": WysiwygWidget}

        

class EditorJsUploadAdmin(ModelAdmin):
    # form = ReachTextForm
    def get_form(self, request, obj=None, **kwargs):
        # Si es una vista de añadir (objeto es None), usa el formulario personalizado
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
    
    class Media:
        js = ["js/admin.js"]
    

class CursoImageInline(TabularInline):
    model = ImageCurso

@admin.register(Curso)
class CursoAdmin(EditorJsUploadAdmin):
    inlines = [CursoImageInline]
        
        # return super().change_view(
        #     request,
        #     object_id,
        #     form_url,
        #     extra_context=extra_context,
        # )

# context["show_save"] = False
# Register your models here.
