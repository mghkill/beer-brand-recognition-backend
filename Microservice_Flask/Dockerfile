FROM python:3.9-slim

RUN apt update && apt -yq upgrade && apt install -yq build-essential libpq-dev openssl && rm -rf /var/lib/apt/lists/*


ENV TZ="America/Sao_Paulo"


WORKDIR /api


COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt


COPY . .


EXPOSE 5000


CMD ["python", "run.py"]
