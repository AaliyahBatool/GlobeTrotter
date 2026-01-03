import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/auth.route.js";
import tripRoutes from "./src/routes/trip.route.js";
import geoRoutes from "./src/routes/geo.route.js";
import tripSuggestionRoutes from "./src/routes/tripSuggestion.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check
app.get("/", (req, res) => {
  res.send("backend is running");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/geoapify", geoRoutes);
app.use("/api/trips/suggestions", tripSuggestionRoutes);

// global error fallback (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
