import { ICidade } from './../../models/Cidade';
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IQueryProps } from "../../models";

export const getAll = async (query: IQueryProps): Promise<ICidade[] | Error> => {
    try{
        const result = await Knex.from(ETableNames.cidade).select('*')
        console.log(result)
        
        if(result.length !== 0){
            return result;
        }
        return new Error('Não existem registros nessa especificação');
    } catch (error) {
        return new Error('Erro ao pegar registro');
    }
}