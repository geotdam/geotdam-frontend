import styles from './MyRoute.module.css';
import { useEffect, useState } from 'react';

import Title from '../common/Title/Title';
import plus from '../../assets/icons/zoomIn.svg';

const MyRoute = ({ onNewRouteClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className={styles.myRouteContainer}>
        <Title text="My Route" />
        <div className={styles.loginPrompt}>
          마이 루트를 보려면 <strong>로그인</strong>하세요.
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.myRouteContainer}>
      <Title text="My Route" />
      <div className={styles.routeList}>

        {/* 내 루트 목록 연결!! */}
        <div className={styles.routeItem}>
          <img className={styles.routeImage} alt="루트 이미지" src={plus} />
          <div className={styles.content}>
            <div className={styles.routeName}>Test Route</div>
            <div className={styles.placeCount}>3 places</div>
          </div>
        </div>
        {/* 여기까지 */}

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
