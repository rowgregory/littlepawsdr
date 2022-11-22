import express from 'express';
import { verifyRecaptcha } from '../controllers/recaptchaController.js';
const router = express.Router();

router.route('/').post(verifyRecaptcha);

export default router;
