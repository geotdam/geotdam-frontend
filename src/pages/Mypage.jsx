import React, { useEffect, useState } from 'react';
import styles from '../assets/css/pages/mypage.module.css';
import profileImage from '../assets/mock/profile.svg';

const Mypage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // localStorage에서 사용자 정보 가져오기
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setUserData(user);
        }
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.mypage}>
            <div className={styles.profile}>
                <img 
                    src={profileImage} 
                    alt="프로필 이미지" 
                    className={styles.profileImage}
                />
                <h2 className={styles.nickname}>{userData.nickname || '사용자'}</h2>
                <p className={styles.email}>{userData.email}</p>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h3>나의 루트</h3>
                    <div className={styles.routes}>
                        <p>아직 생성한 루트가 없습니다.</p>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>북마크한 루트</h3>
                    <div className={styles.bookmarks}>
                        <p>아직 북마크한 루트가 없습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mypage;