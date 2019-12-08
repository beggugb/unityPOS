import { Router } from 'express';
import BranchController from '../controllers/BranchController';

const router = Router();

router.get('/', BranchController.getAllBranchs);
router.post('/', BranchController.addBranch);
router.get('/:id', BranchController.getABranch);
router.put('/:id', BranchController.updatedBranch);
router.delete('/:id', BranchController.deleteBranch);

export default router;