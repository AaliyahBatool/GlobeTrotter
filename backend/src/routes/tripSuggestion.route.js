import express from "express";
import { getTopCities } from "../controllers/tripSuggestion.controller.js";

const router = express.Router();

router.get("/cities", getTopCities);

export default router;