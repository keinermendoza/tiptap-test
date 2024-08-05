from django import forms
from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline
from .models import Post, ImagePost, Curso, ImageCurso

from .admin_utils import WysiwygWidget
from .admin_utils import RichTextEditorAdmin

admin.site.register(Post)
admin.site.register(ImagePost)

# form_related_image
class CursoImageForm(forms.ModelForm):
    class Meta:
        model = ImageCurso
        fields = ["image"]

# form_required_fields
class CursoMinimalCreateForm(forms.ModelForm):
    class Meta:
        fields = ['name']
# form
class CursoAdminForm(forms.ModelForm):
    disable_inlines = forms.CharField(widget=forms.HiddenInput, required=False)
    class Meta:
        model = Curso
        fields = '__all__'
        widgets = {
            'body':WysiwygWidget
        }

class CursoImageInline(TabularInline):
    model = ImageCurso
    
@admin.register(Curso)
class CursoAdmin(RichTextEditorAdmin):
    form = CursoAdminForm
    inlines = [CursoImageInline]

    # custom required attributes
    form_required_fields = CursoMinimalCreateForm
    model_image_related = ImageCurso
    form_related_image = CursoImageForm
    name_image_field = "image"
    rel_image_to_model = "curso"
    disable_inlines_on_delete_image = True
    disable_inlines_message = "Para usar esta seccion debe guardar"
   