const db = require("../config/database.js");

async function inserirTime(nome, sigla, estadio, fundacao) {
    const sql =
        `
        INSERT INTO times (nome, sigla, estadio, fundacao) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
        `
    ;

    await db.query(sql, [nome, sigla, estadio, fundacao]);
}

async function buscarNomeOuSigla(nome, sigla) {
    const sql = `
        SELECT * FROM times WHERE nome = $1 OR sigla = $2
        `
    ;

    const result = await db.query(sql , [nome,sigla]);

    return result.rows[0];
}

module.exports = { inserirTime, buscarNomeOuSigla };