import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - UpdateById',()=>{
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
    it('alteração bem sucedida', async () => {
        const res1 = await testServer.post('/cidades').send({nome:"Caxias do Sul"}).set('Authorization', token);

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);


        const resAtualizada = await testServer.put(`/cidades/${res1.body}`).send({nome: 'Caxias'}).set('Authorization', token);

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    })
    it('Tenta atualizar registro que não existe',async ()=>{
        const res1 = await testServer.put('/cidades/99999').send({nome: 'Caxias'}).set('Authorization', token);

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
})