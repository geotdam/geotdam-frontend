import styles from './NearByBench.module.css';

import Title from '../common/Title/Title';
import pin from '../../assets/icons/pin.svg';
import benchMarking from '../../assets/icons/benchMarking.svg';
import Icon from '../common/Icon';

const NearbyBench = () => {
  return (
    <div className={styles.nearbyBenchContainer}>
      <div className={styles.header}>
        <Title text="Nearby bench" />
        <img className={styles.pinIcon} alt="위치 핀 아이콘" src={pin} />
      </div>
      <div className={styles.benchItem}> 
        <Icon src={benchMarking} alt="벤치 아이콘" backgroundColor="#F3A5B2"/>
        <div className={styles.benchText}>Near to [장소이름-백엔드에서 받아옴]</div>
      </div>
    </div>
  );
};

export default NearbyBench;