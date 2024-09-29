from http import HTTPStatus

def serialize_image(data):
    ...

possible_key_error = {
    "Error": {"Message": "Incorrect format key"},
    "Example of current key format": {
        "Type: png, jpeg..."
    }
}, HTTPStatus.BAD_REQUEST

# Exportando as funções e constantes
__all__ = ['serialize_number', 'possible_key_error']
