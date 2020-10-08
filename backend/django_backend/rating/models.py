from django.db import models

class Rating(models.Model):
    '''
    data response containing rating info for when a user reads an article
    '''
    author = models.TextField()
    title = models.TextField()
    publisher = models.TextField()
    text = models.TextField()
    rating = models.TextField()

