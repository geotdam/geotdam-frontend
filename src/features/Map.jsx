import React, { useEffect, useRef } from 'react';
import styles from './map.module.css';

const Map = () => {
    const mapRef = useRef(null);

    const initTmap = () => {
        if (!mapRef.current) {
            // localStorage에서 저장된 위치 정보 가져오기
            const defaultLocation = {
                latitude: 37.56520450,
                longitude: 126.98702028
            };
            
            let currentLocation;
            try {
                const savedLocation = localStorage.getItem('currentLocation');
                currentLocation = savedLocation ? JSON.parse(savedLocation) : defaultLocation;
                console.log('📍 Using location:', currentLocation);
            } catch (error) {
                console.warn('⚠️ Error reading location from localStorage:', error);
                currentLocation = defaultLocation;
            }

            const mapOptions = {
                center: new window.Tmapv2.LatLng(currentLocation.latitude, currentLocation.longitude),
                width: "100%",
                height: "100%",
                zoom: 15
            };

            try {
                // map 생성
                mapRef.current = new window.Tmapv2.Map("map_div", mapOptions);
                
                console.log('Map initialized successfully');
            } catch (error) {
                console.error('Error initializing map:', error);
            }
        } else {
            console.error('TMap API not available');
        }
    };

    useEffect(() => {
        initTmap();

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