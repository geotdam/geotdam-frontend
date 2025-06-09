import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MakeRoutePopup.module.css';

import RouteHeader from '../../../components/MakeRoute/RouteHeader';
import RouteStepCard from '../../../components/MakeRoute/RouteStepCard';
import AddPlaceCard from '../../../components/MakeRoute/AddPlaceCard';
import SaveButton from '../../../components/Button/SaveButton';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const MakeRoutePopup = () => {
  const [searchParams] = useSearchParams();
  const placeId = searchParams.get('placeId'); 
  const [routePlaces, setRoutePlaces] = useState([]);
  const [routeImageUrl, setRouteImageUrl] = useState(null); //루트 이미지 상태

  const handleAddPlace = async () => {
    if (!placeId) return;

    // 이미 추가된 장소인지 확인
    if (routePlaces.find(p => p.place_id === placeId)) return;

    try {
      const res = await axios.get(`${VITE_BASE_URL}/api/places/${placeId}`);
      const place = res.data?.result;

      if (place) {
        setRoutePlaces(prev => [...prev, place]);
      } else {
        console.warn('🔍 장소 정보 없음');
      }
    } catch (err) {
      console.error('❌ 장소 정보 불러오기 실패:', err);
    }
  }; 

  //이미지 업로드 핸들러
  const handleImageUpload = async (file) => {
    if (!file) return;// 파일 아니면 작동 x 

    const formData = new FormData();
    formData.append('image', file);
    console.log('[MakeRoutePopup] 이미지 업로드 요청 중...');

    try {
      const res = await axios.post(`${VITE_BASE_URL}/api/upload/image`, formData);//이미지 업로드 api 연결
      const uploadedUrl = res.data.url;
      setRouteImageUrl(uploadedUrl); //받아온 이미지 url 저장하기
      console.log('[MakeRoutePopup] 업로드된 이미지 URL:', uploadedUrl);
      // 이 URL을 루트 생성 시 서버로 함께 전송하면 됩니다
    } catch (err) {
      console.error('❌ 이미지 업로드 실패:', err);
    }
  };

  return (
    <div className={styles.route}>
      <div className={styles.scroll}>
        <RouteHeader imageUrl={routeImageUrl} onImageUpload={handleImageUpload} /> {/*루트 이미지 띄우기기 */}
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
        <SaveButton />
      </div>
    </div>
  );
};

export default MakeRoutePopup;
