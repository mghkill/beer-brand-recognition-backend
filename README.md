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

## 🚀 Começando

Siga estas etapas para rodar a aplicação em sua máquina local após clonar o repositório.

### 📋 Pré-requisitos

- [Docker](https://www.docker.com/products/docker-desktop) (versão estável)
- [Docker Compose](https://docs.docker.com/compose/) (geralmente incluído com o Docker)

### 🛠️ Instalação

1. **Clone o repositório**:

   ```bash

   git clone <URL do repositório>

   cd beer-brand-recognition-backend

   ```

2. **Inicie a aplicação:**:

   Execute o seguinte comando para construir a imagem e iniciar o contêiner:

   ```bash

   docker-compose up --build

   ```

3. **Parar a aplicação:**:

   Para parar a aplicação, utilize:

   ```bash

    docker-compose down

   ```

   ## 📖 Documentação da API

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
