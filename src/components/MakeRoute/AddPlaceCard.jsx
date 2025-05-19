import styles from '../../features/LeftBar/MakeRoute/MakeRoutePopup.module.css';

import plus from '../../assets/icons/zoomIn.svg';

const AddPlaceCard = ({ step }) => (
  <div className={styles.addPlaceBox}>
    <div className={styles.stepBadgePink}>{step}</div>
    <div className={styles.addPlaceWrapper}>
      <div className={styles.routeCard}>
        <img className={styles.placeIcon} alt="" src={plus} />
        <div className={styles.routeTitle}>Add New Place</div>
      </div>
    </div>
  </div>
);

export default AddPlaceCard;
