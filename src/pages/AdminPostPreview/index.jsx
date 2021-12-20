import React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '@redux/modules/post';
// components
import { Goback, MbtiDescList } from '@components';
// css
import style from './adminPreview.module.css';

const AdminPostPreview = props => {
  const dispatch = useDispatch();
  const postId = props.match.params.id;
  const isEdit = postId ? true : false;
  const { post, editPost, postImg: image } = useSelector(state => state.post);
  const mbtiList = Object.entries(post?.mbti);
  const editMbtiList = Object.entries(editPost?.board_content);

  const handleClick = () => {
    if (isEdit) {
      const data = {
        board_title: editPost.board_title,
        board_image: image,
        board_desc: editPost.board_desc,
        board_content: editPost.board_content,
      };
      dispatch(postActions.editPostDB(postId, data));
    } else {
      dispatch(postActions.addPostDB());
    }
  };

  return (
    <>
      {postId ? (
        <Goback page={`/admin_write/${postId}`}>게시글 미리보기</Goback>
      ) : (
        <Goback page='/admin_write'>게시글 미리보기</Goback>
      )}
      <div className={style.container}>
        <img src={image} alt='게시글 이미지'></img>
        <h3 className={style.title}>
          {isEdit ? editPost.board_title : post.title}
        </h3>
        <span className={style.like}>0</span>
        <p className={style.contents}>
          {isEdit ? editPost.board_desc : post.desc}
        </p>
        {isEdit ? (
          <MbtiDescList list={editMbtiList} />
        ) : (
          <MbtiDescList list={mbtiList} />
        )}
        <div className={style.buttonBox}>
          <button //
            className={style.button}
            onClick={handleClick}
          >
            {isEdit ? '수정하기' : '저장하기'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPostPreview;
