import { useState } from 'react';
import styles from './MakeReview.module.css';
import StarRating from "../../../components/Rating/StarRating";

const MakeReview = ({ initialRating, onSubmit, onClose }) => {
    const [rating, setRating] = useState(initialRating);
    const [comment, setComment] = useState('');

    return (
        <div className={styles.overlay}>
            <div className={styles.makeReviewContainer}>
                <div className={styles.MakeRateHeader}>
                    <StarRating value={rating} onRate={setRating} editable />
                    <div className={styles.div2}>비방 목적 리뷰는 삭제 될 수 있습니다.</div>
                </div>
                <div className={styles.makeReviewBody}>
                    <textarea className={styles.comment} value={comment} onChange={(e) => setComment(e.target.value)} placeholder='리뷰 작성하기' />
                    <div className={styles.buttonBody}>
                        <button className={styles.button}>
                            <b className={styles.save} onClick={() => onSubmit(rating, comment)}>Save</b>
                        </button>
                        <button className={styles.button} onClick={onClose}>
                            <b className={styles.save}>Cancel</b>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeReview;