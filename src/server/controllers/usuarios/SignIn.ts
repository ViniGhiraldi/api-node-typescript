import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { IUsuario } from '../../database/models';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { validation } from "../../shared/middleware";
import { JWTService, PasswordCrypto } from '../../shared/services';

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> {}

export const signInValidation = validation((getSchema)=>({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().required().min(5),
        senha: yup.string().required().min(6)
    }))
}))

export const signIn = async (req:Request<{},{},IBodyProps>, res:Response) => {
    if(!req.body.email || !req.body.senha) return;
    
    const usuario = await UsuariosProvider.getByEmail(req.body.email);

    if(usuario instanceof Error){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                default: 'Email ou senha são inválidos'
            }
        })
    }

    const passwordValidation = await PasswordCrypto.verifyPassword(req.body.senha, usuario.senha);

    if(passwordValidation){
        const accessToken = JWTService.sign({uid: usuario.id});
        if(accessToken === 'JWT_SECRET_NOT_FOUND'){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Erro ao gerar o token de acesso'
                }
            })
        }

        return res.status(StatusCodes.OK).json({ accessToken });
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({
        errors:{
            default: 'Email ou senha são inválidos'
        }
    });
}