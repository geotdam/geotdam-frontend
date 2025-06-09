import styles from './PlaceHeader.module.css';

import Title from '../common/Title/Title';
import BookMark from '../Button/BookMark';

const PlaceHeader = ( { place }) => {
  return (
    <div className={styles.headerContainer}>
      <img className={styles.thumbnail} src="src/assets/mock/thumb.jpg" alt="썸네일" />
      <div className={styles.headerContent}>
        <div className={styles.titleBlock}>
          <Title text={place.place_name || '장소 이름 없음'} />
          <div className={styles.categoryRating}> {place.bizCategory || '카테고리 없음'} ★ {"!!! 장소 별점 연동 !!!"}</div>
        </div>
        <BookMark type="place" />
      </div>
    </div>
  );
};

export default PlaceHeader;
