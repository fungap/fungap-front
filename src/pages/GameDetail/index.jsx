import React, { useState } from 'react';
import style from './gameDetail.module.css';
import classNames from 'classnames';

import {
  Goback,
  Modal,
  ContentFt,
  Comments,
  ActionCompleteMessage,
} from '../../components';

import { history } from '../../redux/configureStore';
import { gameActions } from '../../redux/modules/game';
import { useDispatch, useSelector } from 'react-redux';

import vs from '../../assets/vs.png';
import defaultImg from '../../assets/profileplaceholder.png';

const GameDetail = props => {
  const dispatch = useDispatch();
  const gameId = props.match.params.id; // 투표 게시글 아이디
  const [visible, setVisible] = useState(false); // modal 컴포넌트 보이는 여부
  const [modalTitle, setModalTitle] = useState(''); // modal 컴포넌트 제목
  const isLogin = useSelector(state => state.user.is_login); // 로그인 여부
  const userName = useSelector(state => state.user.user.nickname); // 사용자 닉네임
  const userMbti = useSelector(state => state.user.user.user_mbti);
  const game = useSelector(state => state.game.game);

  // 투표를 안 한 상태 false,  quest1에 투표한 상태 'left'
  // quest2에 투표한 상태 'right'
  const [gameState, setGameState] = React.useState('false');

  const [alarm, setAlarm] = React.useState(false);

  React.useEffect(() => {
    dispatch(gameActions.getGameDB(gameId));
    setGameState(game?.game_state);
  }, []);

  // 게임 수정
  const editGame = () => {
    history.push(`/game_write/${gameId}`);
  };
  // 게임 삭제
  const deleteGame = () => {
    setVisible(true);
    setModalTitle('게임을 삭제하시겠습니까?');
  };

  const resultSubmit = () => {
    if (game?.game_state === '1' || game?.game_state === '2') {
      console.log('게임 스테이트: ', game?.game_state);
      history.push(`/game/${gameId}/result`);
    } else {
      console.log('게임 스테이트: ', game?.game_state);
      clearTimeout();
      setAlarm(true);
      setTimeout(() => {
        setAlarm(false);
      }, 1700);
      return;
    }
  };

  const choiceQuest = (event, state) => {
    // 로그인 안 되어 있으면 하도록
    if (isLogin === false) {
      setVisible(true);
      setModalTitle('게임 참여는 로그인 후 이용 가능합니다.');
      return;
    }
    // mbti 등록이 안 되어 있으면 하도록
    if (userMbti == null) {
      setVisible(true);
      setModalTitle('mbti가 등록되지 않았습니다. mbti를 설정해주세요.');
      return;
    }
  };

  return (
    <div>
      <Goback page='/games'>MBTI 밸런스 게임</Goback>
      <div>
        <div className={style.gameInfoContainer}>
          <div className={style.userInfo}>
            <div className={style.userProfile}>
              <img
                className={style.userImg}
                src={game?.user_image ? game?.user_image : defaultImg}
                alt='프로필이미지'
              />
              <div>
                <span>{game?.nickname}</span>
                <span>2021.11.20</span>
              </div>
            </div>
            {game?.nickname === userName ? (
              <div className={style.gameButtonBox}>
                <button onClick={editGame}>수정</button>
                <button onClick={deleteGame}>삭제</button>
              </div>
            ) : (
              <div />
            )}
          </div>
          {/* 투표 제목 */}
          <p className={style.gameTitle}>{game?.game_title}</p>
          {/* 투표 내용 */}
          <p className={style.gameDesc}>{game?.game_desc}</p>
          {/* 질문 */}
          <div className={style.questContainer}>
            <button
              className={classNames(
                style.gameButton,
                game?.game_state === '1' ? style.checked : '',
              )}
              onClick={event => {
                choiceQuest(event, '1');
                dispatch(
                  gameActions.participateGameDB(
                    gameId,
                    { game_quest: '1' },
                    userMbti,
                  ),
                );
              }}
            >
              {game?.game_quest1}
            </button>
            <img className={style.vs} src={vs} alt='vs' />
            <button
              className={classNames(
                style.gameButton,
                game?.game_state === '2' ? style.checked : '',
              )}
              onClick={event => {
                choiceQuest(event, '2');
                dispatch(
                  gameActions.participateGameDB(
                    gameId,
                    { game_quest: '2' },
                    userMbti,
                  ),
                );
              }}
            >
              {game?.game_quest2}
            </button>
          </div>
        </div>
        <button className={style.resultButton} onClick={resultSubmit}>
          투표하기
        </button>
        {alarm && <ActionCompleteMessage message='질문을 선택해주세요.' />}
        <ContentFt
          post={{
            mode: 'game',
            view_count: game?.game_view_count,
            board_id: game?.game_id,
            like_count: game?.like_count,
            like_state: game?.like_state,
            board_title: game?.game_title,
          }}
        />
        <Comments boardId={game?.game_id} mode={'game'} />
      </div>
      {visible && (
        <Modal
          title={modalTitle}
          btnLeft='아니요'
          btnRight='예'
          clickBtnRight={() => {
            if (!isLogin) {
              history.push('/signin');
              setVisible(false);
            } else if (userMbti == null) {
              history.push('/useredit');
              setVisible(false);
            } else {
              history.push(`/games`);
              dispatch(gameActions.deleteGameDB(gameId));
            }
          }}
          visible={visible}
          maskClosable
          onClose={() => {
            setVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default GameDetail;