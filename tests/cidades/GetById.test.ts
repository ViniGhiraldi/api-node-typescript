import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - GetById',()=>{
    let token: string = '';
    beforeAll(async ()=>{
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
    });
    it('busca registro por id',async ()=>{
        const res = await testServer.post('/cidades').send({nome:"Caxias do Sul"}).set('Authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.CREATED);


        const resBuscada = await testServer.get(`/cidades/${res.body}`).set('Authorization', token);

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('nome');
    });
    it('busca registros que não existe',async ()=>{
        const res = await testServer.get('/cidades/99999').set('Authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
})