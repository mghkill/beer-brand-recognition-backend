FROM node:18

RUN apt update && apt -yq upgrade && apt install -yq build-essential libpq-dev openssl && rm -rf /var/lib/apt/lists/*

ENV TZ="America/Sao_Paulo"

WORKDIR /apiNode

COPY package*.json ./

COPY . .

RUN rm -rf node_modules

RUN npm install 

RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 3333
