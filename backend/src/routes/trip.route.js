import express from "express";
import {
  createTrip,
  getMyTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  getPublicTrips
} from "../controllers/trip.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/public", getPublicTrips);

router.use(protect);

router.post("/", createTrip);
router.get("/", getMyTrips);
router.get("/:id", getTripById);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

export default router;
