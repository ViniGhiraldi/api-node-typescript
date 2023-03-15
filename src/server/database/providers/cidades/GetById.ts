import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade, IParamProps } from "../../models";

export const getById = async (params: IParamProps): Promise<ICidade | Error> => {
    try {
        const result = await Knex.from(ETableNames.cidade).select('*').where({id: params.id}).first().then((row) => row)
        console.log(result);

        if(typeof result === 'object'){
            return result;
        }
        return new Error(`Não existe registro com id ${params.id}`);
    } catch (error) {
        return new Error('Erro ao selecionar registro');
    }
}