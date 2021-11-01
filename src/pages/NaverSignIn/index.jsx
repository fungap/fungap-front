import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { userActions } from '../../redux/modules/user';
import style from './naver.module.css';

const NaverSignIn = () => {
  const { naver } = window;
  const dispatch = useDispatch();
  const NAVER_CALLBACK_URL = 'http://localhost:3000/signin';
  const NAVER_CLIENT_ID = 'cfGvQRAUw4xlsdgrxGLI';

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: '30' },
    });
    naverLogin.init();

    dispatch(userActions.signinNaverDB(naverLogin?.accessToken?.accessToken));
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return <div id='naverIdLogin' className={style.btn}></div>;
};

export default NaverSignIn;
