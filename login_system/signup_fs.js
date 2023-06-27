// 프로토타입 함수 지정 (Random)
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
};

// 전역변수 지정
var id_confirm = false; // id 중복확인 여부
var email_confirm = false; // email 인증 여부

function sign_in() {
    _id_value = document.getElementById("signup_id").value // 입력한 id값
    _pw_value = document.getElementById("signup_pw").value // 입력한 pw값
    _phone_number = document.getElementById("signup_phonenum").value // 입력한 이메일
    _email_value = document.getElementById("signup_email").value // 입력한 이메일
    _name_value = document.getElementById("signup_name").value // 입력한 이름
    
    // _authdate 추출
    _now = new Date();
    _year = _now.getFullYear(), _month = _now.setMonth(_now.getMonth() +1), _date = _now.getDate(), _min = _now.getMinutes(), _sec = _now.getSeconds();
    _authdate = `${_year}-${_month}-${_date} ${_min}:${_sec}`; // 가입 기준 시각 'y-m-d m:s' 정렬 (query) 

    // 값 정확히 입력했는지
    if (_id_value === "") {
        alert("ID를 입력해 주십시오.")
        return
    } else if (_pw_value === "") {
        if (_pw_value.length < 8) {
            alert("PW는 8글자 이상이어야 합니다.")
            return
        }
        alert("PW를 입력해 주십시오.")
        return
    } else if (_phone_number === "") {
        if (_phone_number.length != 11) {
            alert("전화번호를 정확히 입력해 주십시오.")
            return 
        }
        alert("전화번호를 입력해 주십시오.")
        return
    } else if (_email_value === "") {
        alert("이메일을 입력해 주십시오.")
        return 
    } else if (_name_value === "") {
        alert("이름을 입력해 주십시오")
        return
    }

    // 모든 인증이 완료되었는지
    if (id_confirm != true) {
        alert("아이디 중복확인을 진행해 주십시오");
        return;
    } else if (email_confirm != true) {
        alert("이메일 인증을 진행해 주십시오.")
        return;
    }

    xhr = new XMLHttpRequest();
    xhr.open("POST", "signup.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 변수 넘길 시 필요함
    // 쿼리 구문 전달
    xhr.send("type=" + encodeURIComponent("normal") + "&sql=" + encodeURIComponent(`insert into user_list (username, email, phone_number, authdate, id, pw) value ('${_name_value}', '${_email_value}', '${_phone_number}', '${_authdate}', '${_id_value}', '${_pw_value}')`));

    xhr.onload = function() {
        if (this.responseText === "success") {
            alert("회원가입이 완료되었습니다.");
            location.href = "index.html";
        } else {
            alert("회원가입 진행 중 에러가 발생하였습니다.\n관리자에게 문의해주십시오.");
        }
    }   
}

function send_email() {
    // 인증키 생성
    let keys = ["C", "D", "E", "F", "G", "A", "Y", "Z", "N", "1" ,"2", "3", "4", "5", "6", "7", "8", "9", "0"];
    let generated_key = "";
    // 10자리 생성 (query required length)
    for(let i = 0; i<10; i++) {
        generated_key += keys.random();
    };

    // 이메일 받아오기
    _email = document.getElementById("signup_email").value;
    if (_email.length < 12 || _email.includes("@") === false) { // '@' 포함 and 12자리 이상 입력
        alert("이메일을 정확히 입력해 주십시오.");
        return;
    };

    // 이메일 중복 확인
    xhr = new XMLHttpRequest();
    xhr.open("POST", "signup.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    input_email = document.getElementById("signup_email").value;
    xhr.send("type=" + encodeURIComponent("verification") + "&sql=" + encodeURIComponent(`select * from user_list where email='${input_email}'`));
    xhr.onload = function() {
        sql_result = JSON.parse(this.responseText);
        if (Object.keys(sql_result).length != 0) {
            alert("이미 사용중인 이메일입니다.");
            return;
        } else {
            // 버튼 비활성화 및 안내 메세지
            _button = document.getElementById("verification_sendmail");
            _button.disabled = true;
            _button2 = document.getElementById("verification");
            _button2.disabled = false;
            alert(`인증 이메일이 '${_email}'로 전송되었습니다.\n잠시만 기다려주세요.`);
            
            // 이메일 전송
            xhr2 = new XMLHttpRequest();
            xhr2.open("POST", "sendmail.php", true);
            xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr2.send("key=" + encodeURIComponent(generated_key) + "&email=" + encodeURIComponent(_email));
            xhr2.onload = function() {
                if (this.responseText === "Email could not be sent") { // 만약 잘 안갔다면
                    alert("서버 통신 과정에서 오류가 발생했습니다.")
                    _button.disabled = false;
                    _button2.disabled = true;
                }
            }   
        }
    }
}

function check_key() {
    xhr = new XMLHttpRequest();
    xhr.open("POST", "signup.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 변수 넘길 시 필요함
    // 쿼리 구문 전달
    _email = document.getElementById("signup_email").value;
    xhr.send("sql=" + encodeURIComponent(`select * from verification where useremail='${_email}'`) + "&type=" + encodeURIComponent("verification"));

    let _state = "not done";
    xhr.onload = function() {
        sql_result = JSON.parse(this.responseText);
        for (let i = 0; i < Object.keys(sql_result).length; i++) {
            if (sql_result[i].key_var === document.getElementById("signup_code").value) {
                alert("인증되었습니다.")
                email_confirm = true; // 전역변수 설정
                document.getElementById("verification").disabled = true; // 버튼 비활성화
                document.getElementById("verification").textContent = "인증됨";
                xhr2 = xhr = new XMLHttpRequest();
                xhr2.open("POST", "signup.php");
                xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                // javascript sql 구문을 php 변수로 전달
                xhr2.send("type=" + encodeURIComponent("normal") + "&sql=" + encodeURIComponent(`delete from verification where useremail='${document.getElementById("signup_email").value}'`))
                let _state = "done";
                return;
            }
        }
        
        if (_state != "done") {
            alert("인증번호가 일치하지 않습니다.");
        }
    }
}

function check_overwrite(type) {
    _userid = document.getElementById("signup_id").value;

    if (_userid.length < 8 ) {
        alert("ID는 8글자 이상이어야 합니다.");
        return
    } 

    xhr = new XMLHttpRequest();
    xhr.open("POST", "signup.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("type=" + encodeURIComponent("verification") + "&sql=" + encodeURIComponent(`SELECT EXISTS(SELECT 1 FROM user_list WHERE id = '${_userid}');`));
    xhr.onload = function() {
        _var = JSON.parse(this.responseText);        
        _found_count = Object.values(_var[0])[0]; // 찾은 값의 수
        if (_found_count === "0") {
            alert("사용 가능한 ID입니다.");
            document.getElementById("signup_id").disabled = true;
            document.getElementById("signup_id_check").disabled = true;
            id_confirm = true; // 인증됨
        } else {
            alert("사용 불가능한 ID입니다.");
        }
    }
}

function login() {
    xhr = new XMLHttpRequest();
    xhr.open("POST", "signup.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    input_id = document.getElementById("id").value;
    input_pw = document.getElementById("password").value;
    xhr.send("type=" + encodeURIComponent("verification") + "&sql=" + encodeURIComponent(`select * from user_list where id='${input_id}'`));
    xhr.onload = function() {
        sql_result = JSON.parse(this.responseText);
        if (Object.keys(sql_result).length === 0) {
            alert("등록되지 않은 ID입니다.");
        } else {
            // id, pw
            req_id = sql_result[0].id;
            req_pw = sql_result[0].pw;
            if (req_id === input_id) {
                if (req_pw === input_pw) {  
                    // 비활성화
                    document.getElementById("id").disabled = true;
                    document.getElementById("password").disabled = true;
                    document.getElementById("login").disabled = true;
                    document.getElementById("signin").disabled = true;
                    // 정보 표시
                    document.getElementById("l_status_name").textContent = `안녕하세요! ${sql_result[0].username}님`;
                    document.getElementById("l_status_authdate").textContent = `가입일자 : ${sql_result[0].authdate}`;
                    // 로그아웃 버튼 표시
                    logout_btn = document.getElementById("l_status_authdate");
                    _new = document.createElement("button");
                    _new.setAttribute("onclick", "logout()");
                    _new.setAttribute("id", "logout_btn");
                    _new.textContent = "로그아웃";
                    logout_btn.appendChild(_new);
                } else {
                    alert("비밀번호가 일치하지 않습니다.");
                }
            }
        }
    }
}

function logout() {
    // UI Refresh
    _id = document.getElementById("id");
    _pw = document.getElementById("password");
    _id.disabled = false;
    _id.value = "";
    _pw.disabled = false;
    _pw.value = "";
    document.getElementById("login").disabled = false;
    document.getElementById("signin").disabled = false;
    document.getElementById("logout_btn").remove();
}



// 1) ID / PASSWORD 암호화 
// 2) EMAIL 중복확인 (V)
// 3) 로그아웃 (V) 
// 4) 로그인 + 동방 예약 시스템    
// 5) 회장인증 방식 고안하기 