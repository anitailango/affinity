from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import viewsets, permissions
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import  render_to_string
from django.urls import reverse
from django_rest_resetpassword.signals import reset_password_token_created

from .models import AffinityUser
from .serializers import AffinityUserSerializer
from ResponsePayload import ResponsePayload

debug = True # set to true when testing so nothing is added to database

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
        except Exception as e: # error occurred
            return Response(ResponsePayload(False, None, 'Invalid GET request to users endpoint: no action specified: ' + str(e)), 400)
    elif request.method == 'POST':
            try:
                if request.data['action'] == 'createUser': # create user
                    return createUser(request)
                elif request.data['action'] == 'loginUser': # login user
                    return loginUser(request)
                else: # there's no match for the passed action
                    return Response(ResponsePayload(False, None, 'Invalid POST request to users endpoint: no action matching request\'s action'), 400)
            except Exception as e: # error thrown, probably no action specified in request
                return Response(ResponsePayload(False, None, 'Invalid POST request: no action specified in request: ' + str(e)), 400)


def getUsers(request):
    ''' return all user objects '''
    try: 
        users = AffinityUser.objects.all()
        serializer = AffinityUserSerializer(users, many=True)
        return Response(ResponsePayload(True, serializer.data, None), 200)
    except Exception as e:
        return Response(ResponsePayload(False, None,'Error occurred while getting users: ' + str(e)), 400)

def createUser(request):
    ''' create user using data from request (and hash password) '''
    try:
        user_data = request.data
        # check for missing data
        errors = validateCreateUserData(user_data)
        if len(errors.keys()) > 0:
            return Response(ResponsePayload(False, None, 'Missing data from create user request: ' + str(errors)), 400)
        # update stored password to be a hash
        if ('_mutable' in user_data):
            user_data._mutable = True
        user_data['password'] = make_password(user_data['password'])
        if ('_mutable' in user_data):
            user_data._mutable = False        

        # create new_user instance
        new_user = AffinityUserSerializer(data=user_data)
        if (new_user.is_valid() and (not debug)): # if valid (and not debugging), save the new user in db
            new_user.save()
        return Response(ResponsePayload(True, new_user.data, None), 200)
    except Exception as e:
        return Response(ResponsePayload(False, None, 'Error occurred while creating user: ' + str(e)), 400)


def loginUser(request):
    ''' receive user email & password, check that matching email exists and password matches hash '''
    login_data = request.data
    saved_user = None
    try: # if no matching user is found, exception is thrown and we return an error
        saved_user = AffinityUser.objects.get(email=login_data['email'])
    except:
        return Response(ResponsePayload(False, None, "No matching email found."), 400)
        
    if not check_password(login_data['password'], saved_user.password):
        return Response(ResponsePayload(False, None, "Incorrect password."), 400)
    token, created = Token.objects.get_or_create(user=saved_user)
    return Response(
        ResponsePayload(True, {'token': token.key, 'email': saved_user.email, 'first_name': saved_user.first_name, 'last_name': saved_user.last_name}, None), 200);
    
    
def updatePassword(request):
    ''' receive email, new_password, update user instance with new password (this will be used to email user in case of forgotten password) '''
    try:
        reset_data = request.data
        saved_user = None
        # get the user we are updating
        try:
            saved_user = AffinityUser.objects.get(email=reset_data['email'])
        except:
            return Response(ResponsePayload(False, None, "No matching email found."), 400)
        
        # update the user to have new password
        saved_user['password'] = make_password(reset_data['new_password'])
        # update the user in the DB
        if (saved_user.is_valid()):
            saved_user.save()
        return Response(ResponsePayload(True, None, None), 200)
    except Exception as e:
        return Response(ResponsePayload(False, None, 'Error occurred while updating user password: ' + str(e)), 400)

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
    



@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    '''
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    '''
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Affinity"),
        # message:
        email_plaintext_message,
        # from:
        "cjp915@gmail.com",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()