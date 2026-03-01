import React from "react";
import styles from "./MetricsBox.module.css";

import { MetricsCard } from "./MetricsCard";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  if (!weatherData) return <p>Chargement des métriques...</p>;

  return (
    <div className={styles.wrapper}>


      <MetricsCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={weatherData.humidity}
        unit={"%"}
        iconsize={"100"}
      />
    </div>
  );
};
