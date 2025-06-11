import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MyRoute.module.css';

import Title from '../common/Title/Title';
import plus from '../../assets/icons/zoomIn.svg';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const MyRoute = ({ onNewRouteClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myRoutes, setMyRoutes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      axios.get(`${BASE_URL}/api/road/myroots?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          const results = res.data?.result || [];
          setMyRoutes(results);
          console.log('내 루트 목록: ', res.data);
        })
        .catch((err) => {
          console.error('내 루트 불러오기 실패:', err);
        });
    }
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

        {myRoutes.length > 0 && (
          <div className={styles.routeItem}>
            <img
              className={styles.routeImage}
              alt="루트 이미지"
              src={myRoutes[0].routeImgUrl || plus}
            />
            <div className={styles.content}>
              <div className={styles.routeName}>{myRoutes[0].name}</div>
              <div className={styles.placeCount}>
                {(myRoutes[0].places?.length ?? '?')} places
              </div>
            </div>
          </div>
        )}

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
