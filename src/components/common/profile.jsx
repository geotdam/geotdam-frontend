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
        // 로컬 스토리지에서 토큰을 확인하여 로그인 상태 체크
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        // URL에 token이 있으면 홈으로 리다이렉트
        if (location.search.includes('token=')) {
            window.history.replaceState({}, '', '/');
        }
    }, [location]);

    const onProfileClick = useCallback(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setShowLogin(true);
        } else {
            // 현재 경로가 홈이 아니면 홈으로 이동
            if (location.pathname !== '/') {
                navigate('/');
            } else {
                // 홈에서만 마이페이지로 이동
                navigate('/mypage');
            }
        }
    }, [navigate, location]);

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