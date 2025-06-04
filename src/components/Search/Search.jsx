import { useState, useCallback } from 'react'
import styles from './Search.module.css'

import searchIcon from '@assets/icons/searchIcon.svg';
import Profile from '../common/profile'

const Search = () => {
    const [query, setQuery] = useState('');

    const onSearchClick = useCallback(() => {
        const trimmed = query?.trim();
        if (!trimmed) return;
        console.log('검색 요청:', trimmed);
        // 검색 API 연결
    }, [query]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            onSearchClick(e.target.value);
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

export default Search;