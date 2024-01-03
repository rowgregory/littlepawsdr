import express from 'express';
import { checkJwtValidity, checkJwtValidityAdoptionFee} from '../controllers/jwtController.js';
const router = express.Router();

router.route('/check-validity').post(checkJwtValidity)
router.route('/check-validity/adoption-fee').post(checkJwtValidityAdoptionFee)


export default router;
