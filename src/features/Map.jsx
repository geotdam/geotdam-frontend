import React, { useEffect, useRef, useState } from 'react';
import styles from './map.module.css';
import myLocationMarker from '../assets/icons/mylocation-marker.svg';

const DEFAULT_ZOOM_LEVEL = 15;
const MIN_ZOOM_LEVEL = 7;
const MAX_ZOOM_LEVEL = 19;

const useMap = (mapRef) => {
    const [mapInstance, setMapInstance] = useState(null);
    const [currentMarker, setCurrentMarker] = useState(null);

    const updateMarker = React.useCallback((coord) => {
        const { latitude, longitude } = coord;
        if (!(latitude && longitude) || !mapInstance) {
            return;
        }

        if (currentMarker) {
            const { _lat: prevLatitude, _lng: prevLongitude } = currentMarker.getPosition();
            if (prevLatitude === latitude && prevLongitude === longitude) {
                return;
            }
        }

        currentMarker?.setMap(null);
        const position = new window.Tmapv2.LatLng(latitude, longitude);
        const marker = new window.Tmapv2.Marker({
            position,
            map: mapInstance,
            icon: myLocationMarker,
            iconSize: new window.Tmapv2.Size(48, 48),
        });
        
        setCurrentMarker(marker);
        mapInstance?.setCenter(position);
    }, [mapInstance, currentMarker]);

    useEffect(() => {
        if (mapRef.current?.firstChild || mapInstance) {
            return;
        }

        // 로컬저장소로부터 위치를 얻어옴
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
            console.warn('⚠️ Error, 로컬로부터 위치 받아오기 실패:', error);
            currentLocation = defaultLocation;
        }

        const map = new window.Tmapv3.Map(mapRef.current, {
            center: new window.Tmapv3.LatLng(currentLocation.latitude, currentLocation.longitude),
            width: "100%",
            height: "100%",
            zoom: DEFAULT_ZOOM_LEVEL,
            zoomControl: false,
        });

        map.setZoomLimit(MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL);
        setMapInstance(map);

        // Create initial marker
        updateMarker(currentLocation);
    }, [mapRef, mapInstance, updateMarker]);

    return { mapInstance, updateMarker };
};

const Map = () => {
    const mapRef = useRef(null);
    const [currentLocation, setCurrentLocation] = useState({
        latitude: null,
        longitude: null,
    });
    
    const { updateMarker } = useMap(mapRef);

    // Update marker when localStorage location changes
    useEffect(() => {
        const checkLocationUpdate = () => {
            try {
                const savedLocation = localStorage.getItem('currentLocation');
                if (savedLocation) {
                    const location = JSON.parse(savedLocation);
                    setCurrentLocation(location);
                }
            } catch (error) {
                console.error('Error reading location from localStorage:', error);
            }
        };

        // Check location every second
        const intervalId = setInterval(checkLocationUpdate, 1000);

        // Initial check
        checkLocationUpdate();

        return () => clearInterval(intervalId);
    }, []);

    // Update marker when location changes
    useEffect(() => {
        if (currentLocation.latitude && currentLocation.longitude) {
            updateMarker(currentLocation);
        }
    }, [currentLocation, updateMarker]);

    return (
        <div ref={mapRef} id="map_div" className={styles.map}></div>
    );
};

export default Map;