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
    path('api/todos/', views.todo_collection, name="get todos and post todo"),    
    path('api/create_todo/', views.create_todo, name="post todo"),   
    path('api/todos/<int:id>/', views.todo_element, name="get todo and delete todo"),
    path('api/buckets/', views.buckets, name="get buckets"),
    path('api/create_bucket/', views.create_bucket, name="create_bucket buckets")
]
