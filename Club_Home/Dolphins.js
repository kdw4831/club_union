// 팝업 보이기 함수
function showPopup() {
  document.getElementById("popupContainer").style.display = "block";
}

// 팝업 닫기 함수
function closePopup() {
  document.getElementById("popupContainer").style.display = "none";
}

// "오늘하루 열지않기" 체크박스 처리
document.getElementById("chkDontShowAgain").addEventListener("change", function() {
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
});





const colors = [
    'rgb(255, 0, 0)',  // 빨간색
    'rgb(0, 255, 0)',  // 초록색
    'rgb(0, 0, 255)',  // 파란색
    'rgb(0, 255, 200)', // 민트색
    'rgb(0, 145, 255)', // 하늘색
    'rgb(255, 0, 255)'  // 보라색
  ];
  /**
   * 헤더의 색을 단계적으로 바꿈
   */
  function changeBackgroundColor() {
    const count = 80;
    const time = 5;
    const header = document.querySelector('header');
    const randomIndex = Math.floor(Math.random() * colors.length);
    const targetColor = colors[randomIndex];
  
    const currentColor = getComputedStyle(header).backgroundColor; // 현재 배경색 가져오기
  
    const currentRGB = currentColor.match(/\d+/g); // 현재 배경색의 RGB 값을 추출
    const targetRGB = targetColor.match(/\d+/g);   // 목표 배경색의 RGB 값을 추출
  
    const rStep = (targetRGB[0] - currentRGB[0]) / count; // R 색상 성분의 단계별 변화량 계산
    const gStep = (targetRGB[1] - currentRGB[1]) / count; // G 색상 성분의 단계별 변화량 계산
    const bStep = (targetRGB[2] - currentRGB[2]) / count; // B 색상 성분의 단계별 변화량 계산
  
    let currentStep = 0;
  
    const changeColor = () => {
      const newR = Math.floor(parseInt(currentRGB[0]) + rStep * currentStep); // 단계별로 계산된 R 값
      const newG = Math.floor(parseInt(currentRGB[1]) + gStep * currentStep); // 단계별로 계산된 G 값
      const newB = Math.floor(parseInt(currentRGB[2]) + bStep * currentStep); // 단계별로 계산된 B 값
  
      header.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
  
      currentStep++;
  
      if (currentStep <= count) {
        setTimeout(changeColor, (time * 1000) / count);
      } else {
        // 그라데이션 완료 후에 다시 검은색으로 변경
        const blackRGB = [0, 0, 0];
        const blackRStep = (targetRGB[0] - blackRGB[0]) / count; // R 색상 성분의 단계별 변화량 계산
        const blackGStep = (targetRGB[1] - blackRGB[1]) / count; // G 색상 성분의 단계별 변화량 계산
        const blackBStep = (targetRGB[2] - blackRGB[2]) / count; // B 색상 성분의 단계별 변화량 계산
  
        currentStep = 0; // 다시 초기화
  
        const changeToBlack = () => {
          const newR = Math.floor(parseInt(targetRGB[0]) - blackRStep * currentStep); // 단계별로 계산된 R 값
          const newG = Math.floor(parseInt(targetRGB[1]) - blackGStep * currentStep); // 단계별로 계산된 G 값
          const newB = Math.floor(parseInt(targetRGB[2]) - blackBStep * currentStep); // 단계별로 계산된 B 값
  
          header.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
  
          currentStep++;
  
          if (currentStep <= count) {
            setTimeout(changeToBlack, (time * 1000) / count);
          } else {
            // 다시 새로운 색상으로 그라데이션 시작
            setTimeout(changeBackgroundColor, 1000); // 1초 뒤에 다시 색상 변화 시작
          }
        };
  
        changeToBlack();
      }
    };
  
    changeColor();
}
changeBackgroundColor();