let mode="fID";
let tabs=document.querySelectorAll(".findID-PWline div , a");








for(let i=2; i<4; i++){
    console.log(tabs[i]);
    tabs[i].addEventListener("click",function(event){filter(event) })
}




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
                                <a class="email">이메일</a>
                                <input class="input_email1" type="text">@<input class="input_email2" type="text">
                                <select class="section">
                                    <option value="직접입력">직접 입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="google.com">google.com</option>
                                </select>
                            </li>
                        </ui>
                        <button class="findID_button">아이디 찾기</button>
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
                        <input class="input_email1" type="text">@<input class="input_email2" type="text">
                        <select class="section">
                            <option value="직접입력">직접 입력</option>
                            <option value="gmail.com">naver.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="gmail.com">daum.net</option>
                            <option value="gmail.com">google.com</option>
                        </select>
                    </li>
                    <li>
                        <button class="findPW_button">비밀번호 찾기</button>
                    </li>
                </ui>
            </div>
        </div>`
        document.getElementById("find-border2").innerHTML=resultHtml;
    }

   


    
    
 

}


function filter(event){
    mode=event.target.id
    console.log(mode)

    document.getElementById("under-line").style.width=
    event.target.offsetWidth+"px";

    document.getElementById("under-line").style.top=
    event.target.offsetTop+event.target.offsetHeight+"px";

    document.getElementById("under-line").style.left=
    event.target.offsetLeft+"px";




    render()
    
  
}
render()
