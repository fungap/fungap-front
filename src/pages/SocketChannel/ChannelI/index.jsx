import style from './channeli.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Goback, Modal } from '../../../components';
import { history } from '../../../redux/configureStore';
import { socket } from '../../../shared/socket';
import placeholder from '../../../assets/profileplaceholder.png';

const ChannelI = () => {
  const [userCount, setUserCount] = useState();
  const [userList, setUserList] = useState();
  const [btnVisible, setBtnVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isLogin = useSelector(state => state.user.is_login);
  const roomName = 'I';

  useEffect(() => {
    socket.emit('join_room', roomName);
    socket.emit('current_usercount', roomName);
    socket.on('current_usercount', (userlist, usercount) => {
      const userArray = userlist.flat();
      setUserList(userArray);
    });
    return () => {
      socket.emit('left_room', roomName);
      socket.off('current_usercount');
    };
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const checkLogin = () => {
    if (isLogin == true) {
      history.push('/roomi');
    } else {
      openModal();
    }
  };
  return (
    <>
      <Goback>MBTI채팅방</Goback>
      <div className={style.image} />
      <h2>[I모임] 내향형 모여라</h2>
      <p className={style.text}>
        혼자 있음으로써 에너지가 충전되는 편~ 조용히 혼자있는 것을 선호하는
        사람들 모여라! 내 안의 개념, 아이디어를 고민하는 게 즐거운 우리 I !
      </p>
      <div className={style.button} onClick={checkLogin}>
        입장하기
      </div>
      <h3>참여자({userList ? userList.length : 0}명)</h3>
      {btnVisible
        ? userList?.slice(0, 5).map((item, index) => {
            return (
              <div className={style.content} key={index}>
                <img
                  src={item?.user_image ? item.user_image : placeholder}
                  alt='유저이미지'
                  className={style.userImage}
                />
                <p>{item?.nickname}</p>
              </div>
            );
          })
        : userList?.map((item, index) => {
            return (
              <div className={style.content} key={index}>
                <img
                  src={item?.user_image ? item.user_image : placeholder}
                  alt='유저이미지'
                  className={style.userImage}
                />
                <p>{item?.nickname}</p>
              </div>
            );
          })}
      {userList?.length < '5' ? (
        ''
      ) : userList === undefined ? (
        ''
      ) : (
        <div
          className={style.visibleBtn}
          onClick={() => {
            setBtnVisible(!btnVisible);
          }}
        >
          멤버 모두 보기
        </div>
      )}
      {modalVisible && (
        <Modal
          title='로그인하기'
          visible={modalVisible}
          desc='채팅방 입장은 로그인이 필요합니다.'
          desc2='로그인 하루 가시겠어요?'
          onClose={closeModal}
          btnLeft='닫기'
          btnRight='로그인 하러가기'
          clickBtnRight={() => {
            history.push('/signin');
          }}
        />
      )}
    </>
  );
};

export default ChannelI;