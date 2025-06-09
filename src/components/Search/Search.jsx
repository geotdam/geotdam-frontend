import { useState, useCallback } from 'react'
import styles from './Search.module.css'

import searchIcon from '../../assets/icons/searchIcon.svg';
import Profile from '../common/profile'

const Search = () => {
    const [query, setQuery] = useState('');

    const onSearchClick = useCallback(() => {
        const trimmed = query?.trim();
        if (!trimmed) return; 
        saveRecentPlace(trimmed); 
    }, [query]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            onSearchClick(e.target.value);
            saveRecentPlace(query);
        }
    }, [onSearchClick]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className={styles.search}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    className={styles.searchBar}
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search Maps"
                />
                <img className={styles.SearchIcon} src={searchIcon} alt="searchIcon" onClick={onSearchClick} />
            </div>
            <Profile />
        </div>
    );
};

const saveRecentPlace = (placeName) => {
  const stored = localStorage.getItem('recentPlaces');
  let places = stored ? JSON.parse(stored) : [];

  // 중복 제거
  places = places.filter((p) => p !== placeName);

  // 맨 앞에 추가
  places.unshift(placeName);

  // 최대 3개 저장
  if (places.length > 3) places = places.slice(0, 5);

  localStorage.setItem('recentPlaces', JSON.stringify(places));
};


export default Search;