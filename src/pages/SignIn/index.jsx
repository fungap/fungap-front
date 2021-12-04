import React, { useEffect } from 'react';
// components
import {
  GoogleSignIn,
  KakaoSignIn,
  NaverSignIn,
  SignInButton,
  SignUpButton,
} from '@components';
// css
import style from './signin.module.css';

const SignIn = props => {
  useEffect(() => {
    // kakao
    const kakaoScript = document.createElement('script');
    kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    document.head.appendChild(kakaoScript);

    kakaoScript.onload = () => {
      window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.bg}></div>
      <h2 className={style.logo}>logo</h2>
      <div className={style.socialLogin}>
        <KakaoSignIn />
        <NaverSignIn />
        <GoogleSignIn />
        <p className={style.or}>또는</p>
        <SignInButton />
        <SignUpButton />
      </div>
    </div>
  );
};

export default SignIn;
