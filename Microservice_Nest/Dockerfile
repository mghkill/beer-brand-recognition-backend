FROM node:18

# Atualização do sistema e instalação de dependências
RUN apt update && apt -yq upgrade && apt install -yq build-essential libpq-dev openssl && rm -rf /var/lib/apt/lists/*

# Definir o fuso horário como variável de ambiente
ENV TZ="America/Sao_Paulo"

# Definir o diretório de trabalho
WORKDIR /apiNode

COPY . .

# Remover node_modules se existir
RUN rm -rf node_modules

# Instalar dependências
RUN npm install 

# Realizar o build do projeto
RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 3333
