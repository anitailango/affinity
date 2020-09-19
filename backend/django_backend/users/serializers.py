from .models import AffinityUser
from rest_framework import serializers

class AffinityUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AffinityUser
        fields = ['email', 'groups']
