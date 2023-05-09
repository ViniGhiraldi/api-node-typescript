import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
    const [{count}] = await knex(ETableNames.pessoa).count<[{count: number}]>('* as count');
    if(!Number.isInteger(count) || Number(count) > 0) return;

    await knex(ETableNames.pessoa).insert(pessoas);
}

const pessoas = [
    {
        nome: 'Vinicius',
        sobrenome: 'Ghiraldi',
        email: 'vinicius@gmail.com',
        cidadeId: 1
    },
    {
        nome: 'Marcelo',
        email: 'marcelo@gmail.com',
        cidadeId: 2
    },
    {
        nome: 'Maria',
        sobrenome: 'Laura',
        email: 'maria@gmail.com',
        cidadeId: 3
    },
    {
        nome: 'Diego',
        sobrenome: 'Silva',
        email: 'diego@gmail.com',
        cidadeId: 4
    },
    {
        nome: 'Eduardo',
        sobrenome: 'Pereira',
        email: 'eduardo@gmail.com',
        cidadeId: 5
    },
    {
        nome: 'Cristiane',
        sobrenome: 'Barbosa',
        email: 'cristiane@gmail.com',
        cidadeId: 6
    },
    {
        nome: 'Wellington',
        email: 'wellington@gmail.com',
        cidadeId: 7
    },
    {
        nome: 'Alexandre',
        sobrenome: 'Andrade',
        email: 'alexandre@gmail.com',
        cidadeId: 8
    },
    {
        nome: 'Caio',
        sobrenome: 'Teixeira',
        email: 'caio@gmail.com',
        cidadeId: 9
    },
    {
        nome: 'Ana',
        sobrenome: 'Maria',
        email: 'ana@gmail.com',
        cidadeId: 10
    }
]