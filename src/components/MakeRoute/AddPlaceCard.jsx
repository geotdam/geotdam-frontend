import { useCallback } from 'react';
import styles from '../../features/LeftBar/MakeRoute/MakeRoutePopup.module.css';
import plus from '../../assets/icons/zoomIn.svg';

const AddPlaceCard = ({ step, onClick }) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      console.log('[✅ AddPlaceCard] onClick 호출');
      onClick();
    }
  }, [onClick]);

  return (
    <div className={styles.addPlaceBox} onClick={handleClick}>
      <div className={styles.stepBadgePink}>{step}</div>
      <div className={styles.addPlaceWrapper}>
        <div className={styles.routeCard}>
          <img className={styles.placeIcon} alt="" src={plus} />
          <div className={styles.routeTitle}>Add New Place</div>
        </div>
      </div>
    </div>
  );
};

export default AddPlaceCard;
