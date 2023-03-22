import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { IUsuario } from '../../database/models';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { validation } from "../../shared/middleware";

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> {}

export const signInValidation = validation((getSchema)=>({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().required().min(5),
        senha: yup.string().required().min(6)
    }))
}))

export const signIn = async (req:Request<{},{},IBodyProps>, res:Response) => {
    if(!req.body.email || !req.body.senha) return;
    
    const result = await UsuariosProvider.getByEmail(req.body.email);

    if(result instanceof Error){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                default: 'Email ou senha são inválidos'
            }
        })
    }

    if(result.senha === req.body.senha){
        return res.status(StatusCodes.OK).json({ accessToken: 'teste.teste.teste' });
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({
        errors:{
            default: 'Email ou senha são inválidos'
        }
    });
}