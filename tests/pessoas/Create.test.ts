import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - Create', ()=>{
    let cidadeId: number| undefined = undefined;
    beforeAll(async()=>{
        const resCidade = await testServer.post('/cidades').send({nome: 'teste'});
        cidadeId = resCidade.body;
    })

    it('Criar registro', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'vinicius',
            sobrenome: 'correia',
            email: 'vini@email.com',
            cidadeId
        })

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    });
    it('Criar registro 2', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'vinicius',
            sobrenome: 'correia',
            email: 'vini2@email.com',
            cidadeId
        })

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    });
    it('Tenta criar registro com nome muito curto',async ()=>{
        const res = await testServer.post('/pessoas').send({
            nome: 'Ti',
            email: 'ti@email.com',
            cidadeId
        });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome')
    });
    it('Tenta criar registro com email duplicado',async ()=>{
        const res = await testServer.post('/pessoas').send({
            nome: 'pedro',
            email: 'pedro@email.com',
            cidadeId
        });
        expect(res.statusCode).toEqual(StatusCodes.CREATED);

        const resDuplicada = await testServer.post('/pessoas').send({
            nome: 'pedrinho',
            email: 'pedro@email.com',
            cidadeId
        });

        expect(resDuplicada.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resDuplicada.body).toHaveProperty('errors.default');
    });
    it('Tenta criar registro sem nome', async () => {
        const res = await testServer.post('/pessoas').send({
            sobrenome: 'correia',
            email: 'correia@email.com',
            cidadeId
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    });
    it('Tenta criar registro sem email', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'marcelo',
            sobrenome: 'correia',
            cidadeId
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.email');
    });
    it('Tenta criar registro com email inválido', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'marcelo',
            sobrenome: 'correia',
            email: 'teste',
            cidadeId
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.email');
    });
    it('Tenta criar registro sem cidadeId', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'marcelo',
            sobrenome: 'correia',
            email: 'marcelo@email.com'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.cidadeId');
    });
    it('Tenta criar registro com cidadeId em string', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'marcelo',
            sobrenome: 'correia',
            email: 'marcelo@email.com',
            cidadeId: 'teste'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.cidadeId');
    });
    it('Tenta criar registro com cidadeId inválido', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'marcelo',
            sobrenome: 'correia',
            email: 'marcelo@email.com',
            cidadeId: 99999
        })

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
    it('Tenta criar registro sem nenhuma propriedade', async () => {
        const res = await testServer.post('/pessoas').send({})

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
        expect(res.body).toHaveProperty('errors.body.email');
        expect(res.body).toHaveProperty('errors.body.cidadeId');
    });
})