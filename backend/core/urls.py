from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('post/create/', views.CreatePost.as_view(), name='post_create'),
    path("post/image/upload/<int:pk>", views.UploadImage.as_view(), name="some")
]
