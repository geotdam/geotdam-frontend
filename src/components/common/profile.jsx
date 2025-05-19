import { useState, useCallback } from 'react'
import styles from './profile.module.css'

import profileImage from '../../assets/mock/profile.svg'
import LoginPopup from '../../features/Account/Login'

const Profile = () => {
    // 로그인 여부, 여기 백엔드 연결 필요~~
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // 로그인 팝업 표시 여부
    const [showLogin, setShowLogin] = useState(false)

    const onProfileClick = useCallback(() => {
        if (!isLoggedIn) {
            setShowLogin(true)
        } else {
            // 이미 로그인 된 상태
        }
    }, [isLoggedIn])

    const handleCloseLogin = () => {
        setShowLogin(false)
    }

    return (
        <>
        {/* 사용자 이미지로 변경 필요 */}
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