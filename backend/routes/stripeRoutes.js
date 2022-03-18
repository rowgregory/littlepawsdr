import express from "express";
const router = express.Router();
import { stripeAccount } from "../controllers/stripeController.js";

router.route("/").post(stripeAccount);

export default router;
