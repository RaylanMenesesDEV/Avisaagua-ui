# AvisaÁgua

**Sistema de Avisos de Serviços Públicos**

## Sobre o projeto

O **AvisaÁgua** é um sistema web desenvolvido como parte do Projeto Integrador II do curso de Tecnologia em Sistemas para Internet.

O projeto tem como objetivo facilitar o acesso da população a informações sobre interrupções e atualizações de serviços públicos, especialmente abastecimento de água, fornecimento de energia elétrica e coleta de lixo.

A aplicação permite que cidadãos consultem avisos, acompanhem notificações e enviem feedbacks, contribuindo para melhorar a comunicação entre os órgãos responsáveis e a população.

O sistema tem como contexto de aplicação o município de Água Branca, no Piauí.

## Tecnologias utilizadas

**Frontend**
- React
- Vite
- JavaScript
- React Router
- Lucide React
- HTML e CSS

**Backend**
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JSON Web Token (JWT)
- bcrypt
- CORS

## Funcionalidades

### Cidadão

- Cadastro de usuário;
- Login com autenticação JWT;
- Consulta de avisos ativos;
- Filtragem por Água, Energia e Lixo;
- Visualização dos detalhes de um aviso;
- Consulta de notificações;
- Envio de feedbacks;
- Encerramento da sessão.

### Administração — API

O backend possui rotas protegidas para:

- Cadastrar e atualizar avisos;
- Encerrar avisos;
- Cadastrar órgãos responsáveis;
- Criar notificações;
- Consultar feedbacks recebidos;
- Atualizar o status de feedbacks.

**Observação:** as funcionalidades administrativas estão implementadas na API, mas ainda não possuem um painel administrativo próprio no frontend.

## Estrutura do projeto

```text
avisaagua/
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── package.json
│   └── prisma7.config.ts
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
├── index.html
├── package.json
└── README.md
```

## Requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Node.js e npm;
- PostgreSQL;
- Git, caso deseje clonar o repositório.

Também é necessário criar um banco de dados PostgreSQL e configurar as variáveis de ambiente do backend.

## Como executar o projeto

### 1. Instalar as dependências do frontend

Na pasta principal do projeto:

```bash
npm install
```

### 2. Instalar as dependências do backend

```bash
cd backend
npm install
```

### 3. Configurar o banco de dados

Crie o arquivo `backend/.env` com as variáveis necessárias:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
JWT_SECRET="SUBSTITUA_POR_UMA_CHAVE_SECRETA_FORTE"
```

Substitua os valores de exemplo pelas configurações do seu ambiente.

**Importante:** não publique o arquivo `.env` nem credenciais reais no GitHub.

### 4. Preparar o Prisma

Dentro da pasta `backend`, execute:

```bash
npx prisma generate
npx prisma migrate deploy
```

As migrações existentes serão utilizadas para preparar as tabelas do banco de dados.

### 5. Iniciar o backend

Ainda dentro da pasta `backend`:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

### 6. Iniciar o frontend

Abra outro terminal, volte à pasta principal do projeto e execute:

```bash
npm run dev
```

O frontend ficará disponível normalmente em:

```text
http://localhost:5173
```

## Testes e verificações

O backend possui um comando para verificar a conexão com o PostgreSQL:

```bash
cd backend
npm run test:db
```

Durante o desenvolvimento, foram realizados testes de consulta de avisos, órgãos, notificações, login, logout, envio de feedback e proteção de rotas com JWT.

## Segurança

A aplicação utiliza senhas armazenadas com hash bcrypt e autenticação por JWT.

Existem dois perfis de usuário:

- `CIDADAO`
- `ADMINISTRADOR`

As rotas administrativas verificam a autenticação e as permissões do usuário antes de permitir operações restritas.

## Situação do projeto

O AvisaÁgua está em desenvolvimento acadêmico. As funcionalidades do cidadão foram integradas ao frontend e ao backend. A API também contempla operações administrativas, cuja interface poderá ser desenvolvida em uma próxima etapa.

## Contexto acadêmico

**Projeto:** AvisaÁgua  
**Curso:** Tecnologia em Sistemas para Internet  
**Disciplina:** Projeto Integrador II  
**Instituição:** Universidade Estadual do Piauí (UESPI) — UAPI

## Autor

Raylan Meneses Ferreira

Projeto desenvolvido para fins acadêmicos.