import { useState } from 'react';
import styles from './RatingCard.module.css';

import Title from '../common/Title/Title';
import StarRating from './StarRating';
import MakeReview from '../../features/LeftBar/Review/MakeReview';

const RatingCard = ({ averageRating, userRating, onRate }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [clickedRating, setClickedRating] = useState(userRating);

  const handleRateClick = (rating) => {
    setClickedRating(rating);
    setIsReviewOpen(true);
  };

  const handleReviewSubmit = (rating, comment) => {
    onRate(rating); // 여기 별점 api
    setIsReviewOpen(false);
    // 여기 리뷰(텍스트) api
  };


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
          <StarRating
            value={userRating}
            onRate={handleRateClick}
            editable
          />
        </div>
      </div>

      {isReviewOpen && (
        <MakeReview
          initialRating={clickedRating}
          onSubmit={handleReviewSubmit}
          onClose={() => setIsReviewOpen(false)}
        />
      )}
    </div>
  );
};

export default RatingCard;
