import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LocationRecommendBench = {
  /**
   * 현재 위치 주변 벤치 정보를 가져오는 API (반경 1km 이내)
   * @returns {Promise} - 벤치 정보 응답 (장소명, 주소, 위경도 포함)
   */
  getNearbyBenches: async () => {
    try {
      console.log('=== LocationRecommendBench API 호출 시작 ===');
      
      // 토큰 가져오기
      const token = localStorage.getItem('token');
      console.log('저장된 토큰:', token);
      
      if (!token) {
        throw new Error('토큰이 없습니다.');
      }

      // localStorage에서 현재 위치 정보 가져오기
      const currentLocationStr = localStorage.getItem('currentLocation');
      console.log('localStorage에서 가져온 위치 데이터:', currentLocationStr);
      
      if (!currentLocationStr) {
        throw new Error('현재 위치 정보가 없습니다.');
      }

      const currentLocation = JSON.parse(currentLocationStr);
      console.log('파싱된 위치 데이터:', currentLocation);
      
      const { latitude: lat, longitude: lon } = currentLocation;
      console.log('사용할 위치 좌표:', { lat, lon });

      if (!lat || !lon) {
        throw new Error('위치 정보가 올바르지 않습니다.');
      }

      const requestConfig = {
        method: 'GET',
        url: `${BASE_URL}/api/locations/near/benches`,
        params: {
          lat,
          lon
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      console.log('API 요청 설정:', requestConfig);

      try {
        const response = await axios(requestConfig);
        console.log('API 응답 성공:', response);

        if (response.data.isSuccess) {
          console.log('벤치 데이터 조회 성공:', response.data.result);
          return response.data.result;
        }

        throw new Error(response.data.message || '벤치 정보를 가져오는데 실패했습니다.');
      } catch (axiosError) {
        console.error('Axios 에러 상세:', {
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
          config: axiosError.config,
          message: axiosError.message
        });
        throw axiosError;
      }
    } catch (error) {
      console.error('LocationRecommendBench 전체 에러:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
        status: error.response?.status
      });

      if (error.response) {
        const { data, status } = error.response;
        
        // HTTP 상태 코드별 에러 처리
        switch (status) {
          case 404:
            throw new Error('주변에 벤치가 없습니다.');
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
            throw new Error(data.message || '벤치 정보를 가져오는데 실패했습니다.');
        }
      }
      
      // 네트워크 에러나 기타 예외 처리
      if (error.message.includes('Network Error')) {
        throw new Error('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
      }
      throw new Error(error.message || '서버와의 통신에 실패했습니다.');
    }
  }
};

export default LocationRecommendBench; 