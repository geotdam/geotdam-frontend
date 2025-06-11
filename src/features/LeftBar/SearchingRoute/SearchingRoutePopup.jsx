import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchingRoutePopup.module.css";

import RouteHeader from "../../../components/MyRoute/RouteHeader";
import RouteStepCard from "../../../components/MakeRoute/RouteStepCard";
import RatingCard from "../../../components/Rating/RatingCard";
import BookMark from "../../../components/Button/BookMark";
import Likes from "../../../components/Button/likes";
import SearchingRoad from "../../../components/Button/SearchingRoad";
import useUser from "../../../apis/useUser";
import RouteCreator from "../../../components/common/RouteCreator";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const SearchingRoutePopup = ({ routeId, onClose }) => {
  const [searchParams] = useSearchParams();
  const [routeData, setRouteData] = useState(null);
  const creatorInfo = useUser(routeData?.userId);
  
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
        const routeResult = res.data.result;
        setRouteData(res.data.result);

        console.log('루트 상세 데이터:', routeResult);
      } catch (err) {
        console.error("루트 상세 정보 불러오기 실패:", err);
      }
    };

    if (routeId) fetchRouteDetail();
  }, [routeId]);

  if (!routeData) return <div>Loading...</div>;

  return (
    <div className={styles.route}>
      <div className={styles.scroll}>
        <RouteHeader
          routeName={routeData.name}
          description={routeData.description}
          imageUrl={routeData.routeImgUrl}
        />
       <div className={styles.div}>
          <RouteCreator profileUrl={creatorInfo?.profileImage} nickname={creatorInfo?.nickname}/>
          <BookMark type="route" routeId={routeData.routeId} />
          <Likes type="route" routeId={routeData.routeId} />
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
        <SearchingRoad />
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
