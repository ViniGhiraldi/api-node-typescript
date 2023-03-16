import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<number | Error> => {
    try {
        const result = await Knex(ETableNames.cidade).where({id: id}).update({
            nome: cidade.nome
        })
        console.log(result);

        if(result){
            return result;
        }
        return new Error(`id ${id} não existe`);
    } catch (error) {
        console.log(error);
        return new Error('Erro ao alterar registro');
    }
}