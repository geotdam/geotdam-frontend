import styles from './searchingRoad.module.css'
import walkIcon from '../../assets/icons/walk.svg';

const SearchingRoad = () => {
  return (
    <div className={styles.div}>
        <div className={styles.div1}>
            <img className={styles.directionsWalkIcon} alt="" src={walkIcon} />
            <div className={styles.div2}>경로 검색</div>
        </div>
    </div>);
};

export default SearchingRoad; 
