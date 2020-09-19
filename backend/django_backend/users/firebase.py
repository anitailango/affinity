import time
from datetime import timedelta

from firebase_admin import firestore, initialize_app

__all__ = ['send_to_firebase', 'update_firebase_snapshot']

initialize_app()

def send_to_firebase(new_user):    
    '''
    test function that creates a user object
    '''
    start = time.time()
    db = firestore.client()
    db.collection('users').document().create(new_user)
    end = time.time()
    spend_time = timedelta(seconds=end-start)
    return spend_time

def update_firebase_snapshot(snapshot_id):
    '''
    test function that updates a user object (with id == snapshot_id) to have is_active = False
    '''
    start = time.time()
    db = firestore.client()
    db.collection('users').document(snapshot_id).update(
        {'is_active': False}
    )
    end = time.time()
    spend_time = timedelta(seconds=end-start)
    return spend_time