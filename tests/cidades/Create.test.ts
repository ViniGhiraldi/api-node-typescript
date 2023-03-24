import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";



describe('Cidades - Create', ()=>{
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

    it('Tenta criar registro sem token de acesso',async ()=>{
        const res = await testServer.post('/cidades').send({nome: "Tiete"});

        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body).toHaveProperty('errors.default');
    });

    it('Cria registro',async ()=>{
        const res = await testServer.post('/cidades').send({nome: "Tiete"}).set('Authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    });
    it('Não pode criar um registro com nome muito curto',async ()=>{
        const res = await testServer.post('/cidades').send({nome: "Ti"}).set('Authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome')
    });
});