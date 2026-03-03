# Agente de triagem Inteligente

Sistema de atendimento que faz a triagem dos usuarios, pode identificar a necessidade do usuario coletando dados e encaminhar para 
**Vendas** **Suporte** ou **Financeiro**, para outros assuntos há um bloqueio.

# Setores de Atendimento

- Vendas - Compras, duvidas, preços.
- Suporte - Reclamações, atrasos, problemas com serviços.
- Financeiro - Pagamentos, boletos, estornos.

### Backend
- **Node.js** + **TypeScript**
- **Express** — framework HTTP
- **Prisma 7** — ORM com adapter libsql
- **SQLite** — banco de dados
- **Anthropic SDK** — integração com o modelo Claude

### Frontend
- **React** + **TypeScript** (via Vite)
- **Tailwind CSS v4** — estilização
- **Axios** — requisições HTTP

### Infraestrutura
- **Docker** + **Docker Compose**


## 🚀 Como Rodar o Projeto

- [Docker](https://docs.docker.com/get-docker/) instalado
- Chave de API da Anthropic — (https://console.anthropic.com)

### Com Docker (recomendado)

1. Clone o repositório:
```bash
git clone https://github.com/reversonthaiam/agente-triagem.git
```

2. Crie o arquivo `.env` na raiz do projeto:
```bash
cp .env.example .env
```

3. Preencha a variável no `.env`:
```
ANTHROPIC_API_KEY=Adicione a chave que pode ser buscada no (https://console.anthropic.com)
```

4. Suba os containers:
```bash
docker compose up --build
```

5. Acesse no navegador:
- **Frontend:** http://localhost
- **Backend:** http://localhost:3333

---

### Sem Docker (desenvolvimento)

#### Backend

```bash
cd backend
npm install
```

Crie o arquivo `backend/.env`:
```
ANTHROPIC_API_KEY=sua_chave_aqui
DATABASE_URL="file:./dev.db"
PORT=3333
```

Rode as migrations e inicie o servidor:
```bash
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🗄️ Banco de Dados

O projeto usa **SQLite** com duas tabelas:

- **Conversation** — armazena cada sessão de atendimento
- **Message** — armazena cada mensagem com seu `role` (user/assistant)

---

## 📝 Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `ANTHROPIC_API_KEY` | Chave de API da Anthropic |
| `DATABASE_URL` | Caminho do banco SQLite |
| `PORT` | Porta do servidor backend (padrão: 3333) |