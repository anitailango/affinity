from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from users.models import AffinityUser

# Create your models here.
class UserHistory(models.Model):
    '''
    array of urls associated with a user entry in the users table
    '''
    user_email = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    history = ArrayField(models.URLField())
