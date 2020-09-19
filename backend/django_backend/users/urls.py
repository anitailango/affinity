from django.urls import path, include
from . import views
from rest_framework import routers
from .connector import create_user

router = routers.DefaultRouter()
router.register('users', views.AffinityUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/create_user', create_user, name='create user')
]