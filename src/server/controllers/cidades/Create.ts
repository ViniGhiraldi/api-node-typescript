import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";


interface ICidade {
    nome: string;
}

interface IFilter{
    filter?: string;
    limit: number;
}


export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        nome: yup.string().required().min(3),
    })),
    query: getSchema<IFilter>(yup.object().shape({
        filter: yup.string().min(3),
        limit: yup.number().required()
    }))
}));



export const create = async (req:Request<{}, {}, ICidade>, res:Response) =>{
    console.log(req.body)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
}