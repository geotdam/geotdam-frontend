import React, { useEffect, useState } from 'react';
import LocationRecommendBench from '../../apis/LocationRecommendBench';
import styles from './NearByBench.module.css';

import Title from '../common/Title/Title';
import BenchMark from '../Icon/BenchMark';
import PinMark from '../Button/PinMark';

const NearbyBench = () => {
  const [benchData, setBenchData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBenchData = async (isInitialLoad = false) => {
    try {
      // 초기 로딩이 아닌 경우에는 refreshing 상태만 설정
      if (isInitialLoad) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }
      setError(null);

      const result = await LocationRecommendBench.getNearbyBenches();
      console.log('받아온 벤치 데이터:', result);
      setBenchData(result);
    } catch (err) {
      console.error('벤치 데이터 가져오기 실패:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // 초기 데이터 로드
    fetchBenchData(true);

    // 위치 데이터가 변경될 때만 갱신하도록 수정
    const handleStorageChange = (e) => {
      if (e.key === 'currentLocation') {
        console.log('위치 데이터 변경 감지, 벤치 정보 갱신');
        fetchBenchData(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // 5분마다 한 번씩만 갱신 (너무 자주 갱신하지 않도록)
    const intervalId = setInterval(() => {
      console.log('주기적 벤치 정보 갱신');
      fetchBenchData(false);
    }, 5 * 60 * 1000); // 5분

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const renderBenchContent = () => {
    // 초기 로딩 시에만 Loading 표시
    if (loading) {
      return <div className={styles.benchText}>Loading...</div>;
    }

    if (error) {
      return <div className={styles.benchText}>{error}</div>;
    }

    if (!benchData || !benchData.benches || benchData.benches.length === 0) {
      return <div className={styles.benchText}>주변에 벤치가 없습니다.</div>;
    }

    // 첫 번째 벤치 정보만 표시
    const firstBench = benchData.benches[0];
    return (
      <div className={styles.benchInfo}>
        <div className={styles.benchAddress}>
          {firstBench.address || '주소 정보 없음'}
          {isRefreshing && <span className={styles.refreshing}>•</span>}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.nearbyBenchContainer}>
      <div className={styles.header}>
        <Title text="Nearby bench" />
        <PinMark />
      </div>
      <div className={styles.benchItem}>
        <BenchMark />
        {renderBenchContent()}
      </div>
    </div>
  );
};

export default NearbyBench;