import { Router } from "express";
import { CidadesController, PessoasController, UsuariosController } from "../controllers";
import { ensureAuthenticated } from "../shared/middleware";

const router = Router();

//rotas para cidades
router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.post('/cidades', ensureAuthenticated, CidadesController.createValidation, CidadesController.create);
router.put('/cidades/:id', ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById);

//rotas para pessoas
router.get('/pessoas', ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);
router.get('/pessoas/:id', ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);
router.post('/pessoas', ensureAuthenticated, PessoasController.createValidation, PessoasController.create);
router.put('/pessoas/:id', ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);

//rotas para usuarios
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp);
router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn);


export {router}