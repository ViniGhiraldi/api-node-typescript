import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../services';

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                default: 'Não autenticado'
            }
        })
    }

    console.log(authorization, 'log from middleware');
    
    const [type, token] = authorization.split(' ');

    if(type !== 'Bearer'){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                default: 'Não autenticado'
            }
        })
    }

    console.log('aaaa')

    const jwtData = JWTService.verify(token);

    console.log(jwtData)

    if(jwtData === 'JWT_SECRET_NOT_FOUND'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: 'Erro ao verificar o token'
            }
        })
    }
    if(jwtData === 'INVALID_TOKEN'){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                default: 'Não autenticado'
            }
        })
    }

    console.log(jwtData);
    req.headers.idUsuario = jwtData.uid.toString();

    return next();
}