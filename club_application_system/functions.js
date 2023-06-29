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
    } else if (document.getElementById("email").value.includes("@") === false) {
        alert("이메일을 정확히 입력해 주십시오.");
        return;
    } else if (document.getElementById("description").value.length < 70) {
        alert("지원 동기를 70자 이상 입력해 주십시오.");
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
    xhr.open("POST", "process.php?sql=" + encodeURIComponent(`insert into applications(club_name, username, student_number, major, birthyear, email, user_description)
    Values (${_club_name}, ${_name}, ${_student_number}, ${_major}, ${_birthyear}, ${_email}, ${_description})`), true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onload = function() {
        console.log(this.responseText);
    }
}