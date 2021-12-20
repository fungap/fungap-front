const kakaoScript = document.createElement('script');

kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.js';
document.head.appendChild(kakaoScript);

kakaoScript.onload = () => {
  window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
};

const createKakaoButton = value => {
  if (window.Kakao) {
    const kakao = window.Kakao;

    kakao.Link.createDefaultButton({
      // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
      container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title: value.title, // 공유제목
        description: `#mbti #fungap #${value.desc ? value.desc : value.title}`,
        imageUrl:
          'https://fungap-img.s3.ap-northeast-2.amazonaws.com/kakako_share_bg1636738291738.jpg', // i.e. process.env.FETCH_URL + '/logo.png'
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      social: {
        likeCount: value.like_count ? value.like_count : 0,
        commentCount: value.comment_count ? value.comment_count : 0,
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        {
          title: '앱으로 보기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  }
};

export { createKakaoButton };
