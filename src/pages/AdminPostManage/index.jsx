import React, { useRef } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '@redux/modules/post';
// route
import { history } from '@redux/configureStore';
// components
import { Goback, ImageUpload } from '@components';
// css
import style from './adminManage.module.css';

const AdminPostManage = props => {
  const dispatch = useDispatch();
  const postId = props.match.params.id;
  const isEdit = postId ? true : false; // 게시글 수정, 작성
  // image: 업로드한 이미지
  const image = useSelector(state => state.post.postImg);

  // defaultPost, defaultEditPost : 기본으로 보여줄 게시글
  // 미리보기 페이지로 이동할 때, 새로 작성한 게시글은 post 모듈의 post에 저장.
  // 수정한 게시글은 post 모듈의 editPost에 저장.
  // 미리보기 페이지에서 뒤로 돌아올 때, 작성하는 중인 게시글이 있으면 defaultPost를 보여준다.
  // 수정하는 중인 게시글이 있으면 defaultEditPost를 보여준다.
  const defaultPost = useSelector(state => state.post.post);
  const defaultEditPost = useSelector(state => state.post.editPost);
  const titleRef = useRef('');
  const descRef = useRef('');
  const mbtiList = [
    { key: 'INFJ', ref: useRef('') },
    { key: 'INFP', ref: useRef('') },
    { key: 'ENFJ', ref: useRef('') },
    { key: 'ENFP', ref: useRef('') },
    { key: 'ISTP', ref: useRef('') },
    { key: 'ISFP', ref: useRef('') },
    { key: 'ESTP', ref: useRef('') },
    { key: 'ESFP', ref: useRef('') },
    { key: 'INTP', ref: useRef('') },
    { key: 'INTJ', ref: useRef('') },
    { key: 'ENTJ', ref: useRef('') },
    { key: 'ENTP', ref: useRef('') },
    { key: 'ISTJ', ref: useRef('') },
    { key: 'ISFJ', ref: useRef('') },
    { key: 'ESTJ', ref: useRef('') },
    { key: 'ESFJ', ref: useRef('') },
  ];

  const saveData = () => {
    const title = titleRef.current.value.trim();
    const desc = descRef.current.value.trim();
    const img = image;
    const mbtiDescObject = {};

    if (title === '') {
      window.alert('게시글 제목을 적어주세요!');
      return;
    }
    if (desc === '') {
      window.alert('게시글 설명을 적어주세요!');
      return;
    }
    if (!isEdit && !image) {
      window.alert('게시글 사진을 등록해주세요!');
      return;
    }

    // mbti별 내용을 mbtiDescObject 객체에 저장하기
    mbtiList.forEach((mbti, index) => {
      if (mbti.ref.current.value.trim() === '') {
        window.alert(`${mbti.key}의 내용을 입력해주세요!`);
        return false;
      } else {
        mbtiDescObject[mbti.key.toLowerCase()] = mbti.ref.current.value.trim();
      }
    });

    if (isEdit) {
      dispatch(postActions.addEditPost(title, img, desc, mbtiDescObject));
      history.push(`/admin_preview/${postId}`);
    } else {
      dispatch(postActions.addPost(title, img, desc, mbtiDescObject));
      history.push('/admin_preview');
    }
  };

  return (
    <>
      {/* 페이지 제목 */}
      <Goback page='/admin'>
        {isEdit ? `게시글 수정 페이지` : `게시글 작성 페이지`}
      </Goback>
      <div className={style.container}>
        <textarea
          placeholder='게시글의 제목을 적으세요!'
          className={style.title}
          ref={titleRef}
          defaultValue={
            postId ? defaultEditPost?.board_title : defaultPost?.title
          }
        />
        {postId ? (
          <ImageUpload url={defaultEditPost.board_image} />
        ) : (
          defaultPost && <ImageUpload url={defaultPost.img} />
        )}

        <textarea
          placeholder='게시글의 설명을 적으세요!'
          rows='4'
          className={style.desc}
          ref={descRef}
          defaultValue={
            isEdit ? defaultEditPost?.board_desc : defaultPost?.desc
          }
        />
        {mbtiList?.map((mbti, idx) => {
          let section = false;
          const sectionName = ['외교형', '탐험가형', '분석형', '관리자형'];
          const num = idx / 4;

          if (num === 0 || num === 1 || num === 2 || num === 3) {
            section = true;
          }

          return (
            <div key={idx} className={style.mbtiSection}>
              {section && (
                <div className={style.section}>{sectionName[num]}</div>
              )}
              <div className={style.mbtiBox}>
                <div className={style.mbtiName}>{mbti.key}</div>
                <textarea
                  placeholder='해당 MBTI에 맞는 설명을 적으세요!'
                  rows='3'
                  ref={mbti.ref}
                  className={style.mbtiDesc}
                  defaultValue={
                    isEdit
                      ? defaultEditPost?.board_content[mbti.key.toLowerCase()]
                      : defaultPost?.mbti[mbti.key.toLowerCase()]
                  }
                />
              </div>
            </div>
          );
        })}
        <button onClick={saveData} className={style.submitButton}>
          {isEdit ? `수정하기` : `작성하기`}
        </button>
      </div>
    </>
  );
};

export default AdminPostManage;
