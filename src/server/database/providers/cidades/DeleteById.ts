import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"

export const deleteById = async (id: number): Promise<number | Error> => {
    try {
        //const result = await Knex(ETableNames.cidade).where('id','=',id).del();
        const result = await Knex(ETableNames.cidade).del().where({id: id});

        if(result){
            return result;
        }
        return new Error(`Registro de id ${id} não existe`);
    } catch (error) {
        console.log(error);
        return new Error('Erro ao deletar o registro');
    }
}