import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"

export const deleteById = async (id: number) => {
    try {
        const result = await Knex(ETableNames.pessoa).where('id', '=', id).del();

        if(result){
            return result;
        }
        return new Error(`Registro de id ${id} não existe`);
    } catch (error) {
        console.log(error);
        return new Error('Erro ao deletar registro');
    }
}