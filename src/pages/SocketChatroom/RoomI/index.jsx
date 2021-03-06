import React, { useEffect, useState } from 'react';
//redux
import { useDispatch } from 'react-redux';
import { ChatActions } from '@redux/modules/chat';
//components
import { Goback, ChatLog, ChatInput, MbtiTag } from '@components';
//util
import { socket } from '@shared/socket';
//css
import style from '../socketChatroom.module.css';
//images
import defaultImg from '@assets/background/profile_default.webp';

const RoomI = () => {
  const dispatch = useDispatch();
  const Room = 'I';
  const userName = JSON.parse(sessionStorage.getItem('user')).nickname;
  const userId = JSON.parse(sessionStorage.getItem('user')).user_id;
  const [exitUser, setExitUser] = useState();
  const [entryUser, setEntryUser] = useState();
  const [user, setUser] = useState();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    socket.emit('join_room', Room);
    socket.emit('join_chat', Room, userName, userId);
    socket.emit('current_usercount', Room);
    socket.on('notice_user_left', (roomname, exitUserName, userId) => {
      setExitUser(exitUserName + '님이 퇴장하셨습니다.');
      setTimeout(function() {
        setExitUser('');
      }, 1500);
    });

    socket.on('notice_user_join', (entryUserName, userList, userCount) => {
      setEntryUser(entryUserName + '님이 입장하셨습니다.');
      setTimeout(function() {
        setEntryUser('');
      }, 1500);
    });

    dispatch(ChatActions.getChatLogDB(Room));
    return () => {
      socket.emit('user_left', Room, userName, userId);
      socket.emit('left_room', Room);
      socket.off(
        'join_room',
        'notice_user_left',
        'notice_user_join',
        'current_usercount',
      );
    };
  }, []);

  useEffect(() => {
    socket.on('current_usercount', (userlist, usercount) => {
      const userArray = userlist.flat();

      setUser(userArray);
    });
  }, [user]);

  return (
    <>
      <Goback use='groupI'>
        [I모임] 내향형 모여라({user ? user.length : 0}명)
      </Goback>
      <div className={style.chatbox}>
        <ChatLog />
      </div>
      <div className={style.alramContainer}>
        <p className={style.alram}>{entryUser}</p>
        <p className={style.alram}>{exitUser}</p>
      </div>
      <ChatInput roomname={Room} />

      <h3>현재 접속중인 유저</h3>
      {visible
        ? user &&
          user.slice(0, 5).map((list, index) => {
            return (
              <div className={style.content} key={index}>
                <img
                  src={list?.user_image ? list.user_image : defaultImg}
                  alt='유저이미지'
                  className={style.userImage}
                />
                <p>{list?.nickname}</p>
                {list.user_mbti ? (
                  <MbtiTag mbti={list.user_mbti}>{list.user_mbti}</MbtiTag>
                ) : (
                  ''
                )}
              </div>
            );
          })
        : user?.map((list, index) => {
            return (
              <div className={style.content} key={index}>
                <img
                  src={list?.user_image ? list.user_image : defaultImg}
                  alt='유저이미지'
                  className={style.userImage}
                />
                <p>{list?.nickname}</p>
                {list.user_mbti ? (
                  <MbtiTag mbti={list.user_mbti}>{list.user_mbti}</MbtiTag>
                ) : (
                  ''
                )}
              </div>
            );
          })}
      {user?.length < '5' ? (
        ''
      ) : user === undefined ? (
        ''
      ) : (
        <div
          className={style.visibleBtn}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          멤버 모두 보기
        </div>
      )}
    </>
  );
};

export default RoomI;
