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

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
    
        if (token) {
            console.log('토큰 감지됨:', token);
            localStorage.setItem('token', token);
            localStorage.setItem('accessToken', token);
    
            // 사용자 정보 가져오기 시도 (선택)
            fetchUserInfo(token).then(user => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                }
            });
    
            // URL에서 토큰 제거하고 새로고침
            window.history.replaceState({}, '', '/');
            window.location.reload();
        } else {
            // 초기 로그인 상태 체크
            const savedToken = localStorage.getItem('token');
            setIsLoggedIn(!!savedToken);
        }
    }, [location]);

    // fetchUserInfo 함수도 Profile 컴포넌트에 추가
    const fetchUserInfo = async (token) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('유저 정보 요청 실패');
            return await response.json();
        } catch (error) {
            console.error('유저 정보 불러오기 실패:', error);
            return null;
        }
    };

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