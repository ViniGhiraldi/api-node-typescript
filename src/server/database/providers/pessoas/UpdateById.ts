import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const updateById = async (id:number, pessoa:Omit<IPessoa, 'id'>): Promise<number | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa).where('id','=',id).update({
            nome: pessoa.nome,
            sobrenome: pessoa.sobrenome,
            email: pessoa.email,
            cidadeId: pessoa.cidadeId
        });

        if(result) return result;

        return new Error(`id ${id} não existe`);
    } catch (error) {
        console.log(error);
        return new Error('Erro ao alterar registro');
    }
}