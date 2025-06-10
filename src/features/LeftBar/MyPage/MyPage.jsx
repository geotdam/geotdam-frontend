import { useEffect, useState } from 'react';
import axios from 'axios';

import ReportFooter from '../../../components/ReportFooter/ReportFooter';
import Contents from './Contents';
import TopNavigation from './TopNavigation';
import MyBookmarkList from '../../../apis/MyBookmarkList';
import MyPlaceBookmark from '../../../apis/MyPlaceBookmark';
import SearchingRoutePopup from '../SearchingRoute/SearchingRoutePopup';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('myroute');
  const [data, setData] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const fetchData = async (tab) => {
    try {
      const token = localStorage.getItem('token');
      let res;

      if (tab === 'myroute') {
        // 내가 만든 루트 조회 api
        res = await axios.get(`${VITE_BASE_URL}/api/road/myroots?page=1`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const resultData = res.data.result;
        if (Array.isArray(resultData)) {
          setData(resultData);
        } else {
          // 받아온 데이터 형식이 안 맞을 때
          setData([]);
        }
      } else if (tab === 'routemark') {
        // 루트 북마크 호출
        const response = await MyBookmarkList.getBookmarkedRoutes();
        if (response.isSuccess && Array.isArray(response.rresult)) {
          // 북마크된 루트 정보 추가 조회
          const routePromises = response.rresult.map(bookmark => 
            axios.get(`${import.meta.env.VITE_BASE_URL}/api/road/${bookmark.routeId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          );

          try {
            const routeResponses = await Promise.all(routePromises);
            const routeData = routeResponses
              .filter(res => res.data.isSuccess)
              .map(res => res.data.result);
            setData(routeData);
          } catch (error) {
            console.error('루트 상세 정보 조회 실패:', error);
            setData([]);
          }
        } else {
          setData([]);
        }
      } else if (tab === 'placemark') {
        // 장소 북마크 호출
        const response = await MyPlaceBookmark.getBookmarkedPlaces();
        if (response.isSuccess && Array.isArray(response.result)) {
          setData(response.result);
        } else {
          setData([]);
        }
      }
    } catch (err) {
      console.error('API 호출 실패:', err);
      setData([]); // 에러 발생 시 빈 배열로 설정
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  return (
    <>
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <Contents data={data} tab={activeTab} onSelectRoute={setSelectedRouteId} />
      <ReportFooter />

      {selectedRouteId && (
        <SearchingRoutePopup
          routeId={selectedRouteId}
          onClose={() => setSelectedRouteId(null)}
        />
      )}
    </>
  );
};

export default MyPage;
