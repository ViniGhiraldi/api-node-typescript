import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - DeleteById', ()=>{
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

    it('Deleta registro',async ()=>{
        const res = await testServer.post('/pessoas').send({
            nome: 'vinicius',
            sobrenome: 'correia',
            email: 'vini@email.com',
            cidadeId
        }).set('Authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.CREATED);


        const resApagada = await testServer.delete(`/pessoas/${res.body}`).set('Authorization', token);

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta apagar um registro que não existe',async ()=>{
        const res = await testServer.delete('/pessoas/99999').set('Authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    })
})