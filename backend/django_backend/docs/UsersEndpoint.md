# Users Endpoint


The Users endpoint has a uniform request and response structure

### Request
  - The structure of the request is as follows
    - 'action' field: this field (a query param for GET/ a data field for POST) specifies what functionality
    is requested from the Users endpoint. The available actions are:
      - getUsers (GET req)
      - createUser (POST req)
        - this requests expect the following data to be specified in the request's data body:
          - first_name
          - last_name
          - email
          - password
      - loginUser (POST req)
        - this request expects the following data to be specified in the request's data body:
          - email
          - password


### Response
  - The structure of the response is as follows
    - 'success' field: true if no problems occurred, false if problems did occur
    - 'error' field: contains error information in case 'success' is false
    - 'data' field: any function specific data that is returned
      - getUsers returns all user objects in the data field upon success
      - createUser returns the data corresponding to the newly created user object if successful
      - loginUser returns the 'token' field which contains an auth token for a successfully logged in user
    