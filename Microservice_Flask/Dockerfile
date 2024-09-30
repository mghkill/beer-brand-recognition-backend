FROM python:3.9-slim

# Atualiza o sistema e instala as dependências necessárias
RUN apt update && apt -yq upgrade && apt install -yq \
    build-essential \
    libpq-dev \
    openssl \
    tesseract-ocr \                     
    libgl1-mesa-glx \                   
    && rm -rf /var/lib/apt/lists/*

# Define o fuso horário
ENV TZ="America/Sao_Paulo"

# Define o diretório de trabalho
WORKDIR /api

# Copia o arquivo de requisitos para dentro do contêiner
COPY requirements.txt .

# Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["python", "run.py"]
