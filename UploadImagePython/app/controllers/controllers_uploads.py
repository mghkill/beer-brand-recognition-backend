from http import HTTPStatus
from flask import jsonify, request
from datetime import datetime as dt
 
from app.controllers import possible_key_error, serialize_image
 

def create_uploads():
    data = request.get_json()
    
    try:
            
        serialized_data = serialize_image(data)

        if serialized_data:
            return serialized_data


        return jsonify(data), HTTPStatus.CREATED

    except (TypeError, KeyError):
        return possible_key_error
        
     



def read_all_uploads():
   ...



def update_all_uploads():
    ...



def delete_all_uploads():
    ...