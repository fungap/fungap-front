import React, { useEffect, useState } from 'react';
import style from './gameList.module.css';
import { history } from '../../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';

import { Goback, Modal, LikeButton, SortContents } from '../../components';
import { gameActions } from '../../redux/modules/game';

const GameList = () => {
  const dispatch = useDispatch();
  const gameList = useSelector(state => state.game.gameList);
  const user = useSelector(state => state.user.is_login);
  // modal 컴포넌트 보이는 여부
  const [visible, setVisible] = useState(false);

  const makeGame = () => {
    if (user === false) {
      setVisible(true);
      return;
    }
    history.push('/game_write');
  };

  const closeModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch(gameActions.getGamesDB());
  }, []);

  return (
    <React.Fragment>
      <div className={style.container}>
        {/* 페이지 제목 */}
        <Goback page='/'>MBTI 밸런스 게임</Goback>
        {/* 투표리스트 */}
        <div className={style.containerTop}>
          <span>{gameList?.length}개의 게시글</span>
          <SortContents mode='game' />
        </div>
        <div className={style.listContainer}>
          {/* 투표 */}
          {gameList?.map((game, index) => {
            return (
              <div key={index} className={style.gameContainer}>
                <div
                  onClick={() => {
                    history.push(`/game/${game.game_id}`);
                  }}
                  className={style.gameInnerContainer}
                >
                  <p className={style.gameTitle}>{game.game_title}</p>
                  <span>
                    조회수
                    <span className={style.blank} /> {game?.game_view_count}
                  </span>
                  <span className={style.gameParticipation}>
                    총 참여수 <span className={style.blank} />
                    {game?.participation_count}
                  </span>
                  <span>{game?.nickname}</span>
                </div>
                <div className={style.likeButton}>
                  <LikeButton
                    mode='game'
                    board_id={game?.game_id}
                    like_count={game?.like_count}
                    like_state={game?.like_state}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {visible && (
          <Modal
            title='투표 작성은 로그인 후 이용 가능합니다.'
            desc='로그인하러 가시겠습니까?'
            btnLeft='아니요'
            btnRight='예'
            clickBtnRight={() => {
              history.push('/signin');
            }}
            visible={visible}
            maskClosable
            onClose={closeModal}
          />
        )}
        <button
          id='writeButton'
          onClick={makeGame}
          className={style.makeGameButton}
        />
      </div>
    </React.Fragment>
  );
};

export default GameList;
