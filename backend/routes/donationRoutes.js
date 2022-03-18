import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  createDonation,
  deleteDonation,
  getDonationById,
  getDonations,
  updateDonation,
} from "../controllers/donateController.js";

router.route("/").get(protect, admin, getDonations).post(createDonation);
router
  .route("/:id")
  .get(protect, admin, getDonationById)
  .delete(protect, admin, deleteDonation)
  .put(protect, admin, updateDonation);

export default router;
