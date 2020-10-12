# Django Backend

This Django project comprises the backend for Affinity. Each part of the backend is separated based on pertinent
data/endpoints, and Django Rest Framework (DRF) is used to handle requests and serve responses. 

## DRF App Structure

Each of the apps within this project (besides django_backend) are defined by the same overarching structure that is
defined by DRF. 
- models.py
  - models.py defines the data that will be stored in a table in the Postgres DB. This is defined using a python class
  that extend the Django Model class.

- serializers.py
  - serializers.py defines how data from requests will be received (and stored if applicable), and what response
  will be sent back to the client
    - if the serliazers.ModelSerializer class is used and we simply wish to store the data from the request as an associated model, then we only have to define what fields will be stored
    - if we wish to format data or do something other than store it (such as simply returning a rating rather than 
    putting it in the DB), then we must define additional logic and request handling within this file

- urls.py
  - urls.py handles how requests will be handled within this app. The urls.py file within the django_backend app often will
  simply pass the handling of requests to the apps within the django project, so this is where the handling is done on an app basis

- views.py
  - views.py defines what queryset and serializer will be used with the DRF endpoint

## Django Apps In This Project

- django_backend
  - django_backend (the nested folder within the overarchign django_backend folder), defines the main settings
  and route handling for the django app. 
    - settings.py defines the apps, config parameters, etc. for the whole backend
    - urls.py defines how different routes will be handled with the other apps within this project

- bookmarks
  - This Django app defines the DRF endpoint and data associated with user bookmarks. 

- history
  - This Django app defines the stored article history for a specific user

- rating
  - This Django app takes in the url of an article from a GET request, scrapes the content of the article using newspaper,
    and then rates the content using the Rater class from rater.py defined within the rating folder

- users
  - This Django app defines what info will be stored for an Affinity user and allows for the creation of new users
