from django.shortcuts import render
from .models import UserHistory
from .serializers import UserHistorySerializer
from rest_framework import viewsets

class UserHistoryViewSet(viewsets.ModelViewSet):
    '''
    API endpoint that allows user history to be viewed or editted
    '''
    queryset = UserHistory.objects.all()
    serializer_class = UserHistorySerializer
