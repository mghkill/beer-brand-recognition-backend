FROM node:latest

RUN apt update && apt -yq upgrade && apt install -yq build-essential libpq-dev openssl && rm -rf /var/lib/apt/lists/*

ENV TZ="America/Sao_Paulo"

WORKDIR /apiNode

COPY package*.json ./

RUN rm -rf node_modules

# COPY .env .env

# ENV $(cat .env | tr '\n' ' ')

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 3333