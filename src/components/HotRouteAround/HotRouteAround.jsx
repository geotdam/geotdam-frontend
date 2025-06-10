import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import styles from './HotRouteAround.module.css';

import Title from '../common/Title/Title';
//import thumb from '../../assets/mock/thumb.jpg';
import axios from 'axios';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

// 홈에 들어가는 인기 루트 리스트
const HotRouteAround = () => {
  const [hotRoutes, setHotRoutes] = useState([]);
  const navigate = useNavigate();

  const handleClickMore = useCallback(() => {
    navigate('/hottestRoute');
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`${VITE_BASE_URL}/api/road/recommends`)//추천 인기순 루트 api 불러오기 
      .then((res) => {
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
        <Title text="Hot Route Recommend" />
        <div className={styles.moreText} onClick={handleClickMore}>More</div>
      </div>
      <div className={styles.routeList}>
        {hotRoutes.map((route, index) => (
          <div className={styles.routeItem} key={index}>
            {/*이미지 렌더링 */}
            {route.imageUrl && (
              <img
                className={styles.routeIcon}
                src={route.imageUrl}
                alt="경로 아이콘"
              />
            )}
            <div className={styles.routeName}>{route.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotRouteAround;
