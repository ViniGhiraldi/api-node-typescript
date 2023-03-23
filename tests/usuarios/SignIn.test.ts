import { StatusCodes } from 'http-status-codes';
import { testServer } from "../jest.setup";

describe('Usuários - SignIn',()=>{
    beforeAll(async()=>{
        const res1 = await testServer.post('/cadastrar').send({
            nome: 'Vinicius',
            email: 'vini@email.com',
            senha: '123456'
        })
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    })
    it('Login bem sucedido', async()=>{
        const res = await testServer.post('/entrar').send({
            email: 'vini@email.com',
            senha: '123456'
        })

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty('accessToken');
    });
    it('Tenta entrar sem email', async()=>{
        const res = await testServer.post('/entrar').send({
            senha: '123456'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.email');
    });
    it('Tenta entrar com email inexistente', async()=>{
        const res = await testServer.post('/entrar').send({
            email: 'pedro@email.com',
            senha: '123456'
        })

        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body).toHaveProperty('errors.default');
    });
    it('Tenta entrar sem senha', async()=>{
        const res = await testServer.post('/entrar').send({
            email: 'vini@email.com'
        })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.senha');
    });
    it('Tenta entrar com senha inválida', async()=>{
        const res = await testServer.post('/entrar').send({
            email: 'vini@email.com',
            senha: '1234567'
        })

        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body).toHaveProperty('errors.default');
    });
    it('Tenta entrar sem nenhuma propriedade', async()=>{
        const res = await testServer.post('/entrar').send({})

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.email' && 'errors.body.senha');
    });
})