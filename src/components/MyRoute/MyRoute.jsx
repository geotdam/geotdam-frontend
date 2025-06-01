import styles from './MyRoute.module.css';

import Title from '../common/Title/Title';
import plus from '../../assets/icons/zoomIn.svg';

const MyRoute = ({ onNewRouteClick }) => {
  return (
    <div className={styles.myRouteContainer}>
      <Title text="My Route" />
      <div className={styles.routeList}>

        {/* 백엔드 연결 필요 */}
        {/* 내 루트 목록, 루트 상세 정보 조회 */}
        <div className={styles.routeItem}>
          <img className={styles.routeImage} alt="루트 이미지" src={plus} />
          <div className={styles.content}>
            <div className={styles.routeName}>Test Route</div>
            <div className={styles.placeCount}>3 places</div>
          </div>
        </div>

        {/* 백엔드 연결 필요 */}
        {/* 나만의 루트 생성 */}
        <div className={styles.newRouteItem} onClick={onNewRouteClick}>
          <img className={styles.routeImage} alt="추가 이미지" src={plus} />
          <div className={styles.textWrapper}>
            <div className={styles.newRouteText}>Make New Route</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRoute;
