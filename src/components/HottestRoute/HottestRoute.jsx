import { useCallback, useEffect, useState } from 'react';
import styles from './HottestRoute.module.css';

import Title from '../common/Title/Title';
//import thumb from '../../assets/mock/thumb.jpg';
import axios from 'axios';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const HottestRoute = ({ onMoreClick, onRouteSelect }) => {
  const [hottestRoutes, setHottestRoutes] = useState([]);

  const handleClickMore = useCallback(() => {
    onMoreClick();
  }, [onMoreClick]);

  useEffect(() => {
    axios
      .get(`${VITE_BASE_URL}/api/road`)
      .then((res) => {
        const routeList = res.data?.result?.results;
        if (res.data.isSuccess && Array.isArray(routeList)) {
          setHottestRoutes(routeList.slice(0, 10));
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
            <div className={idx < 3 ? styles.rankBadgePink : styles.rankBadgeGray}>
              <div className={styles.rankText}>{idx + 1}</div>
            </div>
            <div className={styles.routeInfo}>
              <div className={styles.routeTitle}>{route.name}</div>
              <div className={styles.routeAuthor}>{route.creatorNickname}</div>
            </div>
            {/* routeImgUrl이 있을 때만 이미지 렌더링 */}
            {typeof route.routeImgUrl === 'string' &&
              route.routeImgUrl.trim().startsWith('http') && (
                <img
                  className={styles.thumbnail}
                  src={route.routeImgUrl}
                  alt="thumbnail"
                />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HottestRoute;
