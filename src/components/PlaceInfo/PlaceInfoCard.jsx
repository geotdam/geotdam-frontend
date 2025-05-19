import styles from './PlaceInfoCard.module.css';

import Title from '../common/Title/Title';
import Icon from '../common/Icon';
import dropDown from '../../assets/icons/dropDown.svg'

const PlaceInfoCard = () => {
  return (
    <div className={styles.PlaceInfoSection}>
      <Title text="PlaceInfo" />
      <div className={styles.infoCard}>
        <div className={styles.infoRowHeader}>
          <div className={styles.routeDetails}>
            <div className={styles.label}>영업시간</div>
            <div className={styles.time}>17:00 - 00:00</div>
            <div className={styles.statusClosed}>Closed</div>
          </div>
          <Icon src={dropDown} alt="토글 아이콘" backgroundColor="#ffffff" />
        </div>

        <div className={styles.infoRow}>
          <div className={styles.label}>Address</div>
          <div className={styles.value}>123 Hansik-ro, Eumsik-si, Seoul 04524, South Korea</div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.label}>Phone</div>
          <div className={styles.value}>+375 (17) 327-10-45</div>
        </div>
      </div>
    </div>
  );
};

export default PlaceInfoCard;
