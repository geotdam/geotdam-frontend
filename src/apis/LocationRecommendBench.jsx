import axios from 'axios';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const LocationRecommendBench = {
  /**
   * 현재 위치 주변 벤치 정보를 가져오는 API (반경 1km 이내)
   * @returns {Promise} - 벤치 정보 응답 (장소명, 주소, 위경도 포함)
   */
  getNearbyBenches: async () => {
    try {
      const currentLocation = localStorage.getItem('currentLocation');
      if (!currentLocation) {
        throw new Error('위치 정보가 없습니다.');
      }

      const { latitude, longitude } = JSON.parse(currentLocation);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await fetch(
        `${VITE_BASE_URL}/api/locations/near/benches?lat=${latitude}&lon=${longitude}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );

      if (!response.ok) {
        throw new Error('벤치 정보를 가져오는데 실패했습니다.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching nearby benches:', error);
      throw error;
    }
  }
};

export default LocationRecommendBench; 