import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportFooter from '../../../components/ReportFooter/ReportFooter';
import styles from '../../../components/Search/Search.module.css';
import searchIcon from '../../../assets/icons/searchIcon.svg';
import Contents from '../MyPage/Contents';

const SearchingRoute = () => {
  // 여기 참고
  const data = [
    {
      routeId: 1,
      name: '서울 핫플 투어',
      creatorNickname: '홍길동',
      routeImgUrl: 'https://example.com/image1.jpg',
      avgRates: 4.5,
      places: [
        { name: '광화문', sequence: 1 },
        { name: '북촌 한옥마을', sequence: 2 }
      ]
    }
  ]

  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const onSearchClick = useCallback(() => {
    // 검색어 없는 경우
    const trimmed = query?.trim();
    if (!trimmed) return;

    navigate(`${basePath}?query=${encodeURIComponent(trimmed)}`);
  }, [query, location, navigate]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      onSearchClick(e.target.value);
    }
  }, [onSearchClick]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

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
      <Contents data={data} tab={activeTab} onSelectRoute={setSelectedRouteId} />
      <ReportFooter />
    </>
  );
};

export default SearchingRoute;