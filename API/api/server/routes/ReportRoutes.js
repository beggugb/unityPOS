import { Router } from 'express';
import ReportController from '../controllers/ReportController';

const router = Router();

router.post('/searcharticulos', ReportController.articulos);
router.post('/searchventas', ReportController.ventas);
router.post('/searchcajas', ReportController.cajas);

export default router;