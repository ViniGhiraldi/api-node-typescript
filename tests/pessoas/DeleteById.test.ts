import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - DeleteById', ()=>{
    let cidadeId: number| undefined = undefined;
    beforeAll(async()=>{
        const resCidade = await testServer.post('/cidades').send({nome: 'teste'});
        cidadeId = resCidade.body;
    })

    it('Deleta registro',async ()=>{
        const res = await testServer.post('/pessoas').send({
            nome: 'vinicius',
            sobrenome: 'correia',
            email: 'vini@email.com',
            cidadeId
        });

        expect(res.statusCode).toEqual(StatusCodes.CREATED);


        const resApagada = await testServer.delete(`/pessoas/${res.body}`);

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta apagar um registro que não existe',async ()=>{
        const res = await testServer.delete('/pessoas/99999');

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    })
})