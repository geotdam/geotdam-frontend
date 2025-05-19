import { useState } from 'react';
import styles from './RouteStepCard.module.css';

import Icon from '../../components/common/Icon';
import dropDown from '../../assets/icons/dropDown.svg';

const RouteStepCard = ({ step, color, author, time, address, phone }) => {
  const [expanded, setExpanded] = useState(false);
  const badgeClass = color === 'pink' ? styles.stepBadgePink : styles.stepBadgeGray;

  return (
    <div className={styles.routeItem}>
      <div className={badgeClass}>{step}</div>
      <div className={styles.routeCardWrapper}>
        {/* 카드 상단: 기본 정보 + 토글 */}
        <div className={styles.routeCard}>
          <div className={styles.routeDetails}>
            <div className={styles.routeTitle}>{author}</div>
            <div className={styles.routeSubtext}>{time}</div> 
          </div>
          <Icon
            src={dropDown}
            alt="Toggle"
            backgroundColor="#fff"
            onClick={() => setExpanded(prev => !prev)}
          />
        </div>

        {/* expanded 되었을 때 추가 정보 */}
        {expanded && (
          <div className={styles.infoContainer}>
            <div className={styles.infoRow}>
              <div className={styles.label}>Address</div>
              <div className={styles.value}>{address}</div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.label}>Phone</div>
              <div className={styles.value}>{phone}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteStepCard;
