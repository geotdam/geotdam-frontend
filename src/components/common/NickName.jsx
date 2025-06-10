import styles from './NickName.module.css'
import { useState, useEffect } from "react";

const NickName = () => {
    const [nickname, setNickname] = useState("");

    useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/social`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('유저 정보 요청 실패');
        }

        const { user } = await response.json();
        setNickname(user?.nickname || "알 수 없음");
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

    return (
        <div className={styles.div1}>{nickname}</div> 
    );
};

export default NickName;