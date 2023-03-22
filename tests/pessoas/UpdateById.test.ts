import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - UpdateById',()=>{
    let cidadeId: number| undefined = undefined;
    beforeAll(async()=>{
        const resCidade = await testServer.post('/cidades').send({nome: 'teste'});
        cidadeId = resCidade.body;
    })

    it('alteração bem sucedida', async () => {
        const res = await testServer.post('/pessoas').send({
            nome: 'vinicius',
            sobrenome: 'correia',
            email: 'vini@email.com',
            cidadeId
        });

        expect(res.statusCode).toEqual(StatusCodes.CREATED);


        const resAtualizada = await testServer.put(`/pessoas/${res.body}`).send({
            nome: 'pedro',
            sobrenome: 'guilherme',
            email: 'vini@email.com',
            cidadeId
        });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    })
    it('Tenta atualizar registro que não existe',async ()=>{
        const res = await testServer.put('/cidades/99999').send({
            nome: 'joão',
            sobrenome: 'correia',
            email: 'vini@email.com',
            cidadeId
        });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
    it('Tenta atualizar registro alterando o email para um já vinculado a outro registro',async ()=>{
        const res1 = await testServer.post('/pessoas').send({
            nome: 'joão',
            sobrenome: 'marcelo',
            email: 'joao@email.com',
            cidadeId
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post('/pessoas').send({
            nome: 'miguel',
            email: 'miguel@email.com',
            cidadeId
        });

        expect(res2.statusCode).toEqual(StatusCodes.CREATED);

        const resInvalida = await testServer.put(`/pessoas/${res1.body}`).send({
            nome: 'joão',
            sobrenome: 'marcelo',
            email: 'miguel@email.com',
            cidadeId
        });

        expect(resInvalida.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resInvalida.body).toHaveProperty('errors.default');
    });
})