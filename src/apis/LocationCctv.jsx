import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LocationCctv = {
  /**
   * 현재 위치 주변 CCTV 정보를 가져오는 API (반경 100m 이내)
   * @returns {Promise} - CCTV 정보 응답
   */
  getNearbyCctvs: async () => {
    try {
      // 토큰 가져오기
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('토큰이 없습니다.');
      }

      // localStorage에서 현재 위치 정보 가져오기
      const currentLocationStr = localStorage.getItem('currentLocation');
      
      if (!currentLocationStr) {
        throw new Error('현재 위치 정보가 없습니다.');
      }

      const currentLocation = JSON.parse(currentLocationStr);
      const { latitude, longitude } = currentLocation;

      if (!latitude || !longitude) {
        throw new Error('위치 정보가 올바르지 않습니다.');
      }

      const response = await axios({
        method: 'GET',
        url: `${BASE_URL}/api/markings/cctv`,
        params: {
          latitude,
          longitude
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.isSuccess) {
        return response.data.result;
      }

      throw new Error(response.data.message || 'CCTV 정보를 가져오는데 실패했습니다.');
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        
        // HTTP 상태 코드별 에러 처리
        switch (status) {
          case 404:
            throw new Error('주변에 CCTV가 없습니다.');
          case 400:
            throw new Error(data.message || '잘못된 요청입니다.');
          case 401:
            throw new Error('인증이 필요하거나 만료되었습니다.');
          case 403:
            throw new Error('접근 권한이 없습니다.');
          default:
            if (data.code === 'TOKEN4001') {
              throw new Error('토큰이 만료되었습니다. 다시 로그인해주세요.');
            } else if (data.code === 'COMMON4001') {
              throw new Error('현재 위치를 가져올 수 없습니다.');
            }
            throw new Error(data.message || 'CCTV 정보를 가져오는데 실패했습니다.');
        }
      }
      
      // 네트워크 에러나 기타 예외 처리
      if (error.message.includes('Network Error')) {
        throw new Error('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
      }
      throw error;
    }
  }
};

export default LocationCctv; 