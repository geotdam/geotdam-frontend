import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      // 이곳에서 백엔드로 code를 전달하여 토큰 요청
      fetch('http://localhost:3000/api/oauth/kakao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
        .then(res => res.json())
        .then(data => {
          console.log('로그인 성공:', data);
          // 예: 토큰 저장
          localStorage.setItem('accessToken', data.accessToken);
          navigate('/');
        })
        .catch(err => {
          console.error('로그인 실패:', err);
        });
    }
  }, [navigate]);

  return <p>로그인 처리 중입니다...</p>;
};

export default Redirection;
