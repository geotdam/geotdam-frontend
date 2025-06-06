import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

import styles from './Search.module.css'

import searchIcon from '../../assets/icons/searchIcon.svg'; 

const StartSearch = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const onSearchClick = useCallback(() => {
        // 검색어 없는 경우
        const trimmed = query?.trim();
        if (!trimmed) return;
        // /searchingPlace 페이지로 이동
        navigate(`/searchingPlace?query=${encodeURIComponent(trimmed)}`);
    }, [query, navigate]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            onSearchClick(e.target.value);
        }
    }, [onSearchClick]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

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
            <img className={styles.SearchIcon} src={searchIcon} alt="searchIcon" onClick={onSearchClick} />
        </div>
    );
};

export default StartSearch;