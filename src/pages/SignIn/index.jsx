import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { history } from '../../redux/configureStore';
import { userActions } from '../../redux/modules/user';
import { GoogleSignIn, KakaoSignIn, NaverSignIn } from '../';
import style from './signin.module.css';

const icon = {
  position: 'absolute',
  left: '5px',
  top: '50%',
  transform: 'translateY(-50%)',
};

const SignIn = props => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ id: '', pwd: '' });
  const { id, pwd } = input;

  const handleChange = e => {
    const { value, name } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleClick = e => {
    e.preventDefault();
    const { tagName, classList } = e.target;

    if (tagName !== 'BUTTON') {
      return false;
    }

    if (classList.contains('btnSignIn')) {
      if (id === '' || pwd === '') {
        alert('다시 입력해주세요.');
        return false;
      }
      dispatch(userActions.signinDB(id, pwd));
    }
    if (classList.contains('btnSignUp')) {
      history.push('/signup');
    }
  };

  return (
    <div>
      <div className={style.bg}></div>
      <h2 className={style.logo}>logo</h2>
      <form className={style.form}>
        <p>
          <PersonOutlineIcon style={icon} />
          <label htmlFor='id'>아이디</label>
          <input
            name='id'
            defaultValue={id}
            type='text'
            placeholder='아이디'
            onChange={handleChange}
          />
        </p>
        <p>
          <LockOpenIcon style={icon} />
          <label htmlFor='pwd'>비밀번호</label>
          <input
            id='pwd'
            name='pwd'
            defaultValue={pwd}
            type='password'
            placeholder='비밀번호'
            onChange={handleChange}
          />
        </p>
        <div className={style.localLogin} onClick={handleClick}>
          <button className='btnSignIn'>로그인</button>
          <button className='btnSignUp'>회원가입</button>
        </div>
      </form>
      <div className={style.socialLogin} onClick={handleClick}>
        <KakaoSignIn />
        <NaverSignIn />
        <GoogleSignIn />
      </div>
    </div>
  );
};

export default SignIn;
