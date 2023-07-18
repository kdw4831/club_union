function sendmail(email, subject, body, division) {
    // 이메일 전송
    xhr = new XMLHttpRequest();
    xhr.open("POST", `../sendmail.php`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // 메일 내용 및 키 전달
    xhr.send("email=" + encodeURIComponent(email)
    + "&body=" + encodeURIComponent(body)
    + "&subject=" + encodeURIComponent(subject)
    + "&division=" + encodeURIComponent(division));
    xhr.onload = function() {
       return this.responseText;   
    }   
}