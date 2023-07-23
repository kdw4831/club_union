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
    const count = 70;
    const time = 2;
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