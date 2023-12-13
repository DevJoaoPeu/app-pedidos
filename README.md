# App Pedidos - Sistema de Pedidos para Restaurantes

Bem-vindo ao repositório do App Pedidos, um sistema abrangente para gerenciar pedidos em restaurantes. Este projeto inclui um frontend web, um aplicativo mobile e um backend robusto, proporcionando uma solução completa para melhorar a eficiência do processo de pedidos em estabelecimentos de alimentos.

## Visão Geral

### Frontend Web (Next.js e Typescript)

O frontend web é construído com Next.js e utiliza SASS para estilização. Ele é projetado para receber e gerenciar pedidos do sistema mobile, permitindo que os atendentes vejam os pedidos em tempo real e os enviem para a cozinha. Além disso, oferece funcionalidades para adicionar novas categorias, como pizzas, lanches e sucos, e adicionar produtos a essas categorias.

#### Principais Tecnologias:
- Next.js
- Typescript
- SASS
- Nookies (gerenciamento de cookies)
- Axios (consumo da API)

### Aplicativo Mobile (React Native e Expo)

O aplicativo mobile, desenvolvido com React Native e Expo, é projetado para ser utilizado pelos garçons. Ele facilita a abertura de mesas, o envio de pedidos para o sistema web e a finalização dos pedidos quando prontos. Uma solução eficiente para agilizar o fluxo de pedidos em ambientes de restaurantes.

#### Principais Tecnologias:
- React Native
- Typescript
- Expo

### Backend (Node.js, TypeScript, Express, PostgreSQL)

O backend é desenvolvido em Node.js com TypeScript e utiliza o framework Express. Para persistência de dados, é utilizado o PostgreSQL. O backend é responsável por gerenciar usuários, autenticação (utilizando bcrypt para criptografar senhas e JWT para tokens seguros), categorias de produtos, produtos e pedidos.

#### Principais Tecnologias:
- Node.js
- TypeScript
- Express
- PostgreSQL
- Bcrypt (criptografia de senhas)
- JWT (geração de tokens)

## Configuração do Projeto

1. **Frontend Web:**
   - Navegue até o diretório `web` e execute:
     ```bash
     npm install
     npm run dev
     ```
     Isso iniciará o servidor de desenvolvimento em http://localhost:3000.

2. **Aplicativo Mobile:**
   - Navegue até o diretório `mobile` e execute:
     ```bash
     npm install
     npm start
     ```
     Isso abrirá a interface do Expo, onde você poderá escanear o QR Code para rodar o aplicativo no seu dispositivo móvel.

3. **Backend:**
   - Navegue até o diretório `server` e execute:
     ```bash
     npm install
     npm run dev
     ```
     O servidor backend será iniciado em http://localhost:3333.

Certifique-se de configurar corretamente as variáveis de ambiente, especialmente a `DATABASE_URL`, no arquivo `.env` em cada diretório, de acordo com as suas configurações locais. 
E a variavel JWT_SECRET que é a chave secreta do jwt

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir
