
def ResponsePayload(success: bool = True, data: dict = None, error: str = None):
    ''' return standard data format for API response '''
    return {'success': success, 'data': data, 'error': error}