import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ReportFooter from '../../../components/ReportFooter/ReportFooter';
import styles from '../../../components/Search/Search.module.css';
import searchIcon from '../../../assets/icons/searchIcon.svg';
import Contents from '../MyPage/Contents';
import SearchingRoutePopup from './SearchingRoutePopup';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const SearchingRoute = () => {
  
  const [query, setQuery] = useState('');
  const [routes, setRoutes] = useState([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  // const handleSelectRoute = useCallback((routeId) => {
  //  setSelectedRouteId(routeId);
  //  }, []);

  const fetchRoutes = useCallback(async (searchQuery) => {
  setLoading(true);
  setError(null);
  const token = localStorage.getItem('token'); // localStorage에서 토큰 읽기
  const headers = { Authorization: token ? `Bearer ${token}` : undefined };
  //console.log('[루트검색] 요청 시작:', searchQuery, token);
  //console.log('[루트검색] 요청 헤더:', headers);
  try {
    const res = await axios.get(`${VITE_BASE_URL}/api/road/search`, {//사용자들이 만든 루트 검색 api 호출
      params: { query: searchQuery },
      headers,
    });
    console.log('[루트검색] 응답 데이터:', res.data);
    const data = res.data;
    if (data.isSuccess && data.result && Array.isArray(data.result.roads)) {
      setRoutes(data.result.roads);
    } else {
      setRoutes([]);
    }
  } catch (e) {
    console.error('[루트검색] 에러:', e);
    setError('검색에 실패했습니다.');
    setRoutes([]);
  } finally {
    setLoading(false);
  }
}, []);
  
  const onSearchClick = useCallback(() => {
    // 검색어 없는 경우
    const trimmed = query?.trim();
    if (!trimmed) return;
     fetchRoutes(trimmed)

    //navigate(`${VITE_BASE_URL}?query=${encodeURIComponent(trimmed)}`);
  }, [query, navigate]); // 검색어가 없는 경우 
 
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      onSearchClick(e.target.value);
    }
  }, [onSearchClick]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

 const contentsData = routes.map((route) => ({
    routeId: route.routeId,
    name: route.name,
    routeImgUrl: route.thumbnail_url,
    avgRates: null,
    places: [],
    like_count: route.like_count,
    review_count: route.review_count,
    description: route.description,
  }));

  return (
    <>
      <div className={styles.startSearchBar}>
        <input
          type="text"
          className={styles.searchText}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="루트 검색"
        />
        <img
          className={styles.SearchIcon}
          src={searchIcon}
          alt="searchIcon"
          onClick={onSearchClick}
        />
      </div>
      {loading && <div>검색 중...</div>}
      {error && <div>{error}</div>}
      <Contents data={contentsData} tab={activeTab} onSelectRoute={setSelectedRouteId} />
      <ReportFooter />
      {selectedRouteId && (
        <SearchingRoutePopup
          routeId={selectedRouteId} // 현재 선택된 루트 정보를 SearchingRoutePopup으로 전달 
          onClose={() => setSelectedRouteId(null)}
        />
      )}
    </>
  );
};

export default SearchingRoute;