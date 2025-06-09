import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MakeRoutePopup.module.css';

import RouteHeader from '../../../components/MakeRoute/RouteHeader';
import RouteStepCard from '../../../components/MakeRoute/RouteStepCard';
import AddPlaceCard from '../../../components/MakeRoute/AddPlaceCard';
import SaveButton from '../../../components/Button/SaveButton';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const MakeRoutePopup = ({ places = [], onAddPlace }) => {
  const [searchParams] = useSearchParams();
  const placeId = searchParams.get('placeId'); 
  const [routePlaces, setRoutePlaces] = useState([]);

  const handleAddPlace = async () => {
    if (!placeId) return;

    // 이미 추가된 장소인지 확인
    if (places.find(p => p.place_id === placeId)) return;

    try {
      const res = await axios.get(`${VITE_BASE_URL}/api/places/${placeId}`);
      const place = res.data?.result;

      if (place) {
        setPlaces(prev => [...prev, place]);
      } else {
        console.warn('🔍 장소 정보 없음');
      }
    } catch (err) {
      console.error('❌ 장소 정보 불러오기 실패:', err);
    }
  };

  return (
    <div className={styles.route}>
      <div className={styles.scroll}>
        <RouteHeader />
        {places.map((place, idx) => (
          <RouteStepCard
            key={place.place_id}
            step={idx + 1}
            name={place.place_name}
            address={place.roadAddress}
            phone={place.tel}
            time={place.additionalInfo}
          />
        ))}

        <AddPlaceCard step={places.length + 1} onClick={handleAddPlace} />
        <SaveButton />
      </div>
    </div>
  );
};

export default MakeRoutePopup;
