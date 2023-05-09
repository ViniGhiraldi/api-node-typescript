import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import { UsuariosProvider } from "../providers/usuarios";

export const seed = async (knex: Knex) => {
    const [{count}] = await knex(ETableNames.usuario).count<[{count: number}]>('* as count');
    if(!Number.isInteger(count) || Number(count) > 0) return;

    await UsuariosProvider.create(usuario);
}

const usuario = {
    nome: 'root',
    email: 'root@123.com',
    senha: '123456'
}