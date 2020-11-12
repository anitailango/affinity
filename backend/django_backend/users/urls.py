from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.authtoken import views as vw

urlpatterns = [
    path('users/', views.usersEndpoint, name="users endpoint")
]