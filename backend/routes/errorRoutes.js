import express from 'express';
const router = express.Router();
import { createError } from '../controllers/errorController.js';

router.route('/').post(createError);

export default router;
