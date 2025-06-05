import { useCallback, useEffect, useState } from 'react';
import styles from './HottestRoute.module.css';

import Title from '../common/Title/Title';
import thumb from '../../assets/mock/thumb.jpg';
import axios from 'axios';

const HotRouteAround = ({ onMoreClick, onRouteSelect }) => {
  const [hottestRoutes, setHottestRoutes] = useState([]);

  const handleClickMore = useCallback(() => {
    onMoreClick();
  }, [onMoreClick]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');// 엑세스 토큰 불러오기 
  
    
    if (!token) {
      console.warn('accessToken이 없습니다.');
      return;
    }

    axios
      .get('/api/road', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const routeList = res.data?.result?.results;
        if (res.data.isSuccess && Array.isArray(routeList)) {
          setHottestRoutes(routeList.slice(0, 10)); // 최대 10개까지 자르기 
        } else {
          console.warn('예상한 응답 형식이 아닙니다:', res.data);
        }
      })
      .catch((err) => {
        console.error('전체 루트 불러오기 실패:', err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text="Hottest Route" />
        <div className={styles.moreText} onClick={handleClickMore}>
          More
        </div>
      </div>

      <div className={styles.routeList}>
        {hottestRoutes.map((route, idx) => (
          <div
            key={route.routeId}
            className={styles.routeItem}
            onClick={() => onRouteSelect(route)}
          >
            <div
              className={
                idx < 3 ? styles.rankBadgePink : styles.rankBadgeGray
              }
            >
              <div className={styles.rankText}>{idx + 1}</div>
            </div>
            <div className={styles.routeInfo}>
              <div className={styles.routeTitle}>{route.name}</div>
              <div className={styles.routeAuthor}>{route.creatorNickname}</div>
            </div>
            <img
              className={styles.thumbnail}
              src={route.routeImgUrl || thumb}
              alt="thumbnail"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotRouteAround;
