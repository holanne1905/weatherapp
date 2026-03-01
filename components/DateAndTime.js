import React, { useEffect, useState } from "react";
import styles from "./DateAndTime.module.css";

export const DateAndTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000); // mise à jour chaque minute

    return () => clearInterval(interval);
  }, []);

  const localTime = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const localDate = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.wrapper}>
      <p className={styles.date}>{localDate}</p>
      <p className={styles.time}>{localTime}</p>
    </div>
  );
};