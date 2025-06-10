import { useCallback, useEffect, useState } from 'react';
import styles from './HottestRoute.module.css';

import Title from '../common/Title/Title';
import axios from 'axios';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

// 기본값을 함수로 지정해서 안전하게 처리
const HottestRoute = ({ onMoreClick = () => {}, onRouteSelect = () => {} }) => {
  const [allRoutes, setAllRoutes] = useState([]); // 전체 루트 저장
  const [showAll, setShowAll] = useState(false);  // 전체 보기 여부

  const handleClickMore = useCallback(() => {
    setShowAll(true); // More 클릭 시 전체 보기로 전환
    onMoreClick();
  }, [onMoreClick]);

  useEffect(() => {
    axios
      .get(`${VITE_BASE_URL}/api/road`) // 전체 조회 api로 연결 
      .then((res) => {
        console.log('HottestRoute 응답:', res.data);
        const routeList = res.data?.result?.results;
        if (res.data.isSuccess && Array.isArray(routeList)) {
          setAllRoutes(routeList); // 전체 리스트 저장
        } else {
          console.warn('예상한 응답 형식이 아닙니다:', res.data);
        }
      })
      .catch((err) => {
        console.error('추천 루트 불러오기 실패:', err);
      });
  }, []);

  // 보여줄 루트: showAll이면 전체, 아니면 10개만
  const displayedRoutes = showAll ? allRoutes : allRoutes.slice(0, 10); 

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text="Hottest Route" />
        {!showAll && (
          <div className={styles.moreText} onClick={handleClickMore}>
            More
          </div>
        )}
      </div>

      <div className={styles.routeList}>
        {displayedRoutes.map((route, idx) => (
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
            {route.routeImgUrl && ( // 이미지 연결 
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
