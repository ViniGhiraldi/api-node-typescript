import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const getById = async (id: number): Promise<ICidade | Error> => {
    try {
        //const result = await Knex(ETableNames.cidade).select('*').where('id','=',id).first();
        const result = await Knex(ETableNames.cidade).select('*').where({id: id}).first();
        console.log(result);

        if(result) return result;

        return new Error(`Registro com id ${id} não encontrado`);
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro');
    }
}