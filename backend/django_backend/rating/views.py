from django.shortcuts import render
from .models import Rating
from rest_framework import viewsets
from .serializers import RatingSerializer
from .rater import Rater

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from cgi import parse_qs

@csrf_exempt
def rating_response(request):
    if request.method == 'GET':
        # get article url and parse with newspaper
        args = parse_qs(request.environ['QUERY_STRING'])
        url = args['url'][0]#request.query_params.url
        rater = Rater(False)        
        # use bias rater to get rating
        rater.generate_rating(url)
        return JsonResponse({ "author": rater.authors, "title": rater.title, "publisher": rater.publisher, "rating":  rater.rating})
        


        

class RatingViewSet(viewsets.ModelViewSet):
    '''
    Serves reponse data for rating endpoint
    '''
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
# Create your views here.
