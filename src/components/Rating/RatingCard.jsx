import styles from './RatingCard.module.css';

import Title from '../common/Title/Title';
import StarRating from './StarRating';

const RatingCard = ({ averageRating, userRating, onRate }) => {
  return (
    <div className={styles.ratingSection}>
      <Title text="Rates" /> 
      <div className={styles.ratingContentBox}>
        <div className={styles.averageRatingBox}>
          <div className={styles.label}>Average Rating</div>
          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              <StarRating value={Math.round(averageRating)} />
            </div>
            <div className={styles.more}>{averageRating.toFixed(1)}</div>
            <div className={styles.more}>More</div>
          </div>
        </div>

        <div className={styles.userRatingBox}>
          <div className={styles.label}>Rate This Place</div>
          <div className={styles.stars}>
            <StarRating value={userRating} onRate={onRate} editable />
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default RatingCard;
