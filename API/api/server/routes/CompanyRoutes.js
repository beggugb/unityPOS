import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const router = Router();

router.get('/', CompanyController.getAllCompanys);
router.post('/', CompanyController.addCompany);
router.get('/:id', CompanyController.getACompany);
router.put('/:id', CompanyController.updatedCompany);
router.delete('/:id', CompanyController.deleteCompany);

export default router;