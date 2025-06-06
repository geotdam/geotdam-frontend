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
// CCTV 데이터를 새로 가져올 거리 임계값 (더 큰 값으로 설정)
const CCTV_UPDATE_THRESHOLD = 0.005; // 약 500m 정도의 거리

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
    const lastCctvUpdateRef = useRef({
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

    // CCTV 위치가 크게 변경되었는지 확인
    const shouldUpdateCctvs = useCallback((newLocation) => {
        if (!lastCctvUpdateRef.current.latitude || !lastCctvUpdateRef.current.longitude) {
            return true;
        }

        const latDiff = Math.abs(newLocation.latitude - lastCctvUpdateRef.current.latitude);
        const lonDiff = Math.abs(newLocation.longitude - lastCctvUpdateRef.current.longitude);

        return latDiff > CCTV_UPDATE_THRESHOLD || lonDiff > CCTV_UPDATE_THRESHOLD;
    }, []);

    // CCTV 데이터 가져오기
    const fetchCctvs = useCallback(async (location) => {
        if (!location || !location.latitude || !location.longitude) {
            console.log('Invalid location for CCTV fetch');
            return;
        }

        try {
            const response = await LocationCctv.getNearbyCctvs();
            console.log('CCTV API Response:', response);
            
            if (response && Array.isArray(response.markings)) {
                console.log('Setting CCTV markers:', response.markings.length);
                setCctvs(response.markings);
                lastCctvUpdateRef.current = location;
            } else {
                console.log('Invalid CCTV response format:', response);
                setCctvs([]);
            }
        } catch (error) {
            console.error('Failed to fetch CCTVs:', error);
            setCctvs([]);
        }
    }, []);

    // 초기 CCTV 데이터 로드
    useEffect(() => {
        const loadInitialCctvs = async () => {
            try {
                const savedLocation = localStorage.getItem('currentLocation');
                if (savedLocation) {
                    const location = JSON.parse(savedLocation);
                    if (location && location.latitude && location.longitude) {
                        console.log('Loading initial CCTV data with location:', location);
                        await fetchCctvs(location);
                    }
                }
            } catch (error) {
                console.error('Error loading initial CCTV data:', error);
            }
        };

        if (mapInstance) {
            loadInitialCctvs();
        }
    }, [mapInstance, fetchCctvs]);

    // CCTV 상태 변경 모니터링
    useEffect(() => {
        console.log('CCTV state updated:', cctvs.length, 'markers');
    }, [cctvs]);

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

                            // 위치가 크게 변경되었을 때만 CCTV 데이터 업데이트
                            if (shouldUpdateCctvs(location)) {
                                fetchCctvs(location);
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Error reading location from localStorage:', error);
            }
        };

        const intervalId = setInterval(checkLocationUpdate, LOCATION_UPDATE_INTERVAL);

        // 초기 로드시 한 번 실행
        checkLocationUpdate();

        return () => clearInterval(intervalId);
    }, [mapInstance, hasLocationChanged, shouldUpdateCctvs, fetchCctvs]);

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
                    {cctvs && cctvs.length > 0 && (
                        <>
                            {console.log('Rendering CCTV markers:', cctvs.length)}
                            {cctvs.map(cctv => {
                                console.log('CCTV marker data:', cctv);
                                return (
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
                                );
                            })}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Map;