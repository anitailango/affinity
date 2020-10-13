from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import viewsets, permissions
from django.contrib.auth.hashers import make_password, check_password

from .models import AffinityUser
from .serializers import AffinityUserSerializer
from ResponsePayload import ResponsePayload

@api_view(['GET', 'POST'])
def usersEndpoint(request):
    ''' handle routing to different actions within users endpoint '''
    if request.method == 'GET':
        try:
            print(request.query_params.get('action'))
            if (request.query_params.get('action') == 'getUsers'): # getUsers
                return getUsers(request)
            elif not request.query_params.get('action'): # no action param
                return Response(ResponsePayload(False, None, 'Invalid GET request to users endpoint: no action specified'), 400)
            else: # no matching action
                return Response(ResponsePayload(False, None, 'Invalid GET request to users endpoint: no matching action for GET requests'), 400)
        except: # error occurred
            return Response(ResponsePayload(False, None, 'Invalid GET request to users endpoint: no action specified'), 400)
    elif request.method == 'POST':
            try:
                if request.data['action'] == 'createUser': # create user
                    return createUser(request)
                elif request.data['action'] == 'loginUser': # login user
                    return loginUser(request)
                else: # there's no match for the passed action
                    return Response(ResponsePayload(False, None, 'Invalid POST request to users endpoint: no action matching request\'s action'), 400)
            except: # error thrown, probably no action specified in request
                return Response(ResponsePayload(False, None, 'Invalid POST request: no action specified in request'), 400)


def getUsers(request):
    ''' return all user objects '''
    try: 
        users = AffinityUser.objects.all()
        serializer = AffinityUserSerializer(users, many=True)
        return Response(ResponsePayload(True, serializer.data, None), 200)
    except:
        return Response(ResponsePayload(False, None,'Error occurred while getting users'), 400)

def createUser(request):
    ''' create user using data from request (and hash password) '''
    try:
        print(request.data)
        user_data = request.data
        # check for missing data
        errors = validateCreateUserData(user_data)
        if len(errors.keys()) > 0:
            return Response(ResponsePayload(False, None, 'Missing data from create user request: ' + str(errors)), 400)
        
        # update stored password to be a hash
        user_data._mutable = True
        user_data['password'] = make_password(user_data['password'])
        user_data._mutable = False

        # create new_user instance
        new_user = AffinityUserSerializer(data=user_data)

        if new_user.is_valid(): # if valid, save the new user in db
            new_user.save()
        return Response(ResponsePayload(True, new_user.data, None), 200)
    except:
        return Response(ResponsePayload(False, None, 'Error occurred while creating user'), 400)


def loginUser(request):
    ''' receive user email & password, check that matching email exists and password matches hash '''
    login_data = request.data
    saved_user = None
    try: # if no matching user is found, exception is thrown and we return an error
        saved_user = AffinityUser.objects.get(email=login_data['email'])
    except:
        return Response(ResponsePayload(False, None, "No matching email found"), 400)
        
    if not check_password(login_data['password'], saved_user.password):
        return Response(ResponsePayload(False, None, "incorrect password"), 400)
    token, created = Token.objects.get_or_create(user=saved_user)
    return Response(
        ResponsePayload(True, {'token': token.key}, None), 200);
    
    


def validateCreateUserData(data):
    errors = {}
    try:
        print(data['first_name'])
    except:
        print('oops')
    if 'first_name' not in data:
        errors['first_name'] = 'No first name specified in request'
    if 'last_name' not in  data:
        errors['last_name'] = 'No last name specfied in request'
    if 'email' not in data:
        errors['email'] = 'No email specified in request'
    if 'password' not in data:
        errors['password'] = 'No email specified in request'
    return errors
    