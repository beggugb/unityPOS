import { Router } from 'express';
import ClientController from '../controllers/ClientController';

const router = Router();

router.get('/list/:page/:num', ClientController.getAllClients);
router.post('/', ClientController.addClient);
router.get('/:id', ClientController.getAClient);
router.put('/:id', ClientController.updatedClient);
router.delete('/:id', ClientController.deleteClient);
/*router.post('/lista/items', ClientController.getListaClient);*/
router.get('/lista/items/:name', ClientController.getListaClient);
export default router;