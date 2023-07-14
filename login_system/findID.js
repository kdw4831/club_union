let mode="fID";    // mode란 아이디찾기 비밀번호 찾기를 구분하기 위한 변수 선언, 초기에는  mode==fID 로 아이디 찾기가 우선적으로 보여지는 걸 말함
let tabs=document.querySelectorAll(".findID-PWline div , a"); // tabs는 findID-PWline에 있는 div와 a를 선택해줌







// 여기서 우리가 필요한건  a 태그에 있는 fid와 fpw를 선택해야된다 그래서  for 문을 활용해 이 두개를 제외한 underline등을 없에준다
//그래서 인덱스로 2,3이 선택되게 하고 클릭을 할때 선택한 a태그가 웹 콘솔창에 출력 된다, 그후 이 태그를 선택할 때 이벤트는 클릭으로 하고
// 클릭이벤트가 일어났을 때 filter함수가 발생되도록 한다.
for(let i=2; i<4; i++){
    console.log(tabs[i]);
    tabs[i].addEventListener("click",function(event){filter(event) })
}




function render(){
    
    // mode가 fid일 때  resultHTMl에 아이디 찾기 폼이 들어가게 한후 innerhtml로 웹화면에 출력되게 한다.
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
    
    }else { // mode가 fPW일 때  resultHTMl에 비밀번호 찾기 폼이 들어가게 한후 innerhtml로 웹화면에 출력되게 한다.
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
    mode=event.target.id // 여기서 event.target.id는  클릭했을 때 선택된 테그에 있는 id를 출력하게 하는것을 의미
    console.log(mode)

    document.getElementById("under-line").style.width=            //이 부분은 youtube강의로 설명
    event.target.offsetWidth+"px";

    document.getElementById("under-line").style.top=
    event.target.offsetTop+event.target.offsetHeight+"px";

    document.getElementById("under-line").style.left=
    event.target.offsetLeft+"px";




    render()
    
  
}
render()
