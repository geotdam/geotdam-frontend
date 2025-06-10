import styles from './TransportModes.module.css';

//import bikeIcon from '../../assets/icons/bike.svg';
import carIcon from "../../assets/icons/car.svg"; // 차 아이콘
import walkIcon from '../../assets/icons/walk.svg'; // 걷는 이모티콘 
import busIcon from '../../assets/icons/bus.svg'; // 대중교통 이모티콘 


const formatDuration = (seconds) => {
  const minutes = Math.round(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}시간 ${remainingMinutes}분`;
  } else {
    return `${remainingMinutes}분`;
  }
}; // 소요시간 계산 


const TransportModes = ({ routeData }) => {
  if (!routeData || !Array.isArray(routeData)) return null;

  const handleClick = (polyline) => {
    if (polyline?.length > 0) {
      localStorage.setItem('currentPolyline', JSON.stringify(polyline));
      window.dispatchEvent(new Event('polylineChanged'));
    }
  };

  const modeToIcon = {
    WALK: walkIcon,
    CAR: carIcon,
    TRANSIT: busIcon,
  };

  return (
    <div className={styles.transportList}>
      {routeData.map((route, index) => (
        <div
          key={index}
          className={styles.transportItem}
          onClick={() => handleClick(route.polyline)}
        >
          <img
            src={modeToIcon[route.mode] || walkIcon}
            alt={`${route.mode} 아이콘`}
            className={styles.icon}
          />
          {/* duration이 sec이기 때문에 60으로 나눠서 분으로 계산  */}
              <div className={styles.label}>{formatDuration(route.duration)}</div>
        </div>
      ))}
    </div>
  );
};

export default TransportModes;
