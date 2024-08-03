from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path("crear-curso/", views.CrearCurso.as_view(), name="crear_curso"),
    path("update-curso/<int:pk>/", views.UpdateCurso.as_view(), name="update_curso"),

    
    re_path(r'^editor/.*$', views.EditorView.as_view()),
    
    path('posts/', views.PostList.as_view(), name='post_list'),

    path('post/create/', views.CreatePostTitle.as_view(), name='post_title_create'),
    path('post/delete/<int:pk>/', views.DeletePost.as_view(), name='post_delete'),


    path('post/update/', views.CreatePost.as_view(), name='post_update'),
    # images
    path("post/image/upload/<int:pk>/", views.UploadImage.as_view(), name="upload_image"),
    # path("post/image/delete/<int:pk>/", views.DeleteImage.as_view(), name="delete_image")

]
