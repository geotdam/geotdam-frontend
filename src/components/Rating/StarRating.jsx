import styles from './RatingCard.module.css';
import starIcon from '../../assets/icons/star.svg';

const StarRating = ({ value = 0, onRate, editable = false }) => {
  return (
    <div className={styles.starContainer}>
    {Array.from({ length: 5 }, (_, i) => (
      <img
        key={i}
        src={starIcon}
        alt={`${i + 1}점`}
        onClick={editable ? () => onRate?.(i + 1) : undefined}
        style={{
          opacity: i < value ? 1 : 0.3,
          cursor: editable ? 'pointer' : 'default',
        }}
      />
    ))}
  </div>
  );
};

export default StarRating;
