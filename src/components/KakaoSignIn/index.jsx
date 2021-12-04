import React from 'react';
// redux
import { useDispatch } from 'react-redux';
import { userActions } from '@redux/modules/user';
// css
import style from './kakao.module.css';

const KakaoSignIn = props => {
  const dispatch = useDispatch();

  const handClick = e => {
    e.preventDefault();

    window.Kakao.Auth.login({
      success: function(authObj) {
        dispatch(userActions.signinKakaoDB(authObj));
      },
      fail: function(err) {
        console.log(JSON.stringify(err));
      },
    });
  };

  return (
    <div className={style.wrap}>
      <button className={style.btn} onClick={handClick}>
        카카오 로그인 버튼
      </button>
    </div>
  );
};

export default KakaoSignIn;
