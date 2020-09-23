from .models import UserHistory
from rest_framework import serializers

class UserHistorySerializer(serializers.ModelSerializer):
    '''
    Serializer for the UserHistory class 
    '''
    class Meta:
        model = UserHistory
        fields = ['user_email', 'history']