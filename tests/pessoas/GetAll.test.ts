import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

 

describe('Pessoas - GetAll', ()=>{
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

    it('busca registros sem query',async ()=>{
        const res = await testServer.post('/pessoas').send({
            nome: 'vinicius',
            sobrenome: 'correia',
            email: 'vini@email.com',
            cidadeId
        }).set('Authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.CREATED);


        const resBuscada = await testServer.get('/pessoas').set('Authorization', token);

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});