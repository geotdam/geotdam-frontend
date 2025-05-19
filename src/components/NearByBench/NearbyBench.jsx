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
        <div className={styles.benchText}>벤치 위치가 어떻게 리턴 되는지 확인 필요</div>
      </div>
    </div>
  );
};

export default NearbyBench;