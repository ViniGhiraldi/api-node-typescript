import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

 

describe('Pessoas - GetAll', ()=>{
    let cidadeId: number| undefined = undefined;
    beforeAll(async()=>{
        const resCidade = await testServer.post('/cidades').send({nome: 'teste'}).set('Authorization', 'Bearer teste.teste.teste');
        cidadeId = resCidade.body;
    })

    it('busca registros sem query',async ()=>{
        const res = await testServer.post('/pessoas').send({
            nome: 'vinicius',
            sobrenome: 'correia',
            email: 'vini@email.com',
            cidadeId
        }).set('Authorization', 'Bearer teste.teste.teste');

        expect(res.statusCode).toEqual(StatusCodes.CREATED);


        const resBuscada = await testServer.get('/pessoas').set('Authorization', 'Bearer teste.teste.teste');

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});