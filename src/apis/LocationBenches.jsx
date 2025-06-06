import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

class LocationBenches {
    static async getNearbyBenches() {
        try {
            // localStorage에서 현재 위치와 토큰 정보 가져오기
            const currentLocationStr = localStorage.getItem('currentLocation');
            const token = localStorage.getItem('token');

            if (!currentLocationStr || !token) {
                throw new Error('위치 정보 또는 토큰이 없습니다.');
            }

            const currentLocation = JSON.parse(currentLocationStr);
            const { latitude, longitude } = currentLocation;

            // API 요청 설정
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    lat: latitude,
                    lon: longitude
                }
            };

            // API 호출
            const response = await axios.get(`${BASE_URL}/api/location/benches`, config);
            console.log('API 응답:', response);

            // 응답 데이터 확인 및 반환
            if (response.status === 200 && response.data) {
                console.log('벤치 데이터 조회 성공:', response.data);
                return response.data;  // .result 제거
            } else {
                throw new Error('벤치 정보를 가져오는데 실패했습니다.');
            }

        } catch (error) {
            console.error('벤치 정보 조회 중 오류 발생:', error);
            throw error;
        }
    }
}

export default LocationBenches; 