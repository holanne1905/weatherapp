import { useState, useEffect } from "react";
import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");

  const fetchWeather = async () => {
    try {
      const res = await fetch("/api/data");
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Erreur fetch météo :", error);
      setWeatherData({ message: "Impossible de charger la météo" });
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 3600000); // rafraîchissement toutes les heures
    return () => clearInterval(interval);
  }, []);

  const changeSystem = () =>
    unitSystem === "metric" ? setUnitSystem("imperial") : setUnitSystem("metric");

  if (!weatherData) return <LoadingScreen loadingMessage="Loading data..." />;
  if (weatherData.message) return <ErrorScreen errorMessage="Impossible de charger la météo" />;

  return (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        country={weatherData.country}
        weatherData={weatherData}
        unitSystem={unitSystem}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  );
};

export default App;