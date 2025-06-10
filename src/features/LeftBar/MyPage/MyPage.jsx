import { useEffect, useState } from 'react';
import axios from 'axios';

import ReportFooter from '../../../components/ReportFooter/ReportFooter';
import Contents from './Contents';
import TopNavigation from './TopNavigation';
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
        // 루트 북마크 호출!!! 여기 연결해주세요
      } else if (tab === 'placemark') {
        // 장소 북마크 호출!!! 여기 연결해주세요
      }
    } catch (err) {
      console.error('API 호출 실패:', err);
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
