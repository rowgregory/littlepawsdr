import express from 'express';
const router = express.Router();
import { createClick } from '../controllers/logoClickController.js';

router.route('/').post(createClick);

export default router;
