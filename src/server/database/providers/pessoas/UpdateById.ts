import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const updateById = async (id:number, pessoa:Omit<IPessoa, 'id'>): Promise<void | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.cidade)
            .where('id', '=', pessoa.cidadeId)
            .count<[{count: number}]>('* as count');

        if(count === 0) return new Error('Cidade não encontrada');

        const emailExists = await Knex(ETableNames.pessoa)
            .where('email', '=', pessoa.email)
            .select('id').first();

        console.log(emailExists && Number(emailExists.id) !== id)


        if(emailExists !== undefined && emailExists.id !== id) {
            return new Error('O email informado já está vinculado a outra pessoa');
        }

        const result = await Knex(ETableNames.pessoa).update(pessoa).where('id', '=', id);

        if(result > 0) return;

        return new Error(`id ${id} não existe`);
    } catch (error) {
        console.log(error);
        return new Error('Erro ao alterar registro');
    }
}