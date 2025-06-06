import React, { useEffect, useRef, useState } from 'react';
import styles from './map.module.css';
import myLocationMarker from '../assets/icons/mylocation-marker.svg';
import benchMarker from '../assets/icons/benchmarkings.png';
import CustomMarker from '../components/Marker/CustomMarker';
import LocationBenches from '../apis/LocationBenches';

const DEFAULT_ZOOM_LEVEL = 15;
const MIN_ZOOM_LEVEL = 7;
const MAX_ZOOM_LEVEL = 19;

const useMap = (mapRef) => {
    const [mapInstance, setMapInstance] = useState(null);

    useEffect(() => {
        if (!window.Tmapv3 || mapRef.current?.firstChild || mapInstance) {
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

    // Update marker when localStorage location changes
    useEffect(() => {
        const checkLocationUpdate = () => {
            try {
                const savedLocation = localStorage.getItem('currentLocation');
                if (savedLocation) {
                    const location = JSON.parse(savedLocation);
                    setCurrentLocation(location);
                    
                    // 위치가 변경되면 지도 중심 이동
                    if (mapInstance && location.latitude && location.longitude) {
                        const position = new window.Tmapv3.LatLng(location.latitude, location.longitude);
                        mapInstance.setCenter(position);
                    }
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
    }, [mapInstance]);

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
                    {benches && benches.length > 0 && benches.map((bench, index) => (
                        <CustomMarker
                            key={index}
                            map={mapInstance}
                            position={{
                                latitude: bench.lat,
                                longitude: bench.lon
                            }}
                            icon={benchMarker}
                            iconSize={{ width: 36, height: 36 }}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default Map;