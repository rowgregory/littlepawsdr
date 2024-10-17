import express from 'express';
import getMerchAndEcards from '../controllers/merch-and-ecards/get/getMerchAndEcards.js';
const router = express.Router();

router.route('/').get(getMerchAndEcards);

export default router;