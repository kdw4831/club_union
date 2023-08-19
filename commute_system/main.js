function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    document.getElementById("time").textContent = timeString;
  }
  
  // 매 초마다 시간 업데이트
  setInterval(updateTime, 1000);
  updateTime(); // 초기 시간 업데이트
  