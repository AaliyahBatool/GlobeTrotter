import { topCitiesByState } from "../data/topCitiesbyState.js";

export const getTopCities = (req, res) => {
  const { state } = req.query;

  if (!state) {
    return res.status(400).json({ message: "state is required" });
  }

  const cities = topCitiesByState[state];

  if (!cities) {
    return res.json({ cities: [] });
  }

  res.json({
    state,
    cities: cities.map((city) => ({
      city,
      state
    }))
  });
};