import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - UpdateById',()=>{
    it('alteração bem sucedida', async () => {
        const res1 = await testServer.post('/cidades').send({nome:"Caxias do Sul"}).set('Authorization', 'Bearer teste.teste.teste');

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);


        const resAtualizada = await testServer.put(`/cidades/${res1.body}`).send({nome: 'Caxias'}).set('Authorization', 'Bearer teste.teste.teste');

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    })
    it('Tenta atualizar registro que não existe',async ()=>{
        const res1 = await testServer.put('/cidades/99999').send({nome: 'Caxias'}).set('Authorization', 'Bearer teste.teste.teste');

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
})