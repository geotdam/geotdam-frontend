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
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

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
