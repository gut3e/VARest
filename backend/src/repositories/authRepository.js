const db = require( "../config/database.js");

async function criar(nome , email, senhaHash) {
    const sql = `
    INSERT INTO usuarios (nome, email, senha) 
    VALUES ($1, $2, $3)
  `;

  await db.query(sql, [nome, email, senhaHash]);
    
}

async function buscarPorEmail(email) {
    const sql = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await db.query(sql, [email]);
    return result.rows[0];
}

module.exports = {criar, buscarPorEmail};