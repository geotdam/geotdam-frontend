import React, { useEffect, useRef } from 'react';
import styles from './map.module.css';

const Map = () => {
    const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!window.Tmapv2) {
        console.log('Waiting for TMap to load...');
        setTimeout(initializeMap, 100);
        return;
      }

      if (!mapRef.current) {
        try {
          mapRef.current = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(37.56520450, 126.98702028),
            width: "100%",
            height: "100%",
            zoom: 17
          });
          console.log('Map initialized successfully');
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      }
    };

    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div id="map_div" className={styles.map}></div>
  );
};

export default Map;