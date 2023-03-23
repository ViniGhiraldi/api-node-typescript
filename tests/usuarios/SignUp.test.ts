import { StatusCodes } from 'http-status-codes';
import { testServer } from "../jest.setup"

describe('Usuários - SignUp',()=>{
    it('Criar registro', async ()=>{
        const res = await testServer.post('/cadastrar').send({
            nome: 'Vinicius',
            email: 'vini@email.com',
            senha: '123456'
        })

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    });
    it('Criar registro 2', async ()=>{
        const res = await testServer.post('/cadastrar').send({
            nome: 'Miguel',
            email: 'miguel@email.com',
            senha: '123456'
        })

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    });
    it('Tenta criar registro com email duplicado',async()=>{
        const res1 = await testServer.post('/cadastrar').send({
            nome: 'Ronaldo',
            email: 'ronaldo@email.com',
            senha: '123456'
        })
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post('/cadastrar').send({
            nome: 'Ronaldinho',
            email: 'ronaldo@email.com',
            senha: '123456'
        })
        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default')
    })
    it('Tenta criar registro sem nome', async()=>{
        const res = await testServer.post('/cadastrar').send({
            email: 'vini2@email.com',
            senha: '123456'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    });
    it('Tenta criar registro com nome muito curto', async()=>{
        const res = await testServer.post('/cadastrar').send({
            nome: "vi",
            email: 'vini3@email.com',
            senha: '123456'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    });
    it('Tenta criar registro sem email', async()=>{
        const res = await testServer.post('/cadastrar').send({
            nome: 'Vinicius',
            senha: '123456'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.email');
    });
    it('Tenta criar registro com email inválido', async()=>{
        const res = await testServer.post('/cadastrar').send({
            nome: 'vinicius',
            email: 'vini email.com',
            senha: '123456'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.email');
    });
    it('Tenta criar registro sem senha', async()=>{
        const res = await testServer.post('/cadastrar').send({
            nome: 'Vinicius',
            email: 'vini4@email.com'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.senha');
    });
    it('Tenta criar registro com senha inválida', async()=>{
        const res = await testServer.post('/cadastrar').send({
            nome: 'Vinicius',
            email: 'vini5@email.com',
            senha: '12345'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.senha');
    });
    it('Tenta criar registro sem nenhuma propriedade', async()=>{
        const res = await testServer.post('/cadastrar').send({})

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome' && 'errors.body.email' && 'errors.body.senha');
    });
})