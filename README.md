# VARest ⚽

API RESTful para gestão de estatísticas de futebol, elencos e títulos. Construída com Node.js, Express, Docker, PostgreSQL, React (Vite) e documentação interativa via Swagger UI.

---

## 📁 Estrutura de Pastas

```text
futebol-stats-api/
├── .gitignore
├── .env.example
├── docker-compose.yml
├── README.md
│
├── db/
│   └── init.sql                 # Criação das tabelas e scripts iniciais
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── index.js             # Ponto de entrada
│       ├── swagger.json         # Documentação da API de futebol
│       ├── config/
│       │   └── database.js      # Conexão com o banco SQL
│       ├── controllers/         # Jogadores, Times, Partidas, Estatísticas
│       ├── routes/              # Endpoints HTTP
│       └── middlewares/         # Validação de dados
│
└── frontend/
    ├── Dockerfile
    ├── package.json
    └── src/
        ├── components/          # Cards de jogadores, tabelas de estatísticas
        ├── pages/               # Dashboard, Elencos, Cadastros, Titulações
        └── services/            # Comunicação com o backend
```

---

## 🚀 Como Executar com Docker

1. Copie o arquivo de exemplo de ambiente:
   ```bash
   cp .env.example .env
   ```

2. Suba todos os serviços (Banco de Dados PostgreSQL, Backend e Frontend):
   ```bash
   docker-compose up --build
   ```

3. Acesse os serviços:
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend API**: [http://localhost:3000](http://localhost:3000)
   - **Swagger UI**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
