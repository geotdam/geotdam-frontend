import React from 'react'
import { useState, useCallback, useEffect } from 'react'

import styles from './Login.module.css'

import Icon from '../../components/common/Icon'
import closeIcon from '../../assets/icons/close.svg'
import googleIcon from '../../assets/icons/Google.svg'
import kakaoIcon from '../../assets/icons/Kakao.svg'
import emailIcon from '../../assets/icons/Email.svg'
import Join from '../../features/Account/Join'
 
const Login = ({ onClose }) => {
  const [showJoin, setShowJoin] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  // 사용자 정보 가져오기
  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/api/auth`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      
      const userData = await response.json();
      console.log('User data:', userData); // 디버깅용
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  };

  // 소셜 로그인 성공 후 처리
  const handleLoginSuccess = async (token) => {
    if (!token) return;
    
    console.log('Received token:', token);
    localStorage.setItem('token', token);
    localStorage.setItem('accessToken', token);
    
    try {
      // 사용자 정보 가져오기
      const userData = await fetchUserInfo(token);
      if (userData) {
        console.log('Token stored, user data fetched');
        onClose();
        // URL에서 토큰 제거하고 홈으로 이동
        window.history.replaceState({}, '', '/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error in handleLoginSuccess:', error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      console.log('Token found in URL:', token);
      console.log('Current localStorage:', localStorage.getItem('token')); // 디버깅
      handleLoginSuccess(token).then(() => {
        console.log('After handleLoginSuccess - localStorage:', localStorage.getItem('token')); // 디버깅
      });
    }
  }, []);

  // 구글 로그인
  const handleGoogleLogin = useCallback(() => {
    window.location.href = `${VITE_BASE_URL}/api/auth/login/google`;
  }, [VITE_BASE_URL]);

  // 카카오 로그인
  const handleKakaoLogin = useCallback(() => {
    window.location.href = `${VITE_BASE_URL}/api/auth/login/kakao`;
  }, [VITE_BASE_URL]);

  // 이메일 로그인 버튼 클릭 → Join 컴포넌트로 전환
  const handleEmailClick = useCallback(() => {
    setShowJoin(true);
  }, []);

  // Join 컴포넌트에서 "뒤로" 또는 완료 후 돌아올 때 호출할 핸들러
  const handleJoinBack = useCallback(() => {
    setShowJoin(false);
  }, []);

  // Login 바깥의 전체 팝업을 닫을 때
  const handleClose = useCallback(() => {
    onClose();
    setShowJoin(false);
  }, [onClose]);

  // 만약 Join 화면을 띄운 상태라면 하위에 Join 컴포넌트 렌더
  if (showJoin) {
    return (
      <div className={styles.overlay}>
        <Join onClose={handleClose} onBack={handleJoinBack} />
      </div>
    );
  }

  return (<div className={styles.overlay}>
    <div className={styles.loginContainer}>
      <button className={styles.closeBtn} onClick={onClose}>
        <Icon src={closeIcon} alt="닫기" backgroundColor="transparent" />
      </button>

      <div className={styles.header}>
        <h2 className={styles.title}>로그인 &amp; 가입하기</h2>
        <p className={styles.subtitle}>
          로그인하고 <span className={styles.highlight}>걷는 경험</span>을 담아보세요.
        </p>
      </div>

      <div className={styles.methods}>
        <button className={`${styles.methodButton} ${styles.google}`} onClick={handleGoogleLogin}>
          <img className={styles.icon} src={googleIcon} alt="Google Logo" />
          <span>Continue with Google</span>
        </button>

        <button className={`${styles.methodButton} ${styles.kakao}`} onClick={handleKakaoLogin}>
          <img className={styles.icon} src={kakaoIcon} alt="Kakao Logo" />
          <span>카카오 로그인</span>
        </button>

        <button className={`${styles.methodButton} ${styles.email}`} onClick={handleEmailClick}>
          <img className={styles.icon} src={emailIcon} alt="Email Icon" />
          <span>이메일로 시작하기</span>
        </button>
      </div>
    </div>
  </div>
  );
};

export default Login;
