import { useEffect, useState ,useMemo} from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchingRoutePopup.module.css";

import RouteHeader from "../../../components/MyRoute/RouteHeader";
import RouteStepCard from "../../../components/MakeRoute/RouteStepCard";
import RatingCard from "../../../components/Rating/RatingCard";
import Author from "../../../components/common/author";
import BookMark from "../../../components/Button/BookMark";
import Likes from "../../../components/Button/likes";
import NickName from "../../../components/common/NickName";
import SearchingRoad from "../../../components/Button/SearchingRoad";
import TransportModes from '../../../components/MakeRoute/TransportModes';
import ShareRoad from "../../../components/Button/ShareRoad";


const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const SearchingRoutePopup = ({ routeId, onClose }) => {
  const [searchParams] = useSearchParams();
  const [routeData, setRouteData] = useState(null);
  const [routes, setRoutes] = useState([]); // 각 교통수단별 경로 정보 저장

  useEffect(() => {
  setRoutes([]); // 루트 바뀌면 이전 경로 결과 초기화
}, [routeId]);

  useEffect(() => {
    const fetchRouteDetail = async () => {
      const token = localStorage.getItem('token');
      let res;

      try {
        res = await axios.get(`${VITE_BASE_URL}/api/road/${routeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRouteData(res.data.result);
      } catch (err) {
        console.error("루트 상세 정보 불러오기 실패:", err);
      }
    };

    if (routeId) fetchRouteDetail();
  }, [routeId]);

  if (!routeData) return <div>Loading...</div>;

  
  //경유 검색 api 연동 (기본적인 틀은 경로 검색이랑 똑같습니다다)
 const handleSearchRoute = async () => {
  if (!routeData || !Array.isArray(routeData.places)) return;

  const places = routeData.places;
  let originName, destinationName, waypointName;

  // 장소가 2개일 경우엔 출발지 - 목적지
  if (places.length === 2) {
    originName = places[0]?.name;
    destinationName = places[1]?.name;
  }
  // 장소가 3개일 경우엔 출발지 - 경유지 - 목적지
  else if (places.length === 3) {
    originName = places[0]?.name;
    waypointName = places[1]?.name;
    destinationName = places[2]?.name;
  } else {
    console.warn('장소 개수가 2개 또는 3개가 아닙니다.');//일단 장소 1개면 경로 검색 못하게 막아놓기 
    return;
  }

  try {
    const response = await axios.get(`${VITE_BASE_URL}/api/maps`, {
      params: {
        originName,
        destinationName,
        ...(waypointName ? { waypointName } : {}), // 경유지 있을 때만 포함
      },
    });

    const data = response.data;
    const routeList = data?.result?.routes || [];

    if (data.isSuccess && Array.isArray(routeList)) {
      setRoutes(routeList);

      const defaultPolyline = routeList[0]?.polyline;
      if (defaultPolyline?.length > 0) {
        localStorage.setItem('currentPolyline', JSON.stringify(defaultPolyline));
        window.dispatchEvent(new Event('polylineChanged'));
      }
    } else {
      console.error('경로가 없습니다:', data?.message);
    }
  } catch (err) {
    console.error('경로 검색 실패:', err);
  }
};




  return (
    <div className={styles.route}>
      <div className={styles.scroll}>
        <RouteHeader
          routeName={routeData.name}
          description={routeData.description}
          imageUrl={routeData.routeImgUrl}
        />
        <div className={styles.div}>
          <Author imageUrl={routeData.routeImgUrl} />
          <NickName name={routeData.creatorNickname} />
          <BookMark type="route" routeId={routeData.routeId} />
          <Likes type="route" routeId={routeData.routeId} />
          <ShareRoad routeId={routeData.routeId} />
        </div>
        {routeData.places.map((place, idx) => (
          <RouteStepCard
            key={idx}
            step={place.sequence}
            name={place.name}
            time={place.open_hours}
            address={place.address}
            phone={place.phone}
            color={place.isPrimaryPlace ? 'pink' : 'gray'}
          />
        ))}
        <SearchingRoad isEnabled onSearchClick={handleSearchRoute} />
        <TransportModes routeData={routes} /> 
        <RatingCard
          averageRating={routeData.avgRates}
          userRating={0}
          onRate={(rating) => {
            // 여기 별점 연결 해주세요!!!!
          }}
        />
      </div>
    </div>
  );
};

export default SearchingRoutePopup;
