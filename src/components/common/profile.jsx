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

    // 토큰 만료 처리 함수
    const handleTokenExpiry = useCallback(() => {
        console.warn('⏰ 토큰 만료, 로그아웃 처리됨');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        navigate('/');
    }, [navigate]);

    const fetchUserInfo = async (token) => {
        if (!token) return null;

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/social`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            
            if (response.status === 401) {
                handleTokenExpiry();
                return null;
            } 
            
            if (!response.ok) throw new Error('유저 정보 요청 실패');
            const data = await response.json();
            return data.user || null;
        } catch (error) {
            console.error('유저 정보 불러오기 실패:', error);
            return null;
        }
    };

    // 토큰 유효성 검사 함수
    const validateToken = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const response = await fetch('/api/auth/social', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            
            if (response.status === 401) {
                handleTokenExpiry();
                return false;
            }
            
            return response.ok;
        } catch (error) {
            console.error('토큰 검증 실패:', error);
            return false;
        }
    }, [handleTokenExpiry]);

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
  }, [validateToken]);

    // 3) 주기적 토큰 검증 - 토큰이 있을 때만 30초마다 검증
    useEffect(() => {
        let interval;
        
        if (isLoggedIn) {
            interval = setInterval(() => {
                const token = localStorage.getItem('token');
                if (token) {
                    validateToken();
                } else {
                    // 토큰이 없으면 로그아웃 상태로 변경
                    setIsLoggedIn(false);
                    setUser(null);
                }
            }, 30000); // 30초마다 검증
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isLoggedIn, validateToken]);

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
    const secureImageUrl = user?.imageUrl?.replace('http://', 'https://');
    const profileSrc = secureImageUrl || profileImage;
    
    return (
        <>
            <img
                className={styles.profile}
                src={profileSrc}
                alt="사용자 프로필"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = profileImage; // fallback 이미지 (예: 기본 동그란 아이콘)
                }}
                onClick={onProfileClick}
            />

            {showLogin && (
                <LoginPopup onClose={handleCloseLogin} />
            )}
        </>
    );
}

export default Profile;