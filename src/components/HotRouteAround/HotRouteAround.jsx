import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import styles from './HotRouteAround.module.css';

import Title from '../common/Title/Title';
import homeIcon from '../../assets/mock/thumb.jpg';
import axios from 'axios';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const HotRouteAround = () => {
  const [hotRoutes, setHotRoutes] = useState([]);
  const navigate = useNavigate();

  const handleClickMore = useCallback(() => {
    navigate('/searchingRoute');
  }, [navigate]);

  useEffect(() => {
    // 토큰 없이 추천 루트 API 호출
    axios
       .get(`${VITE_BASE_URL}/api/road/recommends`)
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
