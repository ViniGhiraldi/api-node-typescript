import { ICidade } from './../../models/Cidade';
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const getAll = async (page: number, limit: number, filter: string, id: number): Promise<ICidade[] | Error> => {
    try{
        const result = await Knex(ETableNames.cidade)
            .select('*')
            .where('id', Number(id))
            .orWhere('nome', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        console.log(result)
        
        if(id > 0 && result.every(item => item.id !== id)){
            const resultById = await Knex(ETableNames.cidade)
                .select('*')
                .where('id', '=', id)
                .first();

            if (resultById) return [...result, resultById];
        }

        return result;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao pegar registro');
    }
}