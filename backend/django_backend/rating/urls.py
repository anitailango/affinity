from django.urls import path, include
from . import views
from rest_framework import routers
#router = routers.DefaultRouter()
#router.register('rating', views.RatingViewSet)

urlpatterns = [
    path('rating/', views.rating_response)
]