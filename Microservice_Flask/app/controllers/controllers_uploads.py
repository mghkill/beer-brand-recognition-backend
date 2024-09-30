from http import HTTPStatus
from flask import jsonify, request
from app.services.services_uploads import handle_upload, handle_error

def create_uploads():
     
    file = request.files.get('file') 

   

    if file:
        response_data, status = handle_upload(file)
        return jsonify(response_data), status
    else:
        return jsonify({"message": "No file received."}), HTTPStatus.BAD_REQUEST
    
def read_all_uploads():
    pass

def update_all_uploads():
    pass

def delete_all_uploads():
    pass
