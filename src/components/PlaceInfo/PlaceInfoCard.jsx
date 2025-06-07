import styles from './PlaceInfoCard.module.css';

import Title from '../common/Title/Title';
import Icon from '../common/Icon';
import dropDown from '../../assets/icons/dropDown.svg'
import Close from '../common/Close';

const PlaceInfoCard = ( { place } ) => {
  const {
    additionalInfo,
    roadAddress,
    tel,
  } = place;

  const businessHours = additionalInfo?.match(/\d{2}:\d{2}~\d{2}:\d{2}/g)?.[0] || '정보 없음';

  return (
    <div className={styles.PlaceInfoSection}>
      <Title text="PlaceInfo" />
      <div className={styles.infoCard}>
        <div className={styles.infoRowHeader}>
          <div className={styles.routeDetails}>
            <div className={styles.label}>영업시간</div>
            <div className={styles.time}>{businessHours}</div>
            <Close additionalInfo={place.additionalInfo}/> 
          </div>
          <Icon src={dropDown} alt="토글 아이콘" backgroundColor="#ffffff" />
        </div>

        <div className={styles.infoRow}>
          <div className={styles.label}>Address</div>
          <div className={styles.value}>{roadAddress || '주소 정보 없음'}</div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.label}>Phone</div>
          <div className={styles.value}>{tel || '전화번호 없음'}</div>
        </div>
      </div>
    </div>
  );
};

export default PlaceInfoCard;
