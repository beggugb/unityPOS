import { Router } from 'express';
import MarkController from '../controllers/MarkController';

const router = Router();

router.get('/list/:page/:num', MarkController.getAllMarks);
router.post('/', MarkController.addMark);
router.get('/:id', MarkController.getAMark);
router.put('/:id', MarkController.updatedMark);
router.delete('/:id', MarkController.deleteMark);
router.get('/lista/items/:name', MarkController.getListaMark);

export default router;