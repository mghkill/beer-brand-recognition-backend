import pytesseract
import cv2
import numpy as np
from http import HTTPStatus
from app.services import possible_key_error, serialize_image
import re

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  

def handle_upload(data):
    
    try:
     
        image = cv2.imdecode(np.frombuffer(data.read(), np.uint8), cv2.IMREAD_COLOR)

      
        if image is None:
            raise ValueError("A imagem não pôde ser decodificada.")

      
        outputText = pytesseract.image_to_string(image)

        outputText = outputText.replace('\n', ' ')
        outputText = re.sub(r'\s+', ' ', outputText).strip()
        outputText = outputText.replace('\n', '[NEW LINE]')


        return {"Text": outputText}, HTTPStatus.OK

    except Exception as e:
     
        return handle_error(e)

def handle_error(exception):
    print(exception)
    return {"message": "An error occurred", "error": str(exception)}, HTTPStatus.INTERNAL_SERVER_ERROR
