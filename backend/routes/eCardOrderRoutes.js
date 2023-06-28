import express from 'express';
const router = express.Router();

import { getECardOrderById } from '../controllers/eCardOrderController.js';

router.route('/:id').get(getECardOrderById);

export default router;
