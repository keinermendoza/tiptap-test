from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    
    path('posts/', views.PostList.as_view(), name='post_list'),

    path('post/create/', views.CreatePostTitle.as_view(), name='post_title_create'),
    path('post/delete/<int:pk>/', views.DeletePost.as_view(), name='post_delete'),


    path('post/update/', views.CreatePost.as_view(), name='post_update'),
    path("post/image/upload/<int:pk>/", views.UploadImage.as_view(), name="some")
]
