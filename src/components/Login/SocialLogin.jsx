import React from 'react';
import kakaoLoginBtn from '../../assets/img/kakao_login_medium_narrow.png';

const SocialLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  return (
    <div>
      <h2>소셜 로그인</h2>
      <a href={KAKAO_AUTH_URL}>
        <img
          src={kakaoLoginBtn}
          alt="카카오 로그인"
          style={{ width: '200px' }}
        />
      </a>
    </div>
  );
};

export default SocialLogin;
