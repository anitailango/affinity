from django.http import JsonResponse
import time
from django.views.decorators.csrf import csrf_exempt
from .firebase import send_to_firebase, update_firebase_snapshot
'''
connector.py defines CRUD operations to the firebase db using functions from firebase.py
'''

@csrf_exempt
def create_user(request):
    '''
    create a new user in the users collection of firebase 
    '''
    first_name = request.POST.get('first_name', '')
    last_name = request.POST.get('last_name', '')
    password = request.POST.get('password', '')
    email = request.POST.get('email', '')
    is_active = request.POST.get('is_active', True)
    is_staff = request.POST.get('is_staff', False)
    is_superuser = request.POST.get('is_superuser', False)
    last_login = time.time()
    date_joined = time.time()
    groups = request.POST.get('groups', {})
    raw_user = {
        'first_name': first_name,
        'last_name': last_name,
        'password': password,
        'email': email,
        'is_active': is_active,
        'is_staff': is_staff,
        'is_superuser': is_superuser,
        'last_login': last_login,
        'date_joined': date_joined,
        'groups': groups
    }
    spend_time = send_to_firebase(raw_user)
    return JsonResponse({'message': 'User created', 'spend_time': spend_time}, status=201)