from http import HTTPStatus
from flask import jsonify, request
from app.services.services_uploads import handle_upload, handle_error

def create_uploads():
     # Recebe o arquivo enviado
    file = request.files.get('file')  # O nome 'file' deve corresponder ao que foi enviado no frontend
    
    if file:
        # Para verificar se a imagem foi recebida com sucesso
        print(f"File received: {file.filename}")

        # Aqui você pode passar o arquivo para a função handle_upload
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
