/*// 팝업 보이기 함수
function showPopup() {
    document.getElementById("popupContainer").style.display = "block";
  }
  
  // 팝업 닫기 함수
  function closePopup() {
    document.getElementById("popupContainer").style.display = "none";
  }
  
  // "오늘하루 열지않기" 체크박스 처리
  /*document.getElementById("chkDontShowAgain").addEventListener("change", function() {
    if (this.checked) {
      // 체크박스가 선택되었을 때, 쿠키에 "dontShowPopup" 저장 (1일 동안 유지)
      document.cookie = "dontShowPopup=true; max-age=" + (60 * 60 * 24);
    }
  });
  
  // 페이지 로드 시 팝업 노출 여부 확인
  window.addEventListener("load", function() {
    if (!document.cookie.includes("dontShowPopup=true")) {
      // 쿠키에 "dontShowPopup"이 없는 경우에만 팝업 보이기
      showPopup();
    }
  });
  
  // 닫기 버튼 클릭 시 팝업 닫기
  document.getElementById("closePopupBtn").addEventListener("click", function() {
    closePopup();
  });*/

/*function changePageContent(pageID){

  if (pageID === 'sketch'){
    clubID.innerHTML = '스케치'
  }else if (pageID === 'dolphins'){
    clubID.innerHTML = '돌핀스'
  }
}

function handleHashChange(){
  const pageID = location.hash.substr(1);
  changePageContent(pageID);
}

handleHashChange();
window.addEventListener('hashchange', handleHashChange);*/



function changePage(clubname){
  location.href = `../Club_Home/index.html?clubname=${clubname}`
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const club_name = urlParams.get('clubname');

if (club_name) {
  let clubname;
  let clubaddr;
  let clubimage = `Club_Images/${club_name}_BG.png`;
  let clublogo;
  let clubheadEmail;
  let clubheadTel;

  if (club_name === 'Sketch') {
    clubname = '스케치';
    clubaddr = '민주관 4층';
    clublogo = 'Club_LOGO/sketch_logo.png';
  } else if (club_name === 'AboutCreative'){
    clubname = 'About:Creative';
    clubaddr = '민주관 3층';
    clubheadTel = '010-5955-4831';
  } else if (club_name === 'Kapolav'){
    clubname = '카폴라브'
  } else if (club_name === 'WithLight'){
    clubname = '빛이랑';
    clublogo = 'Club_LOGO/withlight_logo.png';
  } else if (club_name === 'Bacchus'){
    clubname = '바커스';
  } else if (club_name === 'Rotarect'){
    clubname = '로타랙트';
  } else if (club_name === 'GreenLight'){
    clubname = '그린라이트';
    clublogo = 'Club_LOGO/greenlight_logo.png';
  } else if (club_name === 'ArkBuilders'){
    clubname = '방주짓는 사람들';
    clubaddr = '예술관 5층';
  } else if (club_name === 'JDM'){
    clubname = 'JDM';
    clubaddr = '민주관 4층';
  } else if (club_name === 'CCC'){
    clubname = 'CCC';
    clubaddr = '민주관 3층';
  } else if (club_name === 'IntercorpCampus'){
    clubname = '인터콥캠퍼스';
    clubaddr = '예술관 5층';
  } else if (club_name === 'Arena'){
    clubname = '아레나';
    clubaddr = '민주관 4층';
    clublogo = 'Club_LOGO/arena_logo.png';
  } else if (club_name === 'Yejire'){
    clubname = '예지레';
    clubaddr = '노천극장';
    clublogo = 'Club_LOGO/yejire_logo.png';
  } else if (club_name === 'Baroke'){
    clubname = '바로크';
    clubaddr = '민주관 4층';
    clublogo = 'Club_LOGO/baroke_logo.png';
  } else if (club_name === 'Maya'){
    clubname = '마야';
    clubaddr = '예술관 7층';
    clublogo = 'Club_LOGO/maya_logo.png';
  } else if (club_name === 'Dolphins') {
    clubname = '돌핀스';
    clubaddr = '노천극장';
    clublogo = 'Club_LOGO/dolphins_logo.png';
    clubheadTel = '010-5913-4086';
  } else if (club_name === 'SMAK'){
    clubname = 'SMAK';
  } else if (club_name === 'KOREA'){
    clubname = 'KOREA';
  } else if (club_name === 'ACE'){
    clubname = 'ACE';
  } else if (club_name === 'FlyPower'){
    clubname = '플라이파워';
  } else if (club_name === 'Poomsaedan'){
    clubname = '태극';
    clublogo = 'Club_LOGO/poomsaedan_logo.png';
  } else if (club_name === 'Biallants'){
    clubname = '바이얼런츠';
  } else {
    document.getElementById("body").innerHTML = '404 not found!';
  }

  
  if (clubaddr == null){
    clubaddr = '알 수 없음';
  }
  if (clubimage == null){
    clubimage = 'sangji2.jpg';
  }
  if (clublogo == null){
    clublogo = 'club_log.png';
  }
  if (clubheadTel == null){
    clubheadTel = '010-1234-5678';
  }
  if (clubheadEmail == null){
    clubheadEmail = 'abcd1234@google.com';
  }
  //document.getElementById("clubname").textContent = clubname;
  document.getElementById("title").innerHTML = `상지대학교 ${clubname}`;
  document.getElementById("clubname").innerHTML = `${clubname}`;
  document.getElementById("clubaddr").innerHTML = `&nbsp;${clubaddr}`;
  let imgElement = document.getElementById("clubimage");
  imgElement.src = clubimage;
  let hlogoElement = document.getElementById("clublogo_h");
  hlogoElement.src = clublogo;
  let flogoElement = document.getElementById("clublogo_f");
  flogoElement.src = clublogo;
  document.getElementById("clubheadTel").innerHTML = `&nbsp;${clubheadTel}`;
  document.getElementById("clubheadEmail").innerHTML = `&nbsp;${clubheadEmail}`;
}