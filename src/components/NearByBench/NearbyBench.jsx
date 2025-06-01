import styles from './NearByBench.module.css';

import Title from '../common/Title/Title';
import BenchMark from '../Icon/BenchMark';
import PinMark from '../Button/PinMark';

const NearbyBench = () => {
  return (
    <div className={styles.nearbyBenchContainer}>
      <div className={styles.header}>
        <Title text="Nearby bench" />
        <PinMark />
      </div>
      <div className={styles.benchItem}> 
        <BenchMark />
        <div className={styles.benchText}>Near to [장소이름-백엔드에서 받아옴]</div>
      </div>
    </div>
  );
};

export default NearbyBench;