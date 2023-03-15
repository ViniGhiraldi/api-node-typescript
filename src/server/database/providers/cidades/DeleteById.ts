import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IParamProps } from "../../models";

export const deleteById = async (params: IParamProps): Promise<number | Error> => {
    try {
        const result = await Knex(ETableNames.cidade).del().where({id: params.id});

        if(result === 1){
            return result;
        }else if(result === 0){
            return new Error('Registro não existe');
        }

        return new Error('Erro ao deletar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao deletar o registro');
    }
}