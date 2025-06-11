import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MakeRoutePopup.module.css';

import MakeRouteHeader from '../../../components/MakeRoute/MakeRouteHeader';
import RouteStepCard from '../../../components/MakeRoute/RouteStepCard';
import AddPlaceCard from '../../../components/MakeRoute/AddPlaceCard';
import SaveButton from '../../../components/Button/SaveButton';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const MakeRoutePopup = () => {
  const [searchParams] = useSearchParams();
  // 루트 이름, 설명
  const [routeName, setRouteName] = useState('');
  const [description, setDescription] = useState('');
  // 루트 대표 이미지 (사용자에게 업로드 받는)
  const [routeImageUrl, setRouteImageUrl] = useState(null);
  // 루트에 들어가는 장소들
  const placeId = searchParams.get('placeId');
  const [routePlaces, setRoutePlaces] = useState([]);

  const handleSaveRoute = async () => {
    // 루트 생성을 위한 사용자 확인
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    // 루트 데이터
    const payload = {
      routeName: routeName || '루트',
      description: description || '',
      userUploadImgUrl: routeImageUrl,
      userId,
      places: routePlaces.map((place, idx) => ({
        sequence: idx + 1,
        name: place.place_name,
        phone: place.tel,
        open_hours: place.additionalInfo,
        address: place.roadAddress,
        isPrimaryPlace: true,
        lat: place.lat,
        lng: place.lng,
      })),
    };

    // 루트 생성(저장) api 호출
    try {
      await axios.post(`${VITE_BASE_URL}/api/road`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('루트가 저장되었습니다!');
    } catch (error) {
      console.error('루트 저장 실패:', error);
      alert('루트 저장 중 오류가 발생했습니다.');
    }
  };

  const handleAddPlace = async () => {
    if (!placeId) return;

    // 이미 추가된 장소인지 확인
    if (routePlaces.find(p => p.place_id === placeId)) return;

    // 장소 상세 정보 조회 api
    try {
      const res = await axios.get(`${VITE_BASE_URL}/api/places/${placeId}`);
      const place = res.data?.result;

      if (place) {
        setRoutePlaces(prev => [...prev, place]);
      } else {
        console.warn('장소 정보 없음');
      }
    } catch (err) {
      console.error('장소 정보 불러오기 실패:', err);
    }
  };

  return (
    <div className={styles.route}>
      <div className={styles.scroll}>
        <MakeRouteHeader
          routeName={routeName}
          description={description}
          onChangeRouteName={setRouteName}
          onChangeDescription={setDescription}
          onUploadComplete={(uploadedUrl) => setRouteImageUrl(uploadedUrl)}
        />
        {routePlaces.map((place, idx) => (
          <RouteStepCard
            key={place.place_id}
            step={idx + 1}
            name={place.place_name}
            address={place.roadAddress}
            phone={place.tel}
            time={place.additionalInfo}
          />
        ))}

        <AddPlaceCard step={routePlaces.length + 1} onClick={handleAddPlace} />
        <SaveButton onClick={handleSaveRoute} />
      </div>
    </div>
  );
};

export default MakeRoutePopup;
