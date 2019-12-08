import { Router } from 'express';
import ModuleController from '../controllers/ModuleController';

const router = Router();

router.get('/', ModuleController.getAllModules);
router.post('/', ModuleController.addModule);
router.get('/:id', ModuleController.getAModule);
router.put('/:id', ModuleController.updatedModule);
router.delete('/:id', ModuleController.deleteModule);

export default router;