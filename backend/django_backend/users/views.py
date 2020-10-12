from django.shortcuts import render
from .models import AffinityUser
from rest_framework import viewsets, permissions
from .serializers import AffinityUserSerializer
from django.contrib.auth.hashers import make_password, check_password

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

class AffinityUserViewSet(viewsets.ModelViewSet):
    '''
    API endpoint that allows users to be viewed or edited
    '''
    queryset = AffinityUser.objects.all().order_by('-date_joined')
    serializer_class = AffinityUserSerializer
    permission_classs = [permissions.IsAuthenticated]



@api_view(['GET'])
def getUsers(request):
    ''' return all user objects '''
    users = AffinityUser.objects.all()
    serializer = AffinityUserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createUser(request):
    ''' create user using data from request (and hash password) '''
    user_data = request.data
    user_data._mutable = True
    user_data['password'] = make_password(user_data['password'])
    user_data._mutable = False
    new_user = AffinityUserSerializer(data=user_data)

    if new_user.is_valid(): # if valid, save the new user
        new_user.save()
    return Response(new_user.data)

@api_view(['POST'])
def loginUser(request):
    ''' receive user email & password, check that matching email exists and password matches hash '''
    login_data = request.data
    saved_user = None
    try: 
        saved_user = AffinityUser.objects.get(email=login_data['email'])
    except:
        return Response({'success': False, 'error': "No matching email found"})
        
    if not check_password(login_data['password'], saved_user.password):
        return Response({'success': False, 'error': "incorrect password"})
    token, created = Token.objects.get_or_create(user=saved_user)
    return Response({
        'success': True,
        'token': token.key
    });
    
    

