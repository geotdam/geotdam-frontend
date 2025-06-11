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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

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
      setBenchData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // 로그인이 되어있지 않으면 데이터를 가져오지 않음
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }
    // 초기 데이터 로드
    fetchBenchData(true);

    // 위치 데이터가 변경될 때만 갱신하도록 수정
    const handleStorageChange = (e) => {
      if (e.key === 'currentLocation') {
        fetchBenchData(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // 5분마다 한 번씩만 갱신 (너무 자주 갱신하지 않도록)
    const intervalId = setInterval(() => {
      fetchBenchData(false);
    }, 5 * 60 * 1000); // 5분

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className={styles.nearbyBenchContainer}>
        <div className={styles.header}>
          <Title text="Nearby bench" />
          <PinMark />
        </div>
        <div className={styles.loginPrompt}>
          주변 벤치를 보려면 <strong>로그인</strong>하세요.
        </div>
      </div>
    );
  }
  
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