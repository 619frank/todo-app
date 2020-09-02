"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from src import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/todos/', views.todo_collection, name="get todos with Buckets"),    
    path('api/create_todo/', views.create_todo, name="post todo"),   
    path('api/mark_todo/', views.mark_todo, name="mark todo"),       
    path('api/update_todo/', views.update_todo, name="update_todo"),       
    path('api/delete_todo/<int:id>', views.delete_todo, name="delete_todo"),       

    path('api/buckets/', views.buckets, name="get buckets"),
    path('api/create_bucket/', views.create_bucket, name="create_bucket buckets")
]
