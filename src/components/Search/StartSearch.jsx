import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Search.module.css';
import searchIcon from '../../assets/icons/searchIcon.svg';

const StartSearch = ({ onInputChange }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onInputChange) {
      onInputChange(value); // 출발지 텍스트 입력 실시간 전달
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
    // 검색어 없는 경우
      const trimmed = query.trim();
      if (trimmed) {
         // /searchingPlace 페이지로 이동
        navigate(`/searchingPlace?query=${encodeURIComponent(trimmed)}`);
      }
    }
  }, [query, navigate]);

  const onSearchClick = useCallback(() => {
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/searchingPlace?query=${encodeURIComponent(trimmed)}`);
    }
  }, [query, navigate]);

  return (
    <div className={styles.startSearchBar}>
      <input
        type="text"
        className={styles.searchText}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="출발지"
      />
      <img
        className={styles.SearchIcon}
        src={searchIcon}
        alt="searchIcon"
        onClick={onSearchClick}
      />
    </div>
  );
};

export default StartSearch;
