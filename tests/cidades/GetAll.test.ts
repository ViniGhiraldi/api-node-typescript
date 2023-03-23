import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

 

describe('Cidades - GetAll', ()=>{
    it('busca registros sem query',async ()=>{
        const res = await testServer.post('/cidades').send({nome:"Caxias do Sul"}).set('Authorization', 'Bearer teste.teste.teste');

        expect(res.statusCode).toEqual(StatusCodes.CREATED);


        const resBuscada = await testServer.get('/cidades').set('Authorization', 'Bearer teste.teste.teste');

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});