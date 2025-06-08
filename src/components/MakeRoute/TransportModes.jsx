import styles from "./TransportModes.module.css";

// import bikeIcon from '../../assets/icons/bike.svg';
import carIcon from "../../assets/icons/car.svg"; // bike icon -> car icon으로 수정
import walkIcon from "../../assets/icons/walk.svg";
import busIcon from "../../assets/icons/bus.svg";

const transportData = [
  { icon: carIcon, label: "20 min" },
  { icon: walkIcon, label: "34 min" },
  { icon: busIcon, label: "12d 55 min" },
];

const TransportModes = () => {
  return (
    <div className={styles.transportList}>
      {transportData.map((mode, index) => (
        <div key={index} className={styles.transportItem}>
          <img src={mode.icon} alt="교통수단 아이콘" className={styles.icon} />
          <div className={styles.label}>{mode.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TransportModes;
