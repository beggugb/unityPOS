import { Router } from 'express';
import UserController from '../controllers/UserController';
import KeyToken from './keyToken'
const router = Router();

router.get('/list/:page',  KeyToken, UserController.getAllUsers);
router.get('/lista/:user',  KeyToken, UserController.getListaUsers);
router.post('/',  KeyToken, UserController.addUser);
router.get('/:id',  KeyToken, UserController.getAUser);
router.put('/:id',  KeyToken, UserController.updatedUser);
router.delete('/:id',  KeyToken, UserController.deleteUser);
router.post('/login/user',UserController.loginUser);

export default router;