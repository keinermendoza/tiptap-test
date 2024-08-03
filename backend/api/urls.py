from django.urls import path
from . import views
urlpatterns = [
    path('cursos', views.CursosList.as_view(), name='cursos_list'),
    path('cursos/<int:pk>/', views.CursoRetriveUpdateDestroy.as_view(), name='cursos_detail'),
    path("cursos/<int:pk>/image/upload/", views.UploadImage.as_view(), name="upload_curso_image"),
    path("cursos/<int:pk>/image/delete/<int:image_id>/", views.DeleteImage.as_view(), name="delete_image")
]
