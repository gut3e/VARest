const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME || 'futebol_stats',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
});

pool.on('connect', () => {
  console.log('Conexão com PostgreSQL estabelecida com sucesso.');
});

pool.on('error', (err) => {
  console.error('Erro inesperado no cliente do banco de dados:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
