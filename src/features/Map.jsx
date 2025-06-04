import React, { useEffect, useRef } from 'react';
import styles from './map.module.css';

const Map = () => {
    const mapRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트되면 지도 초기화
    const initMap = () => {
      if (typeof window.Tmapv2 === 'undefined') {
        setTimeout(initMap, 300);
        return;
      }

      try {
        // map 생성
        mapRef.current = new window.Tmapv2.Map("map_div", {
          center: new window.Tmapv2.LatLng(37.56520450, 126.98702028), // 지도 중심 좌표
          width: "100%",   // 지도 넓이
          height: "100%",  // 지도 높이
          zoom: 17         // 줌 레벨
        });
        
        console.log('Map initialized successfully');
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    // 컴포넌트가 언마운트되면 정리
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