import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - GetById',()=>{
    let cidadeId: number| undefined = undefined;
    beforeAll(async()=>{
        const resCidade = await testServer.post('/cidades').send({nome: 'teste'}).set('Authorization', 'Bearer teste.teste.teste');
        cidadeId = resCidade.body;
    })

    it('busca registro por id',async ()=>{
        const res = await testServer.post('/pessoas').send({
            nome: 'vinicius',
            sobrenome: 'correia',
            email: 'vini@email.com',
            cidadeId
        }).set('Authorization', 'Bearer teste.teste.teste');

        expect(res.statusCode).toEqual(StatusCodes.CREATED);


        const resBuscada = await testServer.get(`/pessoas/${res.body}`).set('Authorization', 'Bearer teste.teste.teste');

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('nome' && 'sobrenome' && 'email' && 'cidadeId');
    });
    it('busca registros que não existe',async ()=>{
        const res = await testServer.get('/pessoas/99999').set('Authorization', 'Bearer teste.teste.teste');

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
})