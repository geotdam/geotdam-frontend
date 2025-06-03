import { useCallback, useEffect, useState } from 'react';
import styles from './HotRouteAround.module.css';

import Title from '../common/Title/Title';
import homeIcon from '../../assets/mock/thumb.jpg';
import axios from 'axios';

const HotRouteAround = ({ onMoreClick }) => {
  const [hotRoutes, setHotRoutes] = useState([]);

  const handleClickMore = useCallback(() => {
    onMoreClick();
  }, [onMoreClick]);

  useEffect(() => {
  const token = localStorage.getItem('accessToken'); // 엑세스 토큰 갖고 오기  
  
  if (!token) {
    console.warn('accessToken이 없습니다.');
    return;
  }

  axios
    .get('/api/road/recommends', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log('추천 루트 응답:', res.data);
      if (res.data.isSuccess && Array.isArray(res.data.result)) {
        setHotRoutes(res.data.result);
      }
    })
    .catch((err) => {
      console.error('추천 루트 불러오기 실패:', err);
    });
}, []);

  return (
    <div className={styles.hotRouteContainer}>
      <div className={styles.header}>
        <Title text="Hottest Route" />
        <div className={styles.moreText} onClick={handleClickMore}>More</div>
      </div>
      <div className={styles.routeList}>
        {hotRoutes.map((route, index) => (
          <div className={styles.routeItem} key={index}>
             <img
              className={styles.routeIcon}
              src={
                typeof route.imageUrl === 'string' &&
                route.imageUrl.trim().startsWith('http')
                  ? route.imageUrl
                  : homeIcon
              }
              alt="경로 아이콘"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = homeIcon;
              }}
            />

            <div className={styles.routeName}>{route.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotRouteAround;
