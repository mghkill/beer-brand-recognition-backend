from http import HTTPStatus
from flask import jsonify, request
from app.services.services_uploads import handle_upload, handle_error

def create_uploads():
    data = request.get_json()
    
    try:
        response_data, status = handle_upload(data)
        return jsonify(response_data), status
    except (TypeError, KeyError) as e:
        return handle_error(e)

def read_all_uploads():
    pass

def update_all_uploads():
    pass

def delete_all_uploads():
    pass
