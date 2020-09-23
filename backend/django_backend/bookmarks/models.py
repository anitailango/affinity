from django.db import models
from django.conf import settings
from users.models import AffinityUser

class UserBookmarks(models.Model):
    '''
    Class that holds all bookmarks associated with a user email
    '''
    # user_email holds the associated email 
    user_email = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # bookmarks will be stored as an associated JSON array that is initially empty
    bookmarks = models.JSONField(default=dict, null=False)

