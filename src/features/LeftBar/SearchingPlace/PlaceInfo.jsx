import { useState } from 'react';
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

  return (
    <>
      <PlaceHeader place={place} />
      <StartSearch onInputChange={setOriginName} />
      <SearchingRoad isEnabled={!!originName} onSearchClick={handleSearchRoute} />
      <TransportModes routeData={routeData} />
      <PlaceInfoCard place={place} />
      <RatingCard averageRating={4.2} userRating={3} onRate={(rating) => {}} /> 
    </>
  );
};

export default PlaceInfo;
