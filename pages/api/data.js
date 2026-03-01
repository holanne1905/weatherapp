import config from "../../config/config.json";

export default async function handler(req, res) {
  try {
    const { city, country, latitude, longitude, timezone } = config;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=apparent_temperature,relativehumidity_2m&timezone=${timezone}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.current_weather) {
      return res.status(500).json({ message: "Impossible de récupérer les données météo" });
    }

    const weatherData = {
      city,
      country,
      temperature: data.current_weather.temperature,
      feelsLike: data.hourly.apparent_temperature[0],
      humidity: data.hourly.relativehumidity_2m[0],
      weathercode: data.current_weather.weathercode,
      time: data.current_weather.time
    };

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Erreur API météo :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}