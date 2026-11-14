const db = require("../config/database.js");

async function inserirPartida(time_mandante_id, time_visitante_id, gols_mandante, gols_visitante, data_partida, estadio){
    const sql = 
    `
        INSERT INTO partidas (time_mandante_id, time_visitante_id, gols_mandante, gols_visitante, data_partida, estadio)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;

    const result = await db.query(sql, [time_mandante_id, time_visitante_id, gols_mandante, gols_visitante, data_partida, estadio]);
    return result.rows[0];
}

async function listarPartidas(){
    const sql = 
    `
        SELECT 
        p.*,
        tm.nome AS mandante_nome,
        tm.sigla AS mandante_sigla,
        tv.nome AS visitante_nome,
        tv.sigla AS visitante_sigla
        FROM partidas p
        JOIN times tm ON p.time_mandante_id = tm.id
        JOIN times tv ON p.time_visitante_id = tv.id
        ORDER BY p.data_partida DESC;
    `;

    const result = await db.query(sql);
    return result.rows;
}

module.exports = {inserirPartida, listarPartidas}