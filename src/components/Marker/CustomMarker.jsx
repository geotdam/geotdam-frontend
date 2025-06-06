import React, { useEffect, useState } from 'react';

const CustomMarker = ({ map, position, icon, iconSize = { width: 24, height: 24 } }) => {
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        if (!map || !position || !window.Tmapv3) return;

        // 기존 마커가 있다면 제거
        if (marker) {
            marker.setMap(null);
        }

        // 새로운 마커 생성
        const newMarker = new window.Tmapv3.Marker({
            position: new window.Tmapv3.LatLng(position.latitude, position.longitude),
            map: map,
            icon: icon,
            iconSize: new window.Tmapv3.Size(iconSize.width, iconSize.height),
        });

        setMarker(newMarker);

        // cleanup function
        return () => {
            if (newMarker) {
                newMarker.setMap(null);
            }
        };
    }, [map, position, icon, iconSize]);

    return null; // 마커는 지도에 직접 렌더링되므로 React 컴포넌트는 아무것도 렌더링하지 않습니다.
};

export default CustomMarker; 