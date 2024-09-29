FROM python:3.9-slim

# Atualização do sistema e instalação de dependências
RUN apt update && apt -yq upgrade && apt install -yq build-essential libpq-dev openssl && rm -rf /var/lib/apt/lists/*

# Definir o fuso horário como variável de ambiente
ENV TZ="America/Sao_Paulo"

# Definir o diretório de trabalho
WORKDIR /api

# Copiar dependências e instalar pacotes Python
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta da aplicação
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["python", "run.py"]
