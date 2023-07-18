let mode="fID";
let tabs=document.querySelectorAll(".findID-PWline div , a");

for(let i=2; i<4; i++){
    tabs[i].addEventListener("click",function(event){filter(event) })
}

// 이메일 선택 시 칸이 채워지는 이벤트리스너
function change_event() {
    _current = document.getElementById("input_email2");
    if (_target.value === "직접입력") {
        _current.value = "";
        _current.disabled = false;
    } else {
        _current.value = _target.value;
        _current.disabled = true;
    }
};

// 프로토타입 함수 지정 (Random)
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
};
    
function render(){
    if(mode=='fID'){
        let resultHtml=''
        resultHtml +=`
        <div class="find-border2">
                    <h3>아래의 이메일 인증으로 <a style="color: blue;">아이디</a>를 찾으실 수 있습니다.</h3>
                    <div class="input-borderID">
                        <ui>
                            <li><a class="email-dlsemd">이메일 인증</a></li>
                            <hr>
                           
                            <li>
                                <a class="name">이름</a>
                                <input class="input_name" type="text" placeholder="이름을 입력해주세요.">
                            </li>
                            <li>
                                <a class="phonenum">전화번호</a>
                                <input style="text-align:center" class="input_phonenum" type="text" placeholder="010">
                                <input style="text-align:center" class="input_phonenum1" type="text" placeholder="1234">
                                <input style="text-align:center" class="input_phonenum2" type="text" placeholder="5678">
                            </li>
                            <li>
                                <a class="email">이메일</a>
                                <input class="input_email1" type="text">@<input id="input_email2" class="input_email2" type="text">
                                <select id ="email_type" class="section">
                                    <option value="직접입력">직접 입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="google.com">google.com</option>
                                    <option value="yahoo.com">yahoo.com</option>s
                                </select>
                            </li>
                        </ui>
                        <button onclick="find_information('id')" class="findID_button">아이디 찾기</button>
                    </div>
                </div>`
        document.getElementById("find-border2").innerHTML=resultHtml;

    }else {
        let resultHtml=''
        resultHtml +=`
        <div class="find-border2">
            <h3>아래의 이메일 인증으로 <a style="color: blue;">비밀번호</a>를 찾으실 수 있습니다.</h3>
            <div class="input-borderPW">
                <ui>
                    <li><a class="email-dlsemd">이메일 인증</a></li>
                    <hr>
                    <li>
                        <a class="name">아이디</a>
                        <input class="input_ID" type="text" placeholder="아이디를 입력해주세요.">
                    </li>
                    <li>
                        <a class="name">이름</a>
                        <input class="input_name" type="text" placeholder="이름을 입력해주세요.">
                    </li>
                    <li>
                        <a class="email">이메일</a>
                        <input class="input_email1" type="text">@<input id="input_email2" class="input_email2" type="text">
                        <select id="email_type" class="section">
                            <option value="직접입력">직접 입력</option>
                            <option value="naver.com">naver.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="daum.net">daum.net</option>
                            <option value="yahoo.com">yahoo.com</option>
                        </select>
                    </li>
                    <li>
                    <button onclick="find_information('pw')" class="findPW_button">비밀번호 찾기</button>
                    </li>
                </ui>
            </div>
        </div>`
        document.getElementById("find-border2").innerHTML=resultHtml;
    }
    _target = document.getElementById("email_type");
    _target.addEventListener("change", change_event);
}


function filter(event){
    mode=event.target.id

    document.getElementById("under-line").style.width=
    event.target.offsetWidth+"px";

    document.getElementById("under-line").style.top=
    event.target.offsetTop+event.target.offsetHeight+"px";

    document.getElementById("under-line").style.left=
    event.target.offsetLeft+"px";
    render()
}

// 아이디 및 비번찾는 함수
function find_information(type) {
    // 무결성 검사
    _email = document.getElementsByClassName("input_email1")[0].value + "@" + document.getElementsByClassName("input_email2")[0].value; 
    _input_name = document.getElementsByClassName("input_name")[0].value;
    _input_id = document.getElementsByClassName("input_ID")[0];

    if (_input_name === "") {
        alert("이름을 입력해주세요.");
        return;
    } else if (_email === "" || _email.length < 15) {
        alert("이메일을 올바르게 입력해주세요.");
        return;
    } else if (type === "pw" && _input_id.value === "") {
        alert("아이디를 입력해주세요.");
        return;
    }

    if (type == "id") {
        _phonenum = document.getElementsByClassName("input_phonenum")[0].value + document.getElementsByClassName("input_phonenum1")[0].value + document.getElementsByClassName("input_phonenum2")[0].value;
        if (_phonenum === "") {
            alert("전화번호를 입력해주세요.");
            return;
        }
    }

    // sql 구문 설정
    if (type === "id") {
        _sql = `select * from user_list where email='${_email}' and username='${_input_name}' and phone_number='${_phonenum}'`;
    } else {
        _sql = `select * from user_list where email='${_email}' and username='${_input_name}' and id='${_input_id.value}'`;
    }

    xhr = new XMLHttpRequest();
    xhr.open("POST", "process.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 변수 넘길 시 필요함
    xhr.send("sql=" + _sql + "&type=" + encodeURIComponent("get_from_sql"));
    xhr.onload = function() {
        sql_result = JSON.parse(this.responseText)[0];
        if (sql_result != undefined) {
            if (type === "id") {
                alert(`해당 회원님의 아이디는 [${sql_result.id}] 입니다.`)
                location.replace("/login_system");
            } else {
                // 임시 비밀번호 생성
                generated_key = ""
                _array = ["a", "b", "c", "d", "e", "f", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
                for (let i=0; i<10; i++) {
                    generated_key += _array.random();
                };

                // 이메일 전송
                xhr2 = new XMLHttpRequest();
                xhr2.open("POST", "../sendmail.php", true);
                xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr2.send(
                "email=" + encodeURIComponent(_email)
                + "&subject=" + encodeURIComponent(`동아리연합회 비밀번호 찾기`)
                + "&body=" + encodeURIComponent(`요청하신 임시 비밀번호는 [${generated_key}] 입니다.`)
                + "&id=" + encodeURIComponent(_input_id.value)
                + "&username=" + encodeURIComponent(_input_name)
                + "&key=" + encodeURIComponent(generated_key)
                + "&division=" + encodeURIComponent("email_findPW_update"));
                xhr2.onload = function() {
                    console.log(this.responseText);
                };
                
                alert("입력하신 이메일로 임시 비밀번호를 전송했습니다.\n임시 비밀번호로 로그인해 주십시오.");
                location.replace("/login_system");
            }       
        } else {
            alert("해당 정보로 가입된 회원을 찾을 수 없습니다.\n입력하신 정보를 확인해 주십시오.")
        }
    } 
}

// html 렌더링
render()

// 기본 폼
document.getElementsByClassName("input_phonenum")[0].value = "010";
