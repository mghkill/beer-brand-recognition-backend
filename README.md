# Beer Brand Recognition Backend

🍻 **Bem-vindo ao projeto Beer Brand Recognition!** Este repositório contém a API backend para reconhecimento de marcas de cerveja, utilizando uma arquitetura de microserviços com NestJS e Flask, além de Docker.

## 🛠️ Ferramentas Utilizadas

- **NestJS**: Framework para construir APIs Node.js eficientes e escaláveis.
- **Flask**: Microframework para Python que facilita o desenvolvimento de aplicações web.
- **Docker**: Plataforma para desenvolver, enviar e executar aplicações em contêineres.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados extraídos.
- **Python**: Linguagem de programação utilizada no microserviço Flask.
- **JavaScript/TypeScript**: Linguagens de programação utilizadas no microserviço NestJS.

## 🌀 Arquitetura de Microserviços

Este projeto utiliza uma arquitetura de microserviços, onde dois serviços principais trabalham juntos para processar imagens:

1. **Microserviço NestJS**:

   - **Responsabilidade**: Receber a imagem via upload multipart e gerenciar a comunicação com o microserviço Flask.
   - **Fluxo**:
     - Recebe a imagem do usuário.
     - Envia a imagem para o microserviço Flask para processamento.
     - Recebe os dados retornados pelo Flask e os armazena no MongoDB.
     - Retorna a resposta ao usuário.

2. **Microserviço Flask**:
   - **Responsabilidade**: Realizar a leitura do texto contido na imagem enviada pelo NestJS.
   - **Fluxo**:
     - Recebe a imagem do NestJS.
     - Processa a imagem utilizando técnicas de reconhecimento óptico de caracteres (OCR).
     - Retorna os dados extraídos de volta ao NestJS.

=====================================

# Acessando as APIs

## API 1 - Microserviço NestJS

      GET  - http://localhost:3333/
      POST - http://localhost:3333/upload


- Métodos:

  - `GET`: retorna informações da API
  - `POST`: recebe uma imagem em Multipart com o name `file` e o value igual a uma extensão de imagem (por exemplo, `.jpg`, `.png`, etc.)

## API 2 - Microserviço Flask

      POST - http://127.0.0.1:5000/upload

- Método:
  - `POST` Corpo da requisição: arquivo de imagem em Multipart

=====================================

## 🚀 Começando

Siga estas etapas para rodar a aplicação em sua máquina local após clonar o repositório.

# Pré-requisitos

Para executar o projeto, você precisará ter os seguintes pré-requisitos instalados:

### Ferramentas

- **Docker**: Versão estável
- **Docker Compose**: Geralmente incluído com o Docker
- **Git**: Para clonar o repositório
- **Node.js**: Para rodar o microserviço NestJS
- **Python**: Para rodar o microserviço Flask
- **MongoDB**: Para armazenar os dados

### 🛠️ Instalação das dependências

1. **Clone o repositório**:

   ```bash

   git clone git@github.com:mghkill/beer-brand-recognition-backend.git

   cd beer-brand-recognition-backend

   ```

2. **Verifique se o Docker está ativo:**

   Execute os seguintes comandos para saber a versão e se o Docker está funcionando corretamente:

   ```bash

   docker --version

   docker run hello-world

   ```

   Se o Docker estiver ativo, você verá a mensagem de boas-vindas do Docker.

3. **Inicie a aplicação:**:

   Execute o seguinte comando para construir a imagem e iniciar os contêiners:

   ```bash

   docker-compose up --build

   ```

4. **Parar a aplicação:**:

   Para parar a aplicação, utilize:

   ```bash

    docker-compose down

   ```

   4. **Parar a aplicação:**:

   Para parar a aplicação, utilize:

   ```bash

    docker-compose down

   ```

# 📖 Documentação da API

### Como Funciona

Quando você faz um upload de uma imagem para o endpoint `/upload`, o seguinte fluxo ocorre:

1. **Recepção da Imagem**:

   - O serviço **NestJS** recebe a imagem via upload multipart.
   - A imagem é validada e processada para garantir que está no formato correto.

2. **Envio para Flask**:

   - Após a validação, a imagem é enviada para o microserviço **Flask**.
   - O NestJS utiliza uma chamada HTTP para se comunicar com o Flask, enviando a imagem para processamento.

3. **Processamento**:

   - O microserviço **Flask** recebe a imagem e utiliza técnicas de reconhecimento óptico de caracteres (OCR) para extrair o texto contido nela.
   - Os dados extraídos são formatados e preparados para o retorno.

4. **Persistência**:
   - Os dados extraídos pelo Flask são enviados de volta para o NestJS.
   - O NestJS armazena esses dados no banco de dados **MongoDB**, garantindo que as informações possam ser acessadas posteriormente.
   - Por fim, a resposta com os dados extraídos é retornada ao usuário que fez o upload da imagem.

---

### 📝 Contribuindo

Se você quiser contribuir para este projeto, sinta-se à vontade para abrir um Pull Request ou reportar problemas. Sua ajuda é sempre bem-vinda!
