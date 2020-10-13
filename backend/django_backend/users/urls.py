from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.authtoken import views as vw

# router = routers.DefaultRouter()
# router.register('users', views.AffinityUserViewSet)

urlpatterns = [
    # path('', include(router.urls)),
    # path('api-token-auth/', vw.obtain_auth_token),
    path('users/', views.usersEndpoint, name="users endpoint")
    # path('all-users/', views.getUsers, name="all users"),
    # path('create-user/', views.createUser, name="create user"),
    # path('login-user/', views.loginUser, name="login user")
]