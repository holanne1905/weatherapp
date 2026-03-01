import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

const weatherMap = {
  0: { text: "Clear sky", icon: "01d" },
  1: { text: "Mainly clear", icon: "02d" },
  2: { text: "Partly cloudy", icon: "03d" },
  3: { text: "Overcast", icon: "04d" },
  45: { text: "Fog", icon: "50d" },
  48: { text: "Depositing rime fog", icon: "50d" },
  51: { text: "Light drizzle", icon: "09d" },
  53: { text: "Moderate drizzle", icon: "09d" },
  55: { text: "Dense drizzle", icon: "09d" },
  61: { text: "Slight rain", icon: "10d" },
  63: { text: "Moderate rain", icon: "10d" },
  65: { text: "Heavy rain", icon: "10d" },
  80: { text: "Rain showers", icon: "09d" }
};

export const MainCard = ({ city, country, weatherData, unitSystem }) => {
  const { temperature, feelsLike, humidity, weathercode } = weatherData;
  const weatherInfo = weatherMap[weathercode] || { text: "Unknown", icon: "01d" };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>{city}, {country}</h1>
      <p className={styles.description}>{weatherInfo.text}</p>
      <Image
        width="100"
        height="100"
        src={`/icons/${weatherInfo.icon}.svg`}
        alt="weatherIcon"
        className={styles.weatherInfo}
      />
      <h1 className={styles.temperature}>
        {unitSystem === "metric" ? Math.round(temperature) : Math.round(ctoF(temperature))}°
        {unitSystem === "metric" ? "C" : "F"}
      </h1>
      <p className={styles.feelslike}>
        Feels like{" "}
        {unitSystem === "metric" ? Math.round(feelsLike) : Math.round(ctoF(feelsLike))}°
        {unitSystem === "metric" ? "C" : "F"}
      </p>
      
    </div>
  );
};