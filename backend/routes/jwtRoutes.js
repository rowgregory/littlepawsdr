import express from 'express';
import { checkJwtValidity} from '../controllers/jwtController.js';
const router = express.Router();

router.route('/check-validity').post(checkJwtValidity)


export default router;
