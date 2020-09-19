from django.shortcuts import render
from .models import AffinityUser
from rest_framework import viewsets, permissions
from .serializers import AffinityUserSerializer

class AffinityUserViewSet(viewsets.ModelViewSet):
    '''
    API endpoint that allows users to be viewed or edited
    '''
    queryset = AffinityUser.objects.all().order_by('-date_joined')
    serializer_class = AffinityUserSerializer
    permission_classs = [permissions.IsAuthenticated]



# Create your views here.
