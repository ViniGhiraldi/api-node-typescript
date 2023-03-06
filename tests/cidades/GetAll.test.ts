import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

 

describe('Cidades - GetAll', ()=>{
    it('busca registros sem query',async ()=>{
        const res1 = await testServer.get('/cidades');

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res1.body).toEqual('object');
    });
    it('busca registros com todas as querys',async ()=>{
        const res1 = await testServer.get('/cidades?page=1&limit=1&filter=teste');

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res1.body).toEqual('object');
    })
    it('não pode as querys page e limit com valor 0 ou abaixo',async ()=>{
        const res1 = await testServer.get('/cidades?page=0&limit=0');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        expect(res1.body).toHaveProperty('errors.query.limit');
    })
    it('não pode as querys page e limit com string',async ()=>{
        const res1 = await testServer.get('/cidades?page=teste&limit=teste');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        expect(res1.body).toHaveProperty('errors.query.limit');
    })
});