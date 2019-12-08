import { Router } from 'express';
import MessageController from '../controllers/MessageController';

const router = Router();

router.get('/list/:page/:user/:tipo', MessageController.getAllMessages);
router.post('/', MessageController.addMessage);
router.get('/:id', MessageController.getAMessage);
router.put('/:id', MessageController.updatedMessage);
router.delete('/:id', MessageController.deleteMessage);

export default router;