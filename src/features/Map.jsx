import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './map.module.css';
import myLocationMarker from '../assets/icons/mylocation-marker.svg';
import benchMarker from '../assets/icons/benchmarkings.png';
import cctvMarker from '../assets/icons/cctvMarking.png';
import CustomMarker from '../components/Marker/CustomMarker';
import LocationBenches from '../apis/LocationBenches';
import LocationCctv from '../apis/LocationCctv';

const DEFAULT_ZOOM_LEVEL = 15;
const MIN_ZOOM_LEVEL = 7;
const MAX_ZOOM_LEVEL = 19;
const LOCATION_UPDATE_INTERVAL = 5000;
const LOCATION_CHANGE_THRESHOLD = 0.0001;

const useMap = (mapRef) => {
    const [mapInstance, setMapInstance] = useState(null);

    useEffect(() => {
        if (!window.Tmapv3 || mapRef.current?.firstChild || mapInstance) {
            return;
        }

        const defaultLocation = {
            latitude: 37.56520450,
            longitude: 126.98702028
        };
        
        let currentLocation;
        try {
            const savedLocation = localStorage.getItem('currentLocation');
            currentLocation = savedLocation ? JSON.parse(savedLocation) : defaultLocation;
        } catch {
            currentLocation = defaultLocation;
        }

        try {
            const map = new window.Tmapv3.Map(mapRef.current, {
                center: new window.Tmapv3.LatLng(currentLocation.latitude, currentLocation.longitude),
                width: "100%",
                height: "100%",
                zoom: DEFAULT_ZOOM_LEVEL,
                zoomControl: false,
            });

            map.setZoomLimit(MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL);
            setMapInstance(map);
        } catch (error) {
            console.error('Failed to initialize map:', error);
        }
    }, [mapRef, mapInstance]);

    return { mapInstance };
};

const Map = () => {
    const mapRef = useRef(null);
    const [currentLocation, setCurrentLocation] = useState({
        latitude: null,
        longitude: null,
    });
    const [benches, setBenches] = useState([]);
    const [cctvs, setCctvs] = useState([]);
    const lastLocationRef = useRef({
        latitude: null,
        longitude: null,
    });
    
    const { mapInstance } = useMap(mapRef);

    // 벤치 데이터 가져오기
    useEffect(() => {
        const fetchBenches = async () => {
            try {
                const response = await LocationBenches.getNearbyBenches();
                if (response && response.result && response.result.benches) {
                    setBenches(response.result.benches);
                }
            } catch (error) {
                console.error('Failed to fetch benches:', error);
            }
        };

        if (mapInstance) {
            fetchBenches();
        }
    }, [mapInstance]);

    // CCTV 데이터 가져오기
    useEffect(() => {
        const fetchCctvs = async () => {
            try {
                const response = await LocationCctv.getNearbyCctvs();
                if (response && response.markings && Array.isArray(response.markings)) {
                    setCctvs(response.markings);
                    console.log('CCTV data loaded:', response.markings.length, 'CCTVs found');
                } else {
                    console.log('No CCTV data in response:', response);
                    setCctvs([]);
                }
            } catch (error) {
                if (error.message !== '주변에 CCTV가 없습니다.') {
                    console.error('Failed to fetch CCTVs:', error);
                }
                setCctvs([]);
            }
        };

        if (mapInstance) {
            fetchCctvs();
            
            // 위치가 업데이트될 때마다 CCTV 데이터도 업데이트
            const locationCheckInterval = setInterval(fetchCctvs, LOCATION_UPDATE_INTERVAL);
            
            return () => clearInterval(locationCheckInterval);
        }
    }, [mapInstance]);

    // 위치 변경 여부 확인
    const hasLocationChanged = useCallback((newLocation) => {
        if (!lastLocationRef.current.latitude || !lastLocationRef.current.longitude) {
            return true;
        }

        const latDiff = Math.abs(newLocation.latitude - lastLocationRef.current.latitude);
        const lonDiff = Math.abs(newLocation.longitude - lastLocationRef.current.longitude);

        return latDiff > LOCATION_CHANGE_THRESHOLD || lonDiff > LOCATION_CHANGE_THRESHOLD;
    }, []);

    // Update marker when localStorage location changes
    useEffect(() => {
        const checkLocationUpdate = () => {
            try {
                const savedLocation = localStorage.getItem('currentLocation');
                if (savedLocation) {
                    const location = JSON.parse(savedLocation);
                    
                    if (hasLocationChanged(location)) {
                        setCurrentLocation(location);
                        lastLocationRef.current = location;
                        
                        if (mapInstance && location.latitude && location.longitude) {
                            const position = new window.Tmapv3.LatLng(location.latitude, location.longitude);
                            mapInstance.setCenter(position);
                        }
                    }
                }
            } catch (error) {
                console.error('Error reading location from localStorage:', error);
            }
        };

        const intervalId = setInterval(checkLocationUpdate, LOCATION_UPDATE_INTERVAL);

        checkLocationUpdate();

        return () => clearInterval(intervalId);
    }, [mapInstance, hasLocationChanged]);

    return (
        <div ref={mapRef} id="map_div" className={styles.map}>
            {mapInstance && currentLocation.latitude && currentLocation.longitude && (
                <>
                    <CustomMarker
                        map={mapInstance}
                        position={currentLocation}
                        icon={myLocationMarker}
                        iconSize={{ width: 28, height: 28 }}
                    />
                    {benches && benches.length > 0 && benches.map(bench => (
                        <CustomMarker
                            key={`${bench.id}-${bench.lat}-${bench.lon}`}
                            map={mapInstance}
                            position={{
                                latitude: bench.lat,
                                longitude: bench.lon
                            }}
                            icon={benchMarker}
                            iconSize={{ width: 36, height: 36 }}
                        />
                    ))}
                    {cctvs && cctvs.length > 0 && cctvs.map(cctv => (
                        <CustomMarker
                            key={`cctv-${cctv.id}`}
                            map={mapInstance}
                            position={{
                                latitude: cctv.lat,
                                longitude: cctv.lng
                            }}
                            icon={cctvMarker}
                            iconSize={{ width: 32, height: 32 }}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default Map;