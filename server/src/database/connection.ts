//CONEXÃO COM O BANCO DE DADOS

import knex from 'knex';
import path from 'path';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true, //usar nulo para um conteudo no bd
})

export default db;