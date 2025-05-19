import { useCallback } from 'react'
import styles from './Search.module.css'

import searchIcon from '../../assets/icons/SearchIcon.svg';
import Profile from '../common/profile'

const Search = () => {
    const onSearchClick = useCallback(() => {
        // 검색창 클릭
    }, []);

    return (
        <div className={styles.search}>
            <div className={styles.searchBar} onClick={onSearchClick}>
                <img className={styles.SearchIcon} src={searchIcon} alt="searchIcon" />
                <div className={styles.searchTxt}>Search Maps</div>
            </div>
            {/* 사용자 이미지로 변경 필요 */}
            <Profile />
        </div>
    );
};

export default Search;