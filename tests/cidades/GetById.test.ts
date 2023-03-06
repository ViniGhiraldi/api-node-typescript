import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - GetById',()=>{
    it('busca registro por id',async ()=>{
        const res1 = await testServer.post('/cidades').send({nome:"Caxias do Sul"});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);


        const resBuscada = await testServer.get(`/cidades/${res1.body}`);

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('nome');
    });
    it('busca registros sem query',async ()=>{
        const res1 = await testServer.get('/cidades/99999');

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
})