import { Router } from 'express';
import { getPublicAppData } from '../controllers/public/get-public-app-data/route.js';

const router = Router();

router.get('/app-data', getPublicAppData);

export default router;
