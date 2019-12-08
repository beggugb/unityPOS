import { Router } from 'express';
import TypeController from '../controllers/TypeController';

const router = Router();

router.get('/list/:page/:num', TypeController.getAllTypes);
router.post('/', TypeController.addType);
router.get('/:id', TypeController.getAType);
router.put('/:id', TypeController.updatedType);
router.delete('/:id', TypeController.deleteType);

router.get('/lista/items/:name', TypeController.getListaType);
export default router;