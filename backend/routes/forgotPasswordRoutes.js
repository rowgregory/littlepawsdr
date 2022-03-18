import express from "express";
import {
  resetPassword,
  verifyToken,
  updatePassword,
} from "../controllers/forgotPasswordController.js";
const router = express.Router();

router.route("/").post(resetPassword);
router.route("/verifytoken").post(verifyToken);
router.route("/updatepassword").put(updatePassword);

export default router;
