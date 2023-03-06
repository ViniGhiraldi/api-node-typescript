import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";



describe('Cidades - DeleteById', ()=>{
    it('Deleta registro',async ()=>{
        const res1 = await testServer.delete('/cidades/1');

        expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Não pode deletar um registro menor que 0',async ()=>{
        const res1 = await testServer.delete('/cidades/0');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id')
    })
});