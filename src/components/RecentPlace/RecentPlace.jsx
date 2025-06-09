import { useEffect, useState } from 'react';
import styles from './RecentPlace.module.css';

import Title from '../common/Title/Title';
import searchIcon from '../../assets/icons/searchIconWhite.svg';
import Icon from '../common/Icon';

const RecentPlace = () => {
  const [recentPlaces, setRecentPlaces] = useState([]);

  useEffect(() => {
    const storedPlaces = localStorage.getItem('recentPlaces');
    if (storedPlaces) {
      setRecentPlaces(JSON.parse(storedPlaces));
    }
  }, []);

  return (
    <div className={styles.recentPlaceContainer}>
      <Title text="Recent Place" />
      <div className={styles.recentPlaceList}>
        {recentPlaces.map((place, index) => (
          <div
            key={index}
            className={index === 0 ? styles.placeItem : styles.placeItem2}
          >
            <Icon src={searchIcon} alt="검색 아이콘" backgroundColor="#ABBFDA" />
            <div className={styles.placeText}>{place}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPlace;