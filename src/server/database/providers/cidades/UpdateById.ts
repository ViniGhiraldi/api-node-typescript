import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade, IParamProps } from "../../models";

export const updateById = async (params: IParamProps, body: Omit<ICidade, 'id'>): Promise<number | Error> => {
    try {
        const result = await Knex(ETableNames.cidade).where({id: params.id}).update({
            nome: body.nome
        })
        console.log(result);

        if(result){
            return result;
        }
        return new Error(`id ${params.id} não existe`);
    } catch (error) {
        return new Error('Erro ao alterar registro');
    }
}