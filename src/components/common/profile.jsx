import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './profile.module.css'

import profileImage from '../../assets/mock/profile.svg'
import LoginPopup from '../../features/Account/Login'

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(null);

    const fetchUserInfo = async (token) => {
    if (!token) return null;

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/social`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('유저 정보 요청 실패');
      const data = await response.json();
      return data.user || null;
    } catch (error) {
      console.error('유저 정보 불러오기 실패:', error);
      return null;
    }
  };

    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');

    // 1) URL에서 토큰이 오면 저장 및 사용자 정보 가져오기
    if (tokenFromUrl) {
      console.debug('🔐 토큰 감지됨:', tokenFromUrl);
      localStorage.setItem('token', tokenFromUrl);

      fetchUserInfo(tokenFromUrl).then((userData) => {
        if (userData) {
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          setIsLoggedIn(true);
          console.debug('👤 유저 정보 저장 완료:', userData);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }

        // URL에서 토큰 제거 및 페이지 새로고침 없이 상태 업데이트
        window.history.replaceState({}, '', window.location.pathname);
      });
    } 
  }, [location]);
  
  // 2) 컴포넌트 마운트 시 로컬스토리지에서 상태 복원
    useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      } catch (err) {
        console.error('유저 정보 파싱 실패:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsLoggedIn(false);
      }
    }
  }, []);

    const onProfileClick = useCallback(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setShowLogin(true);
        } else {
            // 로그인 상태이면 무조건 마이페이지로 이동
            navigate('/mypage');
        }
    }, [navigate]);    

    const handleCloseLogin = () => {
        setShowLogin(false);
        // 로그인 팝업이 닫힐 때 로그인 상태 다시 체크
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    };

    return (
        <>
            <img
                className={styles.profile}
                src={profileImage}
                alt="사용자 프로필"
                onClick={onProfileClick}
            />

            {showLogin && (
                <LoginPopup onClose={handleCloseLogin} />
            )}
        </>
    );
}

export default Profile;