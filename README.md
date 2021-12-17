# Fungap
![Frame 14120](https://user-images.githubusercontent.com/89460880/144413012-68612fe9-b1f7-428d-8ce9-6fa53c9a3a31.png)

## 🎊 프로젝트 소개  
#### 📆 개발기간 2021.10.25 ~ 2021.12.03 (6주 진행)   
> MBTI를 통해 자신과 타인을 이해하고 싶은 MZ세대를 위해,    
> 여러 MBTI 콘텐츠를 제공하여 서로의 차이에 대한 재미를 느낄 수 있는 서비스

* 사이트 링크: <https://fungap.shop>

## 🧑🏻‍💻 팀 구성
- Frontend : [조성민](https://github.com/developer-asher)(ENFJ), [임동건](https://github.com/Ldonggun)(INFJ), [김세연](https://github.com/happyKale)(INFP)
- Backend : [전은규](https://github.com/stravinest)(ENFP), [신성웅](https://github.com/shinsw627)(INTP), [오정민](https://github.com/criminal415)(ISTP)
- Designer : 김민경(ESTJ), 김은우(ESFJ)

## 🎨 아키텍쳐
![image](https://user-images.githubusercontent.com/77700977/144547343-292fbfc2-322e-4423-800e-ce9155f20f14.png)

## 🛠 기술 스텍 및 라이브러리
* 주요언어: Javascript
* 주요 라이브러리: React
* 상태관리
  * redux(데이터 전역 관리)
  * redux-actions
  * redux-thunk
  * redux-logger
  * immer
* 배포
  * aws s3(서비스 배포, 이미지 업로드)
  * aws cloudfront(Https 적용)
* 통신
  * axios
  * soket-io
* 에러로깅
  * sentry
* 이미지 리사이징
  * browser-image-compression
* 스타일
  * postcss
* PWA
  * workbox-cli(서비스 워커 커스텀)
* 라이브러리 & 패키지
  * react-slick
  * moment(IOS에서 날짜 출력 시 NaN로 출력되는 트러블슈팅을 위해 사용)
  * craco(import 시 경로에서 오는 지옥같은 패스를 해결하고자 절대경로를 사용하여 코드 가독성 향상)

## 부록
<https://github.com/fungap/Appendix-front>
