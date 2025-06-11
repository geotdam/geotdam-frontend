import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PlaceHeader from '../../../components/MakeRoute/PlaceHeader';
import StartSearch from '../../../components/Search/StartSearch';
import SearchingRoad from '../../../components/Button/SearchingRoad';
import TransportModes from '../../../components/MakeRoute/TransportModes';
import PlaceInfoCard from '../../../components/PlaceInfo/PlaceInfoCard';
import RatingCard from '../../../components/Rating/RatingCard';
import ReportFooter from '../../../components/ReportFooter/ReportFooter';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const PlaceInfo = ({ place }) => {
  const [originName, setOriginName] = useState('');
  const [routeData, setRouteData] = useState([]); // 각 교통수단별 경로 정보
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState(null);
  
  useEffect(() => {
  if (place?.point) {
    setAverageRating(place.point);
  }
}, [place]);
  //console.log("출발지:", originName);
  //console.log("목적지:", place.place_name);
  const handleSearchRoute = async () => {
    try {
      const response = await axios.get(`${VITE_BASE_URL}/api/maps`, {
        params: {
          originName,
          destinationName: place.place_name,
        }
      });

      const data = response.data;
      console.log('전체 응답:', data);

      const routes = data.result?.routes;

      if (data.isSuccess && Array.isArray(routes)) {
        setRouteData(routes); // TransportModes에 전달

        // 기본적으로 첫 번째 경로를 먼저 그림
        const defaultPolyline = routes[0]?.polyline;
        if (defaultPolyline?.length) {
          localStorage.setItem('currentPolyline', JSON.stringify(defaultPolyline));
          window.dispatchEvent(new Event('polylineChanged'));
        }
      } else {
        console.error('경로 검색 실패: route 목록 없음', data?.message);
      }
    } catch (err) {
      console.error('API 호출 오류:', err);
    }
  };

const getToken = () => {
  const token = localStorage.getItem('token'); // ✅ 이름 맞춰야 함!
   console.log('[디버그] 가져온 토큰:', token);
   console.log(place);
  return token ? `Bearer ${token}` : null;
};
const handleRate = async (rating, comment) => {
  try {
    const res = await axios.post(
      `${VITE_BASE_URL}/api/places/${place.place_id}/reviews`,//별점 등록 api 호출 
      {
        rating,
        content: comment,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );

    if (res.data.isSuccess) {
      setUserRating(res.data.result.rating);
      setAverageRating(res.data.result.corrected_rating);
    }
  } catch (err) {
    console.error('별점 등록 실패:', err);
  }
}; //별점 남기기 


  return (
    <>
      <PlaceHeader place={place} />
      <StartSearch onInputChange={setOriginName} />
      <SearchingRoad isEnabled={!!originName} onSearchClick={handleSearchRoute} />
      <TransportModes routeData={routeData} />
      <PlaceInfoCard place={place} />
      <RatingCard
        averageRating={averageRating || place.point}
        userRating={userRating || 0}
        onRate={handleRate}
        tmapPlaceId={place.place_id}
        placeName={place.place_name}
      /> {/**장소 리뷰 별점 연동  */}
    </>
  );
};

export default PlaceInfo;
