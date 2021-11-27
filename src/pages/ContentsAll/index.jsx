import React from 'react';
import style from './contentsAll.module.css';
import { ContentsRow, SliderBanner, ContentsRowTitle } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../../redux/modules/post';
import { history } from '../../redux/configureStore';

import I from '../../assets/chatting_I.png';
import E from '../../assets/chatting_E.png';
import F from '../../assets/chatting_F.png';
import T from '../../assets/chatting_T.png';
import C from '../../assets/chatting_Career.png';

const ContentsAll = () => {
  const dispatch = useDispatch();
  const postList = useSelector(state => state.post.allContent?.board_list);
  const gameList = useSelector(state => state.post.allContent?.game_list);

  React.useEffect(() => {
    dispatch(postActions.getAllContentDB());
  }, []);

  const chattingList = [
    {
      chatting_img: I,
      chatting_title: '[I모임] 내향형 모여라',
      chatting_desc: 'I유형의 사용자들이 모인 채팅방입니다.',
    },
    {
      chatting_img: E,
      chatting_title: '[E모임] 내향형 모여라',
      chatting_desc: 'E유형의 사용자들이 모인 채팅방입니다.',
    },
    {
      chatting_img: F,
      chatting_title: '[F모임] 내향형 모여라',
      chatting_desc: 'F유형의 사용자들이 모인 채팅방입니다.',
    },
    {
      chatting_img: T,
      chatting_title: '[T모임] 내향형 모여라',
      chatting_desc: 'T유형의 사용자들이 모인 채팅방입니다.',
    },
    {
      chatting_img: C,
      chatting_title: 'MBTI별 추천 직업',
      chatting_desc: '상담이 챗봇이 MBTI별로 직업을 추천해줍니다.',
    },
  ];

  return (
    <div>
      <div className={style.header}>
        <div className={style.logo} />
      </div>
      <SliderBanner />
      <div className={style.gameContainer}>
        <ContentsRowTitle
          title='밸런스 게임'
          desc='여러분이 직접 작성한 밸런스 게임에 참여해보세요!'
          link='/games'
        />
        <ContentsRow slidesToShow={1} mode='game' list={gameList} dots={true} />
      </div>
      <ContentsRowTitle
        title='상황별 MBTI반응'
        desc='특정 상황에 대한 MBTI별 반응은 어떨까요?'
        link='/contents'
      />
      <ContentsRow slidesToShow={3} mode='post' list={postList} dots={false} />
      <ContentsRowTitle
        title='실시간 채팅 & 챗봇'
        desc='MBTI 유형별로 실시간 채팅에 참여해보세요!'
        link='/chatting'
      />
      <ContentsRow
        slidesToShow={3}
        mode='chatting'
        list={chattingList}
        dots={false}
      />
      <div className={style.lastBanner}>
        <div className={style.lastBannerLeft}>
          <p className={style.title}>MBTI 궁합</p>
          <div
            onClick={() => {
              history.push('/mbti/test');
            }}
            className={style.compatibility}
          />
        </div>
        <div className={style.lastBannerRight}>
          <p className={style.title}>리뷰작성하기</p>
          <div
            onClick={() => {
              window.open(
                'https://docs.google.com/forms/d/e/1FAIpQLSdwWd9teNf4ZqF4wY9D51QDfYCsioT6QfTXomrVP4vg7A8ezw/viewform',
              );
            }}
            className={style.review}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentsAll;
