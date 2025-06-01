import { useCallback } from 'react';

import styles from './Login.module.css';

import Icon from '../../components/common/Icon';
import closeIcon from '../../assets/icons/close.svg';
 
const Login = ({ onClose }) => {
  // 구글 로그인
  const handleGoogleLogin = useCallback(async () => {
    try {
      // 구글 로그인 API 호출
      const res = await fetch('/api/auth/google', { method: 'POST' });
      const data = await res.json();
      console.log('Google login success', data);
      onClose();
    } catch (err) {
      console.error('Google login failed', err);
    }
  }, [onClose]);

  // 카카오 로그인
  const handleKakaoLogin = useCallback(async () => {
    try {
      // 카카오 로그인 API 호출
      const res = await fetch('/api/auth/kakao', { method: 'POST' });
      const data = await res.json();
      console.log('Kakao login success', data);
      onClose();
    } catch (err) {
      console.error('Kakao login failed', err);
    }
  }, [onClose]);

  // 이메일 로그인
  const handleEmailLogin = useCallback(async () => {
    try {
      // 이메일 로그인 API 호출
      const res = await fetch('/api/auth/email', { method: 'POST' });
      const data = await res.json();
      console.log('Email login success', data);
      onClose();
    } catch (err) {
      console.error('Email login failed', err);
    }
  }, [onClose]);

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
        <button className={`${styles.methodButton} ${styles.google}`}>
          <img className={styles.icon} src="Icon/Google.svg" alt="Google Logo" />
          <span>Continue with Google</span>
        </button>

        <button className={`${styles.methodButton} ${styles.kakao}`}>
          <img className={styles.icon} src="Icon/Kakao.svg" alt="Kakao Logo" />
          <span>카카오 로그인</span>
        </button>

        <button className={`${styles.methodButton} ${styles.email}`}>
          <img className={styles.icon} src="Icon/Email.svg" alt="Email Icon" />
          <span>이메일로 시작하기</span>
        </button>
      </div>
    </div>
  </div>
  );
};

export default Login;
