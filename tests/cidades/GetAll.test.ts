import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

 

describe('Cidades - GetAll', ()=>{
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
    it('busca registros sem query',async ()=>{
        const res = await testServer.post('/cidades').send({nome:"Caxias do Sul"}).set('Authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.CREATED);


        const resBuscada = await testServer.get('/cidades').set('Authorization', token);

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});