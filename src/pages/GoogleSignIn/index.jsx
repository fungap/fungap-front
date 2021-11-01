import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { userActions } from '../../redux/modules/user';
import style from './google.module.css';

const GoogleSignIn = props => {
  const dispatch = useDispatch();
  const googleLoginBtn = useRef(null);

  const googleSDK = () => {
    window.googleSDKLoaded = () => {
      //
      window.gapi.load('auth2', () => {
        //
        const auth2 = window.gapi.auth2.init({
          client_id:
            '942550805289-gh3e1gpfscr9itti0db6n8b7a67u1rm3.apps.googleusercontent.com',
        });

        //버튼 클릭시 사용자 정보 불러오기
        //(클릭 핸들러 연결 대상, 옵션, 성공로직, 실패로직)
        auth2.attachClickHandler(
          googleLoginBtn.current,
          {
            scope: 'profile email',
          },
          user => {
            const profile = user.getBasicProfile(); //프로필 정보
            const auth = user.getAuthResponse(); //인증 정보

            dispatch(userActions.signinGoogleDB(auth.access_token));

            console.log(`profile: ${profile}, auth: ${auth}`);
          },
          error => {
            console.log(JSON.stringify(error, undefined, 2));
          },
        );
      });
    };
    //구글 SDK 불러오기
    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];

      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk');
  };

  useEffect(() => {
    googleSDK();
  }, []);

  return (
    <div ref={googleLoginBtn} id='customBtn' className={style.wrap}>
      <button className={style.btn}>카카오 로그인 버튼</button>
    </div>
  );
};

export default GoogleSignIn;
