import React, { useEffect, useRef } from 'react';
import styles from './map.module.css';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 20; // 최대 20번 시도 (6초)

    const initMap = () => {
      if (typeof window.Tmapv2 === 'undefined') {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(initMap, 300);
          return;
        }
        console.error('TMap API 로딩 실패');
        return;
      }

      try {
        if (!mapRef.current) {
          mapRef.current = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(37.56520450, 126.98702028),
            width: "100%",
            height: "100%",
            zoom: 17
          });
          console.log('Map initialized successfully');
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // 초기 지연 후 시작
    setTimeout(initMap, 500);

    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, []); // 빈 배열을 넣어 마운트 시에만 실행

  return (
    <div id="map_div" className={styles.map}></div>
  );
};

export default Map;