function load_from_db(callback) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", "process.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    _sql = `select * from applications` // applications table의 모든 값
    xhr.send("sql=" + encodeURIComponent(_sql) + "&type=get_data");
    xhr.onload = function() {   
        sql_result = JSON.parse(this.responseText);
        callback(sql_result);
    }
}

function submit() {
    // 값 확인
    if (document.getElementById("name").value === "") {
        alert("이름을 입력해 주십시오.");
        return;
    } else if (document.getElementById("student_number").value.length != 9) {
        alert("학번을 알맞게 입력해 주십시오.");
        return;
    } else if (document.getElementById("major").value === "") {
        alert("학과를 입력해 주십시오.")
        return;
    } else if (document.getElementById("birthyear").value < 1980 || document.getElementById("birthyear").value > 2005) {
        alert("출생년도를 정확히 입력해 주십시오.");
        return;
    } else if (document.getElementById("email").value.includes("@") === false || document.getElementById("email").value.length < 10) {
        alert("이메일을 정확히 입력해 주십시오.");
        return;
    } else if (document.getElementById("description").value.length < 100) {
        alert("지원 동기를 100자 이상 입력해 주십시오.");
        return;
    }

    // 값 받아오기
    _club_name = document.getElementById("club_name").value;
    _name = document.getElementById("name").value;
    _student_number = document.getElementById("student_number").value;
    _major = document.getElementById("major").value;
    _birthyear = document.getElementById("birthyear").value;
    _email = document.getElementById("email").value;
    _description = document.getElementById("description").value;

    xhr = new XMLHttpRequest();
    xhr.open("POST", "process.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    _sql = `insert into applications(club_name, username, student_number, major, birthyear, email, user_description, state) Values ('${_club_name}', '${_name}', '${_student_number}', '${_major}', '${_birthyear}', '${_email}', '${_description}', '면접 신청')`
    xhr.send("sql=" + encodeURIComponent(_sql) + "&type=normal");
    xhr.onload = function() {
        if (this.responseText === "success") {
            alert("가입신청이 완료되었습니다.\n\n해당 동아리의 회장님이 승인할 경우,\n이메일로 안내드리겠습니다.");
            window.location.href = "index.html";
        } else {
            alert("오류가 발생하였습니다.\n관리자에게 문의해주십시오.");
            console.log(this.responseText);
        }
    }
}

// 신청 목록을 불러오는 함수
function show_requests() {
    // db에서 불러오기 
    load_from_db(function(sql_result) {
        // 이벤트 등록 (값이 변화할 시 db에서 새로 불러옴)
        _target = document.getElementById("club_name_management"); 
        _target.addEventListener("change", show_requests);
        // 선택한 값 불러오기
        club_name = _target.value;
        
        // 이미 생성되었다면 삭제
        _target = document.getElementById("temp_class");
        if (_target != null) {
            _target.remove();
        }
         
        // 클래스 생성
        branch = document.createElement("class");
        branch.setAttribute("id", "temp_class");
        document.body.appendChild(branch);

        for (let i = 0; i < Object.keys(sql_result).length; i++) {
            if (sql_result[i].club_name === club_name) {
                // 줄 긋기
                line = document.createElement("hr"); 
                line.setAttribute('size', '2'); // 줄 굵기 지정
                branch.appendChild(line); // 첨부

                // 학번 + 학과 + 이름
                info = document.createElement("t");
                info.textContent = `${sql_result[i].username} | ${sql_result[i].student_number} | ${sql_result[i].major} (${sql_result[i].birthyear}년생)`;
                branch.appendChild(info);

                // 줄 바꿈
                branch.appendChild(document.createElement("br"));

                // 현재 상태
                current_status = document.createElement("t");
                current_status.textContent = `현재 상태 : ${sql_result[i].state}`
                branch.appendChild(current_status);

                // 줄 바꿈
                branch.appendChild(document.createElement("br"));

                // 지원동기
                description = document.createElement("textarea");
                description.value = sql_result[i].user_description;
                description.setAttribute("rows", "10");
                description.setAttribute("cols", "40");
                description.setAttribute("readonly", "true");
                branch.appendChild(description);
                
                // 줄 바꿈
                branch.appendChild(document.createElement("br"));

                // 면접 요청 버튼 
                allow_btn = document.createElement("button");
                allow_btn.textContent = "면접 요청";
                allow_btn.setAttribute("onclick", `handle_request('${club_name}', '${sql_result[i].username}', '${sql_result[i].student_number}', "면접 요청", '${sql_result[i].email}')`);
                if (sql_result[i].state === "신청 거절" || sql_result[i].state === "면접 요청 완료" || sql_result[i].state === "면접 완료") {
                    allow_btn.setAttribute("disabled", "true");
                }
                branch.appendChild(allow_btn);

                // 신청 거절, 면접완료
                deny_btn = document.createElement("button");
                deny_btn.textContent = "신청 거절";
                deny_btn.setAttribute("onclick", `handle_request('${club_name}', '${sql_result[i].username}', '${sql_result[i].student_number}', "신청 거절", '${sql_result[i].email}')`);
                if (sql_result[i].state === "신청 거절" || sql_result[i].state === "면접 요청 완료" || sql_result[i].state === "면접 완료") {
                    deny_btn.setAttribute("disabled", "true");
                }
                branch.appendChild(deny_btn);

                audition_complete_btn = document.createElement("button");
                audition_complete_btn.textContent = "면접 완료";
                audition_complete_btn.setAttribute("onclick", `handle_request('${club_name}', '${sql_result[i].username}', '${sql_result[i].student_number}', "면접 완료", '${sql_result[i].email}')`);
                if (sql_result[i].state === "신청 거절" || sql_result[i].state === "면접 신청" || sql_result[i].state === "면접 완료") {
                    audition_complete_btn.setAttribute("disabled", "");
                }
                branch.appendChild(audition_complete_btn);

                // 줄 바꿈
                branch.appendChild(document.createElement("br"));
            }
        }
    })};

function handle_request(club_name, username, student_number, status, email, msg="") {
    if (status != "면접 요청 메세지 전송") {
        _yesno = confirm(`해당 동아리 신청건을 '${status}' 하시겠습니까?`);
        if (_yesno === false) {
            return;
        } else if (status === "면접 요청") {
            popup(club_name, username, student_number, status, email, msg="");
            return;
        } else if (status === "면접 완료") {
            alert("해당 요청을 처리합니다.\n잠시만 기다려주세요.")
        } else {
            alert("해당 요청을 처리한 뒤 지원자에게 이메일을 전송합니다.\n이메일 전송은 최대 1분정도 소요됩니다.");
        }
    }

    // 이메일 전송
    xhr = new XMLHttpRequest();
    xhr.open("POST", "../sendmail.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (msg === "") { // 면접 완료일 경우
        _body = `${username}님의 [${club_name}] 동아리 가입 신청이 ${status}되었습니다.`
    } else { // 면접 요청일 경우
        _body = `${username}님의 [${club_name}] 동아리 가입 신청이 ${status}되었습니다.<br>
        메세지 : ${msg}`
    }

    xhr.send("subject=" + encodeURIComponent(`동아리연합회`) + "&body=" + encodeURIComponent(_body)
    + "&email=" + encodeURIComponent(email)
    + "&club_name=" + encodeURIComponent(club_name) + "&student_number=" + encodeURIComponent(parseInt(student_number))
    + "&status=" + encodeURIComponent(status) + "&division=" + encodeURIComponent("email_club_application"));
    
    xhr.onload = function() {
        console.log(this.responseText);
        if (this.responseText === "Email could not be sent") { // 만약 잘 안갔다면
            alert("서버 통신 과정에서 오류가 발생했습니다.")
        } else {
            location.reload(true);
        }
    }
}

function popup(club_name, username, student_number, status, email, msg="") {
    // 면접 요청 메세지 팝업창 구성
    _popup = window.open("", "myPopup", "width=300,height=200");
    // 0. js 연결하기
    _js = _popup.document.createElement("script");
    _js.setAttribute("src", "functions.js");
    _popup.document.head.appendChild(_js);
    // 1. 면접 요청 메세지 받기
    _input = document.createElement("textarea");
    _input.setAttribute("id", "popup_textinput");
    _input.setAttribute("cols", "35");
    _input.setAttribute("rows", "10");
    _input.setAttribute("placeholder", "면접 요청 메세지\nex)010-1234-5678로 연락 부탁드립니다.");
    _popup.document.body.appendChild(_input);
    // 줄바꿈
    _popup.document.body.appendChild(document.createElement("br"));
    // 2. 버튼 부착하기
    _send = document.createElement("button");
    _send.textContent = "저장";
    _send.addEventListener("click", () => {
        _respond = _popup.document.getElementById("popup_textinput").value
        _popup.close();
        handle_request(club_name, username, student_number, "면접 요청 완료", email, msg=_respond);
    });
    _popup.document.body.appendChild(_send);
}

// -- 개발해야하는 것 --
// 중복 가입신청 방지
