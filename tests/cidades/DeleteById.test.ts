import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";



describe('Cidades - DeleteById', ()=>{
    it('Deleta registro',async ()=>{
        const res = await testServer.post('/cidades').send({nome:"Caxias do Sul"});

        expect(res.statusCode).toEqual(StatusCodes.CREATED);


        const resApagada = await testServer.delete(`/cidades/${res.body}`);

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta apagar um registro que não existe',async ()=>{
        const res = await testServer.delete('/cidades/99999');

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    })
});