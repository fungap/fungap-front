import React from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '@redux/modules/post';
// route
import { history } from '@redux/configureStore';
// components
import { PostList, Goback } from '@components';
// css
import style from './admin.module.css';

const Admin = props => {
  const dispatch = useDispatch();
  const defaultPost = useSelector(state => state.post.post);
  let result;

  const handleClick = () => {
    if (defaultPost.title !== '') {
      result = window.confirm('작성중인 글이 있습니다. 불러오시겠습니까?');
      !result && dispatch(postActions.resetPost());
    }

    history.push('/admin_write');
  };

  return (
    <>
      <Goback page='/userpage'>관리자 페이지</Goback>
      <div className={style.container}>
        <div className={style.postListBox}>
          <div className={style.buttonBox}>
            <button className={style.button} onClick={handleClick}>
              글작성
            </button>
          </div>
          <PostList isAdmin />
        </div>
      </div>
    </>
  );
};

export default Admin;
