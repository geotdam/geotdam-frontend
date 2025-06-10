import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const MyBookmarkList = {
  /**
   * 북마크한 루트 리스트를 조회하는 API
   * @param {number} cursor - 다음 페이지 조회를 위한 커서 값 (optional)
   * @param {number} limit - 한 번에 가져올 아이템 수 (optional)
   * @returns {Promise} - 북마크 리스트 응답
   */
  getBookmarkedRoutes: async (cursor = null, limit = 10) => {
    try {
      // 토큰 가져오기
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('토큰이 없습니다.');
      }

      // API 요청 설정
      const config = {
        method: 'GET',
        url: `${BASE_URL}/api/mypages/bookmarks`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          ...(cursor && { cursor }), // cursor가 있을 때만 params에 포함
          limit
        }
      };

      const response = await axios(config);

      // 응답 데이터 안전성 검사
      if (!response.data) {
        throw new Error('응답 데이터가 없습니다.');
      }

      if (!response.data.isSuccess) {
        throw new Error(response.data.message || '북마크 리스트를 가져오는데 실패했습니다.');
      }

      return response.data;

    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        
        // HTTP 상태 코드별 에러 처리
        switch (status) {
          case 400:
            throw new Error(data.message || '잘못된 요청입니다.');
          case 401:
            throw new Error('토큰이 없거나 만료되었습니다.');
          case 404:
            if (data.code === 'USER404') {
              throw new Error('해당 사용자를 찾을 수 없습니다.');
            } else if (data.code === 'BOOKMARK404') {
              throw new Error('북마크한 루트를 찾을 수 없습니다.');
            }
            throw new Error(data.message || '리소스를 찾을 수 없습니다.');
          default:
            if (data.code === 'TOKEN4001') {
              throw new Error('토큰이 만료되었습니다. 다시 로그인해주세요.');
            }
            throw new Error(data.message || '북마크 리스트를 가져오는데 실패했습니다.');
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

export default MyBookmarkList; 