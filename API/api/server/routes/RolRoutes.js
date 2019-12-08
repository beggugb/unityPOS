import { Router } from 'express';
import RolController from '../controllers/RolController';

const router = Router();

router.get('/', RolController.getAllRols);
router.post('/', RolController.addRol);
router.get('/:id', RolController.getARol);
router.put('/:id', RolController.updatedRol);
router.delete('/:id', RolController.deleteRol);

export default router;