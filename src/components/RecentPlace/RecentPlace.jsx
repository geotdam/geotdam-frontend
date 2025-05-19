import styles from './RecentPlace.module.css';

import Title from '../common/Title/Title';
import searchIcon from '../../assets/icons/searchIconWhite.svg';
import Icon from '../common/Icon';

const RecentPlace = () => {
  return (
    <div className={styles.recentPlaceContainer}>
      <Title text="Recent Place" />
      <div className={styles.recentPlaceList}>
        <div className={styles.placeItem}> 
          <Icon src={searchIcon} alt="검색 아이콘" backgroundColor="#ABBFDA"/>

          <div className={styles.placeText}>Sungshin University, Seongbuk-gu, Seoul</div>
        </div>
        <div className={styles.placeItem2}>
          <Icon src={searchIcon} alt="검색 아이콘" backgroundColor="#ABBFDA"/>
          <div className={styles.placeText}>Sungshin University, Seongbuk-gu, Seoul</div>
        </div>
      </div>
    </div>
  );
};

export default RecentPlace;