import { Router } from 'express';
import SaleController from '../controllers/SaleController';

const router = Router();

router.get('/list/:page/:num', SaleController.getAllSales);
router.post('/', SaleController.addSale);
router.post('/mesa/', SaleController.addSalem);
router.get('/:id', SaleController.getASale);
router.put('/:id', SaleController.updatedSale);
router.delete('/:id', SaleController.deleteSale);
router.get('/lista/items/:name', SaleController.getListaSale);
router.get('/mesa/lista/:id', SaleController.getSaleMesa);

export default router;