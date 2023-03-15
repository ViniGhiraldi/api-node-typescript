import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const create = async (body: Omit<ICidade,'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.cidade).insert(body).returning('id')
        console.log(result+' log from Create.ts')

        if(typeof result === 'object'){
            return result.id;
        }else if(typeof result === 'number'){
            return result;
        }

        return new Error('erro ao cadastrar o registro');
    } catch (error) {
        console.log(error);
        return new Error('erro ao cadastrar o registro');
    }
}