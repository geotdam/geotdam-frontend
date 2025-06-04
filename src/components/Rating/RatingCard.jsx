import styles from './RatingCard.module.css';

import Title from '../common/Title/Title';
import star from '../../assets/icons/bookMark.svg'

const RatingCard = () => {
  return (
    <div className={styles.ratingSection}>
      <Title text="Rates" /> 
      <div className={styles.ratingContentBox}>
        <div className={styles.averageRatingBox}>
          <div className={styles.label}>Average Rating</div>
          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              <img src={star} alt="star" />
              <img src={star} alt="star" />
              <img src={star} alt="star" />
              <img src={star} alt="star" />
              <img src={star} alt="star" />
            </div>
            <div className={styles.more}>More</div>
          </div>
        </div>

        <div className={styles.userRatingBox}>
          <div className={styles.label}>Rate This Place</div>
          <div className={styles.stars}>
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
