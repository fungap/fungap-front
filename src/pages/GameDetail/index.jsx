import React, { useState } from 'react';
import classNames from 'classnames';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { history } from '@redux/configureStore';
import { gameActions } from '@redux/modules/game';
//components
import {
  Goback,
  Modal,
  ContentFt,
  Comments,
  MbtiTag,
  ActionCompleteMessage,
} from '@components';
//css
import style from './gameDetail.module.css';
//images
import vs from '@assets/background/vs.webp';
import defaultImg from '@assets/background/profile_default.webp';

const GameDetail = props => {
  const dispatch = useDispatch();
  const gameId = parseInt(props.match.params.id); // 게임 게시글 아이디

  // modal 컴포넌트를 컨트롤하기 위한 state
  const [visible, setVisible] = useState(false); // 보이는 여부
  const [modalTitle, setModalTitle] = useState(''); // 제목
  const [modalDesc, setModalDesc] = useState(''); // 설명
  const [modalRightColor, setModalRightColor] = useState(''); // 오른쪽 버튼 색

  const isLogin = useSelector(state => state.user.is_login); // 로그인 여부
  const userName = useSelector(state => state.user.user.nickname); // 사용자 닉네임
  const userMbti = useSelector(state => state.user.user.user_mbti); // 사용자 mbti
  const game = useSelector(state => state.game.game); // 사용할 game 데이터

  //질문을 선택하지 않고 투표하기 버튼을 누른 경우 알림이 뜸.
  const [alarm, setAlarm] = React.useState(false);

  React.useEffect(() => {
    dispatch(gameActions.getGameDB(gameId));
  }, []);

  // 게임 수정
  const editGame = () => {
    history.push(`/game_write/${gameId}`);
  };
  // 게임 삭제
  const deleteGame = () => {
    setVisible(true);
    setModalTitle('게임을 삭제하시겠습니까?');
    setModalDesc('삭제 한 게임은 복구가 불가합니다.');
    setModalRightColor('leave');
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

  const choiceQuest = () => {
    // 로그인 안 되어 있으면 하도록
    if (isLogin === false) {
      setVisible(true);
      setModalDesc('로그인하러 가시겠습니까?');
      setModalTitle('게임 참여는 로그인 후 이용 가능합니다.');
      setModalRightColor(null);
      return;
    }
    // mbti 등록이 안 되어 있으면 하도록
    if (userMbti == null || userMbti === '') {
      setVisible(true);
      setModalDesc('mbti를 설정하러 가시겠습니까?');
      setModalTitle('mbti가 등록되지 않았습니다.');
      setModalRightColor(null);
      return;
    }
  };

  const modalMsg = () => {
    if (!isLogin) {
      history.push('/signin');
      setVisible(false);
    } else if (userMbti == null || userMbti === '') {
      history.push('/useredit');
      setVisible(false);
    } else {
      history.push(`/games`);
      dispatch(gameActions.deleteGameDB(gameId));
    }
  };

  return (
    <div>
      <Goback>MBTI 밸런스 게임</Goback>
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
                <span className={style.userName}>
                  {game?.nickname} <MbtiTag mbti={userMbti}>{userMbti}</MbtiTag>
                </span>
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
                choiceQuest();
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
                choiceQuest();
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
        <Comments boardId={gameId} mode={'game'} />
      </div>
      {visible && (
        <Modal
          title={modalTitle}
          btnLeft='아니요'
          btnRight='예'
          btnRightType={modalRightColor}
          desc={modalDesc}
          clickBtnRight={() => {
            modalMsg();
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
