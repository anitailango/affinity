from .models import Rating
from rest_framework import serializers
class RatingSerializer(serializers.ModelSerializer):
    '''
    Serializer for article rating
    '''
    class Meta:
        model = Rating
        fields = ['author', 'title', 'publisher', 'text', 'rating']     