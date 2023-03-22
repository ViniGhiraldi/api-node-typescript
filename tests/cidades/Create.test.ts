import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";



describe('Cidades - Create', ()=>{
    it('Cria registro',async ()=>{
        const res = await testServer.post('/cidades').send({nome: "Tiete"});

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    });
    it('Não pode criar um registro com nome muito curto',async ()=>{
        const res = await testServer.post('/cidades').send({nome: "Ti"});

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome')
    });
});