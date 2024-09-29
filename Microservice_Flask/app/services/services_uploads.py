from http import HTTPStatus
from app.services import possible_key_error, serialize_image

def handle_upload(data):
    serialized_data = serialize_image(data)

    if serialized_data:
        return serialized_data


    return data, HTTPStatus.CREATED

def handle_error(exception):
    print(exception)
    return possible_key_error
