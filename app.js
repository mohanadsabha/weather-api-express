const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/weather", async (req, res) => {
  const city = req.query.city || "Gaza";
  const apiKey = process.env.WEATHER_API_KEY;
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    res.status(200).json({ status: "success", data: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
