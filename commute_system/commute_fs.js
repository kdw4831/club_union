function initialize() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "process.php?sql=" + encodeURIComponent(`select * from commute_log`), true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onload = function() {
        sql_result = JSON.parse(this.responseText);
        for (let i = 0; i < Object.keys(sql_result).length; i++) {
            _var = document.getElementById(sql_result[i].username);
            if (sql_result[i].state === "출근") {
                _var.textContent = "ON";
            } else {
                _var.textContent = "OFF";
            }
        }
    };
}

function log_append() {
    // 현재시간 구하기
    current_time = new Date();

    // 이름, 출퇴근, 년, 월, 일, 시, 분 변수 선언 
    const _year = current_time.getFullYear(), _month = current_time.getMonth()+1, _date = current_time.getDate();
    const _hours = current_time.getHours(), _minutes = current_time.getMinutes(), _seconds = current_time.getSeconds();
    date = `${_year}-${_month}-${_date} ${_hours}:${_minutes}:${_seconds}`; // 년 월 일 시간
    attend_name = document.getElementById("name").value; //출근자명
    state = document.getElementById("state").value; //출근 퇴근

    // 최근 30분간 출퇴근 기록이 있는지
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "process.php?sql=" + `Select * from commute_log where username='${attend_name}' AND state='${state}'`, true);
    xhr.send()
    xhr.onload = function() {
        // 30분 이내 출퇴근 여부
        sql_result = JSON.parse(this.responseText); // 값 받아오기
        if (Object.keys(sql_result).length > 0) { // 기록이 1개 이상이면
            last_event_time = new Date(sql_result[sql_result.length-1].event_time); // 가장 최근 시간
            min_time_diff = diff_minutes(last_event_time, current_time); // 분 단위 차이
            if (min_time_diff < 30) { // 30분 이하로 차이나면
                if (sql_result[sql_result.length-1].state === state) {
                    alert(`30분 이내 출근 및 퇴근을 연속으로 입력할 수 없습니다.\n
                    ⓘ 최근 ${state} 시간 : ${last_event_time.getMonth() +1}/${last_event_time.getDate()} ${last_event_time.getHours()}시 ${last_event_time.getMinutes()}분 (${min_time_diff}분 전)`)
                    return;
                }
            }
        }

        // 없으면 실행
        var xhr2 = new XMLHttpRequest(); // 리퀘스트 객체 생성
        xhr2.open("POST", "process.php", true);
        xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
        xhr2.send("date=" + encodeURIComponent(date) +
                "&attend_name=" + encodeURIComponent(attend_name) +
                "&state=" + encodeURIComponent(state));
        
        xhr2.onload = function(result) {
            alert(state + " 처리가 완료되었습니다.");
        };
    }
};

function log_check() {
    // 정보 받아오기
    request_name = document.getElementById("name").value; // 출근자명
    state = document.getElementById("state").value; //출근 퇴근

    // XML request와 변수 전달
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "process.php?sql=" + encodeURIComponent(`select * from commute_log where username='${request_name}'`), true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    
    // 로드되었을 때
    xhr.onload = function() {   
        // 1번 리턴값 반환 (출근 기록 전체)
        sql_result = JSON.parse(this.responseText);

        // 기존 테이블 삭제
        table = document.getElementById("commutelog");
        if (table != null) { // 테이블이 생성되어 있다면
            document.body.removeChild(table);
        };

        // 출근 기록이 없을 경우
        if (Object.keys(sql_result).length === 0) {
            alert(request_name + "님의 출근 기록을 찾을 수 없습니다.")
            return;
        };

        // 테이블 생성
        table = document.createElement("table"); 
        table.setAttribute('border', '1'); // 줄 굵기 지정
        table.setAttribute('id', 'commutelog'); // id 지정
        document.body.appendChild(table); // 첨부

        // 테이블 구성
        for (let i = 0; i < Object.keys(sql_result).length; i++) {
            // 줄 추가
            let tree = document.createElement("tr");
            table.appendChild(tree);
    
            // 줄에 시간 추가
            let tree_element = document.createElement("td");
            tree_element.textContent = sql_result[i].event_time;
            tree.appendChild(tree_element);

            // 줄에 이름 추가
            tree_element = document.createElement("td");
            tree_element.textContent = sql_result[i].username;
            tree.appendChild(tree_element);

            // 줄에 상태 추가
            tree_element = document.createElement("td");
            tree_element.textContent = sql_result[i].state;
            tree.appendChild(tree_element);
        }
    };
}

function diff_minutes(dt2, dt1) {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff)); 
}
