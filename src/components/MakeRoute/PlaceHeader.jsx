import styles from './PlaceHeader.module.css';

import Title from '../common/Title/Title';
import BookMark from '../Button/BookMark';

const PlaceHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <img className={styles.thumbnail} src="src/assets/mock/thumb.jpg" alt="썸네일" />
      <div className={styles.headerContent}>
        <div className={styles.titleBlock}>
          <Title text="성신여자대학교" />
          <div className={styles.categoryRating}>카페 ★ 1.0</div>
        </div>
        <BookMark type="place" />
      </div>
    </div>
  );
};

export default PlaceHeader;
