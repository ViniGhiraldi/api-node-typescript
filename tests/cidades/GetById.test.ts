import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - GetById',()=>{
    it('busca registro por id',async ()=>{
        const req1 = await testServer.get('/cidades/1')

        expect(req1.statusCode).toEqual(StatusCodes.OK);
        expect(typeof req1.body).toEqual('object');
    })
    it('id não pode ser igual ou menor que 0',async ()=>{
        const req1 = await testServer.get('/cidades/0')

        expect(req1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(req1.body).toHaveProperty('errors.params.id');
    })
    it('id não pode ser string',async ()=>{
        const req1 = await testServer.get('/cidades/teste')

        expect(req1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(req1.body).toHaveProperty('errors.params.id');
    })
    it('id não pode ser numero decimal',async ()=>{
        const req1 = await testServer.get('/cidades/1.5')

        expect(req1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(req1.body).toHaveProperty('errors.params.id');
    })
})