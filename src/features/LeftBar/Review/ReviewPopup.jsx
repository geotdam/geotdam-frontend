import { useEffect, useState } from 'react';
import axios from 'axios';

import NickName from '../../../components/common/NickName';
import Title from '../../../components/common/Title/Title';
import Profile from '../../../components/common/profile';
import StarRating from '../../../components/Rating/StarRating';

import styles from './ReviewPopup.module.css';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const ReviewPopup = ({ tmapPlaceId, placeName, onClose }) => {
  const [reviews, setReviews] = useState([]);
useEffect(() => {
  console.log('[디버그] 받은 tmapPlaceId:', tmapPlaceId);
}, [tmapPlaceId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${VITE_BASE_URL}/api/places/${tmapPlaceId}/reviews`, {
          params: {
            page: 1,
            limit: 10,
          },
        });

        if (res.data.isSuccess) {
          setReviews(res.data.result.reviews);
          console.log("리뷰 페이징:", res.data.result.reviews);
        }
      } catch (err) {
        console.error('리뷰 가져오기 실패:', err);
      }
    };

    fetchReviews();
  }, [tmapPlaceId]);

  return (
    <div className={styles.route}>
      <div className={styles.scroll}>
        <div className={styles.div}>
          <Title text={placeName} />
        </div>
        <div className={styles.div4}>
          <Title text="Rates" />
          <div className={styles.div5}>
            {reviews.length === 0 ? (
              <div className={styles.api}>아직 리뷰가 없습니다.</div>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className={styles.div6}>
                  <div className={styles.div7}>
                    <Profile src={review.user?.profile_image} />
                    <NickName name={review.user?.nickname || '익명'} />
                  </div>
                  <div className={styles.stars}>
                    <StarRating value={review.rating} />
                  </div>
                  <div className={styles.api}>{review.content}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
