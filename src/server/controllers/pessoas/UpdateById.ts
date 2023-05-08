import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { IPessoa } from "../../database/models";
import { PessoasProvider } from '../../database/providers/pessoas';
import { validation } from "../../shared/middleware";

interface IParamProps{
    id?: number;
}

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const updateByIdValidation = validation((getSchema)=>({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        sobrenome: yup.string(),
        email: yup.string().email().required(),
        cidadeId: yup.number().integer().required().moreThan(0)
    }))
}))

export const updateById = async (req:Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if(!req.params.id) return;

    const result = await PessoasProvider.updateById(req.params.id, req.body)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.NO_CONTENT).send();
}