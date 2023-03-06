import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - UpdateById',()=>{
    it('alteração bem sucedida', async () => {
        const req1 = await testServer.put('/cidades/1').send({nome: 'teste'})

        expect(req1.statusCode).toEqual(StatusCodes.OK);
        expect(typeof req1.body).toEqual('number');
    })
    it('Não pode faltar o body.nome na requisição',async ()=>{
        const res1 = await testServer.put('/cidades/1')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome')
    })
    it('id não pode ser igual ou menor que 0',async ()=>{
        const req1 = await testServer.put('/cidades/0').send({nome: 'teste'})

        expect(req1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(req1.body).toHaveProperty('errors.params.id');
    })
    it('id não pode ser string',async ()=>{
        const req1 = await testServer.put('/cidades/teste').send({nome: 'teste'})

        expect(req1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(req1.body).toHaveProperty('errors.params.id');
    })
    it('id não pode ser numero decimal',async ()=>{
        const req1 = await testServer.put('/cidades/1.5').send({nome: 'teste'})

        expect(req1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(req1.body).toHaveProperty('errors.params.id');
    })
    it('Não pode alterar o nome de um registro para um muito curto',async ()=>{
        const res1 = await testServer.put('/cidades/1').send({nome: "Ti"});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome')
    })
})