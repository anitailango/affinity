from django.shortcuts import render
from .models import UserBookmarks
from rest_framework import viewsets
from .serializers import UserBookmarksSerializer

class UserBookmarksViewSet(viewsets.ModelViewSet):
    '''
    API endpoint that allows user bookmarks to be viewed or edited
    '''
    queryset = UserBookmarks.objects.all()
    serializer_class = UserBookmarksSerializer
