import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { ICidade, IParamProps } from "../../database/models";
import { CidadesProvider } from "../../database/providers/cidades";
import { validation } from "../../shared/middleware";


interface IBodyProps extends Omit<ICidade, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3)
    }))
}));



export const updateById = async (req:Request<IParamProps, {}, IBodyProps>, res:Response) =>{
    const result = await CidadesProvider.updateById(req.params, req.body)
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
}