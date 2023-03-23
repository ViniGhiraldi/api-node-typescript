import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - GetById',()=>{
    it('busca registro por id',async ()=>{
        const res = await testServer.post('/cidades').send({nome:"Caxias do Sul"}).set('Authorization', 'Bearer teste.teste.teste');

        expect(res.statusCode).toEqual(StatusCodes.CREATED);


        const resBuscada = await testServer.get(`/cidades/${res.body}`).set('Authorization', 'Bearer teste.teste.teste');

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('nome');
    });
    it('busca registros que não existe',async ()=>{
        const res = await testServer.get('/cidades/99999').set('Authorization', 'Bearer teste.teste.teste');

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
})