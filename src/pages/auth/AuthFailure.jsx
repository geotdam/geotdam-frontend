import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후 메인 페이지로 리다이렉트
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      gap: '1rem'
    }}>
      <h2>로그인 실패</h2>
      <p>로그인에 실패했습니다. 잠시 후 메인 페이지로 이동합니다.</p>
    </div>
  );
};

export default AuthFailure; 