import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - Create', ()=>{
    let cidadeId: number| undefined = undefined;
    let token: string = '';
    beforeAll(async()=>{    
        const createdUser = await testServer.post('/cadastrar').send({
            nome: 'teste',
            email: 'teste@email.com',
            senha: '123456'
        })
        expect(createdUser.statusCode).toEqual(StatusCodes.CREATED);

        const user = await testServer.post('/entrar').send({
            email: 'teste@email.com',
            senha: '123456'
        })
        expect(user.statusCode).toEqual(StatusCodes.OK);

        token = `Bearer ${user.body.accessToken}`;
            
        const resCidade = await testServer.post('/cidades').send({nome: 'teste'}).set('Authorization', token);
        cidadeId = resCidade.body;
    })

    it('Criar registro', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'vinicius',
            sobrenome: 'correia',
            email: 'vini@email.com',
            cidadeId
        }).set('Authorization', token)

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    });
    it('Criar registro 2', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'vinicius',
            sobrenome: 'correia',
            email: 'vini2@email.com',
            cidadeId
        }).set('Authorization', token)

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    });
    it('Tenta criar registro com nome muito curto',async ()=>{
        const res = await testServer.post('/pessoas').send({
            nome: 'Ti',
            email: 'ti@email.com',
            cidadeId
        }).set('Authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome')
    });
    it('Tenta criar registro com email duplicado',async ()=>{
        const res = await testServer.post('/pessoas').send({
            nome: 'pedro',
            email: 'pedro@email.com',
            cidadeId
        }).set('Authorization', token);
        expect(res.statusCode).toEqual(StatusCodes.CREATED);

        const resDuplicada = await testServer.post('/pessoas').send({
            nome: 'pedrinho',
            email: 'pedro@email.com',
            cidadeId
        }).set('Authorization', token);

        expect(resDuplicada.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resDuplicada.body).toHaveProperty('errors.default');
    });
    it('Tenta criar registro sem nome', async () => {
        const res = await testServer.post('/pessoas').send({
            sobrenome: 'correia',
            email: 'correia@email.com',
            cidadeId
        }).set('Authorization', token)

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    });
    it('Tenta criar registro sem email', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'marcelo',
            sobrenome: 'correia',
            cidadeId
        }).set('Authorization', token)

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.email');
    });
    it('Tenta criar registro com email inválido', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'marcelo',
            sobrenome: 'correia',
            email: 'teste',
            cidadeId
        }).set('Authorization', token)

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.email');
    });
    it('Tenta criar registro sem cidadeId', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'marcelo',
            sobrenome: 'correia',
            email: 'marcelo@email.com'
        }).set('Authorization', token)

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.cidadeId');
    });
    it('Tenta criar registro com cidadeId em string', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'marcelo',
            sobrenome: 'correia',
            email: 'marcelo@email.com',
            cidadeId: 'teste'
        }).set('Authorization', token)

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.cidadeId');
    });
    it('Tenta criar registro com cidadeId inválido', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'marcelo',
            sobrenome: 'correia',
            email: 'marcelo@email.com',
            cidadeId: 99999
        }).set('Authorization', token)

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
    it('Tenta criar registro sem nenhuma propriedade', async () => {
        const res = await testServer.post('/pessoas').send({}).set('Authorization', token)

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
        expect(res.body).toHaveProperty('errors.body.email');
        expect(res.body).toHaveProperty('errors.body.cidadeId');
    });
})