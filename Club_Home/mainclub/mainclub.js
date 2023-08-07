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
  location.href = `../Club_Home/mainclub/index.html?clubname=${clubname}`
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const club_name = urlParams.get('clubname');

if (club_name) {
  let clubname;

  if (club_name === 'Sketch') {
    clubname = '스케치';
  } else if (club_name === 'AboutCreative'){
    clubname = 'About:Creative';
  } else if (club_name === 'Kapolav'){
    clubname = '카폴라브'
  } else if (club_name === 'WithLight'){
    clubname = '빛이랑';
  } else if (club_name === 'bacchus'){
    clubname = '바커스';
  } else if (club_name === 'Rotarect'){
    clubname = '로타랙트';
  } else if (club_name === 'GreenLight'){
    clubname = '그린라이트';
  } else if (club_name === 'ArkBuilders'){
    clubname = '방주짓는 사람들';
  } else if (club_name === 'JDM'){
    clubname = 'JDM';
  } else if (club_name === 'CCC'){
    clubname = 'CCC';
  } else if (club_name === 'IntercorpCampus'){
    clubname = '인터콥캠퍼스';
  } else if (club_name === 'Arena'){
    clubname = '아레나';
  } else if (club_name === 'Yejirae'){
    clubname = '예지레';
  } else if (club_name === 'Baroke'){
    clubname = '바로크';
  } else if (club_name === 'Maya'){
    clubname = '마야';
  } else if (club_name === 'Dolphins') {
    clubname = '돌핀스';
  } else if (club_name === 'SMAK'){
    clubname = 'SMAK';
  } else if (club_name === 'KOREA'){
    clubname = 'KOREA';
  } else if (club_name === 'ACE'){
    clubname = 'ACE';
  } else if (club_name === 'FlyPower'){
    clubname = '플라이파워';
  } else if (club_name === 'Poomsaedan'){
    clubname = '품새단';
  } else if (club_name === 'Biallants'){
    clubname = '바이얼런츠';
  } else {
    clubname = clubname;
  }
  //document.getElementById("clubname").textContent = clubname;
  document.getElementById("clubname").innerHTML = `${clubname}`;
}