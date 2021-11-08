import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../redux/configureStore';
import { postActions } from '../../redux/modules/post';
import { Post, SearchBar, Carousel } from '../../components';
import style from './home.module.css';

const Home = props => {
  const dispatch = useDispatch();
  const postList = useSelector(state => state.post.postList);

  const new4 = postList.slice(0, 4);
  const top4 = postList.slice(0, 4);

  const goContentsPage = () => {
    history.push('/contents');
  };
  useEffect(() => {
    dispatch(postActions.getPostDB());
  }, []);

  return (
    <React.Fragment>
      <div className={style.header}>
        <p>Fungap</p>
      </div>
      <SearchBar />
      <Carousel />
      <div className={style.titleContent}>
        <h2>새로나온 콘텐츠</h2>
        <span onClick={goContentsPage}>모두 보기</span>
      </div>
      <div className={style.grid}>
        {new4.map((post, index) => {
          return <Post key={post.board_id} direction='column' {...post} />;
        })}
      </div>
      <div className={style.middleBanner}></div>
      <div className={style.titleContent}>
        <h2>인기 콘텐츠</h2>
      </div>
      <div className={style.grid}>
        {top4.map((post, index) => {
          return <Post direction='column' key={post.board_id} {...post} />;
        })}
      </div>
      <div className={style.bottomBanner}></div>
    </React.Fragment>
  );
};

export default Home;
