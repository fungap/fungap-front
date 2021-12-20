import React from 'react';
import style from './game.module.css';
import { LikeButton } from '../../components';
import { history } from '../../redux/configureStore';

const Game = props => {
  const game = props.game;

  return (
    <div key={game.game_id} className={style.gameContainer}>
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
};

export default Game;
