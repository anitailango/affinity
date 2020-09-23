from .models import UserBookmarks
from rest_framework import serializers

class UserBookmarksSerializer(serializers.ModelSerializer):
    '''
    Serializer for the UserBookmarks class
    '''
    class Meta:
        model = UserBookmarks
        fields = ['user_email', 'bookmarks']