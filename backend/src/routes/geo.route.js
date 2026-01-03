import express from "express";
import { searchCities } from "../controllers/geo.controller.js";
import { getCitiesByState } from "../controllers/geo.controller.js";

const router = express.Router();

router.get("/cities", searchCities);
router.get("/states/cities", getCitiesByState);

export default router;
