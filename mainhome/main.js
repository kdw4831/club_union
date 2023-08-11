let curPos= 0; // 현재 보고 있는 이미지의 인덱스 번호!
let position = 0; // 현재 .images 의 위치값!
const IMAGE_WIDTH = 640; // 한번 움직일 때 이동해야 할 거리!
let autoSlideInterval; // 자동 슬라이드를 위한 인터벌 변수

// 요소 선택
const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")
const images = document.querySelector(".images")

function prev(){
    if(curPos > 0){
    nextBtn.removeAttribute("disabled") /* disabled 속성 제거*/
    position += IMAGE_WIDTH /* position 값 증가 */
    
    images.style.transform = `translateX(${position}px)` /* images 스타일 transform, x축 변경*/
    curPos -= 1; /* curPos 값 감소*/
    }
    if(curPos == 0){ /* 이미지 index값 0 되면 prev 못하게 */
        prevBtn.setAttribute("disabled", 'true')
    }
 }
 function next() {
    if (curPos < 3) {
        prevBtn.removeAttribute("disabled");
        position -= IMAGE_WIDTH;
        images.style.transform = `translateX(${position}px)`;
        curPos += 1;
        if (curPos == 3) {
            nextBtn.setAttribute("disabled", 'true');
        }
    } else if (curPos == 3) {
        // 이미지 인덱스가 3인 경우
        curPos = 0; // curPos를 0으로 설정
        position = 0; // position도 0으로 설정
        images.style.transform = `translateX(${position}px)`;
        prevBtn.setAttribute("disabled", 'true');
        nextBtn.removeAttribute("disabled");
    }
}

function startAutoSlide() {
    if(curPos==3){
        curPos==0;
        position=0;
    }else{
        autoSlideInterval = setInterval(() => {
        next();
        }, 3000); // 2초마다 다음 이미지로 슬라이드
    }
  }
  
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }


  
  
// 초기 랜더링 시 최초 호출 함수의 관습적 이름
function init(){
    // 앞으로 가기는 처음부터 못누르게!
    prevBtn.setAttribute("disabled", 'true')
    prevBtn.addEventListener("click", prev)
    nextBtn.addEventListener("click", next)


    startAutoSlide(); // 자동 슬라이드 시작
    images.addEventListener("mouseenter", stopAutgioSlide); // 마우스가 이미지 위에 있을 때 자동 슬라이드 일시정지
    images.addEventListener("mouseleave", startAutoSlide); // 마우스가 이미지에서 벗어날 때 자동 슬라이드 재시작
}

init();
