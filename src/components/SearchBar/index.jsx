import React, { useState, useEffect } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { postActions } from '@redux/modules/post';
// css
import style from './searchBar.module.css';

const SearchBar = prop => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ search: '' });
  const { search } = input;

  const handleChange = e => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });

    if (value === '') {
      dispatch(postActions.searchPost(value));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(postActions.searchPostDB(search));
  };

  useEffect(() => {
    return () => {
      dispatch(postActions.searchPost(''));
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <p className={style.wrap}>
        <label htmlFor='search'></label>
        <input
          id='search'
          name='search'
          value={search}
          type='text'
          placeholder='콘텐츠를 검색해보세요'
          onChange={handleChange}
        />
        <button className={style.icon}>검색 버튼</button>
      </p>
    </form>
  );
};

export default SearchBar;
