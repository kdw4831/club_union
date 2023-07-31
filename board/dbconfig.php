<?php



$servername='localhost';
$username='root';
$password='1234';
$db='board'; // 여기가 내가 sql로 작성한 부분이야 그니까 
//pdo객체는 다른데이타베이스를 연결할 떄도 표준으로 쓸 수 있다.


try{
    $conn=new PDO("mysql: host=".$servername.";dbname=".$db, $username,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
}catch(PDOException $e){
    echo "Connection failed:".$e->getMessage();
}


/*
$con = mysqli_connect($servername, $username, $password, $db);
if (mysqli_connect_error($con)) {
    echo "MySQL 접속 실패!", "<br>";
    echo "오류 원인 : ", mysqli_connect_error();
    exit();
}
echo "MySQL 접속 성공!";
mysqli_close($con);
*/

