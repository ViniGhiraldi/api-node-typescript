import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IPessoa } from "../../models"

export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.cidade)
        .where('id','=',pessoa.cidadeId)
        .count<[{count: number}]>('* as count');

        if(count === 0) return new Error('A cidade usada no cadastro não foi encontrada');

        const [{emailExists}] = await Knex(ETableNames.pessoa)
            .where('email', '=', pessoa.email)
            .count<[{emailExists: number}]>('* as emailExists')

        if(emailExists !== 0) return new Error('O email informado já está vinculado a outra pessoa');

        const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id');
        console.log(result+' log from Create.ts')
        
        if(typeof result === 'object'){
            return result.id;
        }else if(typeof result === 'number'){
            return result;
        }

        return new Error('erro ao cadastrar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro');
    }
}