import express from 'express';
const router = express.Router();
import { registerGuestUser } from '../controllers/guestUserController.js';

router.route('/').post(registerGuestUser);

export default router;
