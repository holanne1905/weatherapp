import Image from "next/image";
import styles from "./MetricsCard.module.css";

export const MetricsCard = ({ title, iconSrc, metric, unit, iconsize =30 }) => {
  return (
    <div className={styles.wrapper}>
      
      <div className={styles.content}>
        <Image
          width={iconsize}
          height={iconsize}
          src={iconSrc}
          alt={title}
        />
        <h1>{metric}{unit}</h1>
      </div>
          <p className={styles.title}>{title}</p>
      </div>
          
  
      

    
  );
};
