import styles from './searchingRoad.module.css';
import walkIcon from '../../assets/icons/walk.svg';

const SearchingRoad = ({ isEnabled, onSearchClick }) => {
  return (
    <div className={styles.div}>
      <div
        className={styles.div1}
        style={{ cursor: isEnabled ? 'pointer' : 'not-allowed', opacity: isEnabled ? 1 : 0.4 }}
        onClick={isEnabled ? onSearchClick : null}
      >
        <img className={styles.directionsWalkIcon} alt="" src={walkIcon} />
        <div className={styles.div2}>경로 검색</div>
      </div>
    </div>
  );
};

export default SearchingRoad;
