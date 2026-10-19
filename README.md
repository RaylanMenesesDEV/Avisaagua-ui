# AvisaÁgua — Frontend

**Sistema de Avisos de Serviços Públicos**

## Sobre o projeto

O **AvisaÁgua** é um sistema web desenvolvido como parte do Projeto Integrador II do curso de Tecnologia em Sistemas para Internet.

O projeto tem como objetivo facilitar o acesso da população a informações sobre interrupções e atualizações de serviços públicos, especialmente abastecimento de água, fornecimento de energia elétrica e coleta de lixo.

A aplicação permite que cidadãos consultem avisos, acompanhem notificações e enviem feedbacks, contribuindo para melhorar a comunicação entre os órgãos responsáveis e a população.

O sistema tem como contexto de aplicação o município de Água Branca, no Piauí.

## Organização dos repositórios

O projeto está dividido em dois repositórios independentes:

**Frontend — Avisaagua-ui**

https://github.com/RaylanMenesesDEV/Avisaagua-ui

Responsável pela interface do usuário, navegação, páginas e comunicação com a API.

**Backend — Avisaagua-api**

https://github.com/RaylanMenesesDEV/Avisaagua-api

Responsável pela autenticação, regras de negócio, endpoints e integração com o banco de dados PostgreSQL.

## Tecnologias utilizadas

**Frontend**
- React
- Vite
- JavaScript
- React Router
- Lucide React
- HTML e CSS

**Backend (repositório separado)**
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

## Estrutura dos projetos

**Repositório Avisaagua-ui**

```text
Avisaagua-ui/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

**Repositório Avisaagua-api**

```text
Avisaagua-api/
├── prisma/
├── src/
│   ├── controllers/
│   ├── lib/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   └── utils/
├── package.json
├── prisma7.config.ts
└── test-prisma.js
```

## Requisitos

Para executar o sistema localmente, é necessário:

- Node.js e npm;
- PostgreSQL;
- Git;
- Os dois repositórios do AvisaÁgua.

## Como executar o projeto

### 1. Clonar os repositórios

```bash
git clone https://github.com/RaylanMenesesDEV/Avisaagua-ui.git
git clone https://github.com/RaylanMenesesDEV/Avisaagua-api.git
```

Caso sejam privados, será necessário possuir acesso autorizado aos repositórios.

### 2. Configurar o backend

Acesse a pasta da API:

```bash
cd Avisaagua-api
npm install
```

Crie um arquivo `.env` na raiz do backend:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
JWT_SECRET="SUBSTITUA_POR_UMA_CHAVE_SECRETA_FORTE"
```

Substitua os valores de exemplo pelas configurações do seu ambiente.

**Importante:** nunca publique credenciais reais no GitHub.

### 3. Preparar o banco de dados

Com o PostgreSQL em execução e o banco de dados criado:

```bash
npx prisma generate
npx prisma migrate deploy
```

### 4. Iniciar o backend

Na pasta `Avisaagua-api`, execute:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

### 5. Iniciar o frontend

Abra outro terminal e acesse a pasta `Avisaagua-ui`:

```bash
cd Avisaagua-ui
npm install
npm run dev
```

O frontend estará disponível normalmente em:

```text
http://localhost:5173
```

**Observação:** os comandos acima pressupõem que os repositórios foram clonados no mesmo diretório. Mantenha ambos os servidores em execução para utilizar o sistema.

## Integração entre frontend e backend

O frontend utiliza requisições HTTP para se comunicar com a API REST.

Durante o desenvolvimento local:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000/api`

As URLs estão configuradas para o ambiente local e precisarão ser ajustadas caso o sistema seja publicado na internet.

## Testes realizados

Durante o desenvolvimento, foram realizados testes de:

- Conexão com PostgreSQL;
- Consulta de avisos e órgãos públicos;
- Consulta de notificações;
- Autenticação JWT;
- Login e logout;
- Envio e armazenamento de feedbacks;
- Proteção de rotas administrativas contra acessos de cidadãos.

As operações com uma conta de administrador ainda precisam passar por testes específicos.

## Segurança

O backend utiliza bcrypt para armazenar hashes de senhas e JWT para autenticação.

Os perfis existentes são:

- `CIDADAO`
- `ADMINISTRADOR`

As operações administrativas são protegidas por verificações de autenticação e autorização realizadas na API.

## Situação do projeto

O AvisaÁgua está em desenvolvimento acadêmico. O frontend e o backend foram separados em repositórios GitHub independentes, conforme a organização solicitada para o Projeto Integrador II.

A interface administrativa está planejada para uma etapa futura.

## Contexto acadêmico

**Projeto:** AvisaÁgua  
**Curso:** Tecnologia em Sistemas para Internet  
**Disciplina:** Projeto Integrador II  
**Instituição:** Universidade Estadual do Piauí (UESPI) — UAPI

## Autor

Raylan Meneses Ferreira

Projeto desenvolvido para fins acadêmicos.