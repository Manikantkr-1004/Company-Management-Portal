import { Router } from 'express';
import { createClientCompany, getClientCompany } from '../controllers/clientCompanyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const clientCompanyRouter = Router();

clientCompanyRouter.post('/', protect, authorizeRoles('admin'), createClientCompany);
clientCompanyRouter.get('/', protect, authorizeRoles('admin'), getClientCompany);

export default clientCompanyRouter;