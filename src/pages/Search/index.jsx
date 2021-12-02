import React from 'react';
// redux
import { useSelector } from 'react-redux';
// route
import { history } from '@redux/configureStore';
// components
import {
  TopContents,
  Post,
  Goback,
  SearchBar,
  RecommendList,
} from '@components';
// customhook
import usePostList from '@hook/usePostList';
// css
import style from './search.module.css';

const Search = props => {
  const { postList } = usePostList();
  const searchList = useSelector(state => state.post.searchList);

  const handleClick = () => history.push('/contents');

  return (
    <>
      <Goback>검색</Goback>
      <SearchBar />
      {searchList.length !== 0 ? (
        <div className={style.grid}>
          {searchList.map((post, index) => {
            return <Post direction='column' key={post.board_id} {...post} />;
          })}
        </div>
      ) : (
        <>
          <h3>펀갭 추천 검색어</h3>
          <RecommendList />
          <div className={style.launching}>
            <div name='아이콘이미지' />
            <p>펀갭 서비스 런칭!</p>
          </div>
        </>
      )}
      <div className={style.banner} onClick={handleClick}>
        <h3>펀갭 콘텐츠 모두 보기</h3>
        <p>펀갭에 있는 재미있는 이야기를 모두 살펴보세요.</p>
      </div>
      <h2>인기 콘텐츠</h2>
      <div className={style.grid}>
        <TopContents postList={postList} leng='6' />
      </div>
    </>
  );
};

export default Search;
