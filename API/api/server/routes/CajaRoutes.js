import { Router } from 'express';
import CajaController from '../controllers/CajaController';

const router = Router();

router.get('/list/:page/:num', CajaController.getAllCajas);
router.post('/', CajaController.addCaja);
router.get('/:id', CajaController.getACaja);
router.get('/single/:id', CajaController.getSingleCaja);
router.get('/user/:id', CajaController.getUserCaja);
router.put('/:id', CajaController.updatedCaja);
router.delete('/:id', CajaController.deleteCaja);
router.put('/item/:id', CajaController.insertItemCaja);
router.put('/items/:id', CajaController.deleteItemCaja);
router.post('/search/items', CajaController.getSearchCaja);
export default router;