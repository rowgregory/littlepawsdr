import express from 'express';
import { createClick } from '../controllers/logoClickController.js';
const router = express.Router();

router.route('/').post(createClick);

export default router;
