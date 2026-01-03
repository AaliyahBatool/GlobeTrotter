import axios from "axios";

export const getCitiesByState = async (req, res) => {
  try {
    const { state, country = "India" } = req.query;

    if (!state) {
      return res.status(400).json({ message: "state is required" });
    }

    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/search",
      {
        params: {
          text: state,
          type: "city",
          state,
          country,
          limit: 8,
          format: "json",
          apiKey: process.env.GEOAPIFY_API_KEY
        }
      }
    );

    const cities = response.data.results.map((c) => ({
      city: c.city || c.name,
      state: c.state,
      country: c.country,
      formatted: c.formatted
    }));

    res.json({ cities });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: "Failed to fetch cities" });
  }
};

export const searchCities = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "query is required" });
    }

    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/autocomplete",
      {
        params: {
          text: query,
          type: "city",
          limit: 10,
          apiKey: process.env.GEOAPIFY_API_KEY
        }
      }
    );

    const cities = response.data.features.map((f) => ({
      city: f.properties.city || f.properties.name,
      state: f.properties.state || null,
      country: f.properties.country,
      formatted: f.properties.formatted
    }));

    res.json({ cities });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "City search failed" });
  }
};
