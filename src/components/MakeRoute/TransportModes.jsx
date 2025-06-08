import styles from './TransportModes.module.css';
import bikeIcon from '../../assets/icons/bike.svg';
import walkIcon from '../../assets/icons/walk.svg';
import busIcon from '../../assets/icons/bus.svg';

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
    CAR: bikeIcon,
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
          <div className={styles.label}>{Math.round(route.duration / 60)}분</div>
        </div>
      ))}
    </div>
  );
};

export default TransportModes;
