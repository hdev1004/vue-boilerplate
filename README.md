# 글루 따띠온

### 0. 프로젝트 소개


<p>글루따띠온은 MSA 구조를 이용하여 B2C 형태의 쇼핑볼 사이트 이며, Admin과 클라이언트로 나뉘어 있습니다. </p>

<p>1차 개발을 진행중이고, 2차 개발에서는 더욱 다양한 기능들을 추가하여 높은 품질의 서비스를 제공할 수 있도록 목표를 하고 있습니다.</p>

<p>해당 프로젝트를 완성하기 까지 매일 매일 스크럼을 진행했습니다 🥹</p>

일일 스크럼은 ```디스코드```, ```노션```으로 진행했고 노션 최대 블럭 제한으로 인해 스크럼 내역을 [여기서](https://trello.com/b/GN2mLBAR/%EC%87%BC%ED%95%91%EB%AA%B0-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8) 확인할 수 있습니다. 😓

<br/>

<p>1차 개발은 2024.07.31일 완성을 목표로 하고 있고, 주요 기능으로는 다음과 같습니다. 🌟</p>


<br/>

### 1. 주요기능
<b>Admin</b>
1. 상품 등록
2. 배너 관리
3. 쿠폰 관리
4. 대시 보드
5. 문의 관리


<b>Client</b>
1. 장바구니
2. 찜목록
3. 정보수정
4. 쿠폰발급
5. 결제
6. 제품 상세정보

<br/>


### 2. 아키텍처
![아키텍처](https://github.com/user-attachments/assets/5ace4ed0-6245-41b2-9109-3ffd538196a5)

<br/>

### 3. 팀 소개
👨‍💻[이현웅](https://github.com/woong7361) (백엔드 개발자)

👨‍💻[김진원](https://github.com/hdev1004) (프론트 개발자)   

<br/>

### 4. 기술 스택

🖥️ 프론트엔드 
```Vue```, ```Vite```, ```StroyBook```, ```Playwright```

🖥️ 백엔드
예정

🖥️ 클라우드 (온프레미스 구조로 사용했습니다)
```Cafe24```, ```AWS```

<br/>


### 5. 참여 기간

프로젝트 시작일 : ```2024년 06월 22일``` <br/>
1차 개발 종료 일자 : ```2024년 07월 31일``` <br/>
2차 개발 시작 일자 : ```미정``` <br/>


<br/>

### 6. 개발 진행 상황

- ✅ 1차 개발 **(진행중)** - 2024.07.31
  - 로그인 ✅
  - 장바구니 ✅
  - 찜목록 ✅
  - 상품등록 ✅
  - 배너관리 ✅
  - 대시보드
  - 결제 ✅
  - 쿠폰관리 ✅
  - 정보수정 ✅

- ✅ 2차 개발 **(예정)**
   - 예정  
 
<br/>

### 7. Demo Page

<b>Client</b>
🔗 : <a href="http://210.114.19.32:8090" target="_blank">http://210.114.19.32:8090</a>
<p>테스트 계정<br>id : tester<br>pw : tester</p>

<br/>
<br/>

<b>Admin</b>
🔗 : <a href="http://210.114.19.32:8085" target="_blank">http://210.114.19.32:8085</a>
<p>테스트 계정<br>id : admin<br>pw : 1234</p>

<br/>


### 8. 페이지 설명
<b>클라이언트 화면</b>

- 메인 페이지
  
   ![소개이미지](https://github.com/user-attachments/assets/70f02264-3915-4ad2-a87d-36f913afe6b8)
   - 로그인을 진행하며, 각각의 세부 카테고리별 페이지를 확인할 수 있습니다.
   - 상품 목록들을 카드 형태로 되어 있고, 클릭하면 제품상세 페이지를 볼 수 있습니다.
   - 관리자에서 등록한 쿠폰관리를 보여줄 수 있는 화면이 있고, 스타일별로 구분한 제품별로 확인할 수 있습니다.
 
<br/>

- 제품 상세 페이지
  
   ![소개이미지2](https://github.com/user-attachments/assets/d3d6fbc5-eee7-4590-8eae-e645f2bdd017)
   - 등록된 상품을 클릭하여, 상품을 확인할 수 있습니다.
   - 해당 상품에서 개수를 선택하고, 장바구니에 넣고 결제까지 진행할 수 있습니다.
   - 상품에 대해 문의하고자 하는 내용이 있다면, 하단에서 문의를 작성 및 수정할 수 있습니다.
   - 관리자에서는 해당 문의를 확인할 수 있고, 답변을 달 수 있습니다.


<br/>

- 회원 정보 페이지
  
   - 아직 완성이 되지 않아서 해당 이미지가 없습니다 🥹 (업로드 예정)
   - 마이페이지에서 등록된 정보를 변경 및 탈퇴 할 수 있습니다.
   - 찜목록에는 제품에서 하트를 눌렀던 내역이 나오게 되고, 클릭하면 해당 상품으로 이동할 수 있습니다.
   - 장바구니로 이동하게 되면, 그동안 장바구니에 넣었던 상품을 볼 수 있고 결제를 진행할 수 있습니다.
      - 2024.07.24 기준으로 해당 기능 미완성

<br/>
<br/>
<br/>

<b>어드민 페이지</b>

<br/>

- 메인 페이지
  
   ![소개이미지3](https://github.com/user-attachments/assets/1dd58ef6-e1e7-45cf-bb5e-4cfbc19330da)
   - 관리자에서 로그인을 진행해야만 접근이 가능하며, 다양한 탭들을 확인할 수 있습니다.
   - 2024.07.24 기준 가능한 기능으로는 `제품등록`, `제품목록`, `배너관리`, `문의관리` 입니다.
   - 제품 등록부분에서 이미지, 각종 설명을 넣으면 클라이언트 단에서 등록된 상품이 보여지게 됩니다.
   - 배너관리 또한, 등록한 이미지 & URL을 입력하여 화면에 보여지도록 합니다.
   - 문의관리를 통해 등록된 문의들을 답변할 수 있습니다.
   - 이외에도 많은 기능들을 개발 예정 중 입니다!

<br/>
<br/>

<p>미흡한점이 많지만, 좋게 봐주셨으면 감사하겠습니다 😊</p>
