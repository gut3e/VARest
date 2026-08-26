require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Documentação Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota de Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Futebol Stats operacional' });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    name: 'VARest - Futebol Stats API',
    version: '1.0.0',
    docs: '/api/docs',
    endpoints: '/api'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📑 Swagger Docs disponível em http://localhost:${PORT}/api/docs`);
});
