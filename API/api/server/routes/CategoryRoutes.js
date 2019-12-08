import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const router = Router();

router.get('/list/:page/:num', CategoryController.getAllCategorys);
router.post('/', CategoryController.addCategory);
router.get('/:id', CategoryController.getACategory);
router.put('/:id', CategoryController.updatedCategory);
router.delete('/:id', CategoryController.deleteCategory);
router.post('/lista/items', CategoryController.getListaCategory);
router.get('/lista/item/:name', CategoryController.getItemCategory);
router.get('/lista/items/:name', CategoryController.getListaCategory);
router.post('/search/items', CategoryController.getSearchCategory);
export default router;