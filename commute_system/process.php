<?php
    $type = $_SERVER['REQUEST_METHOD'];
    $con = mysqli_connect("localhost", "userid", "c1722172", "cookDB") or die ("MYSQL 접속 실패"); // 쿼리 연결 

    if ($type === "POST") { 
        $date = $_POST["date"]; 
        $attend_name = $_POST["attend_name"]; 
        $state = $_POST["state"];   
        
        $sql = "INSERT INTO commute_log VALUES ('".$date."', '".$attend_name."', '".$state."')";
        $ret = mysqli_query($con, $sql);
        mysqli_close($con);
    };

    if ($type === "GET") {
        $sql = $_GET["sql"];    
        
        // 해당 인원의 모든 출퇴근 기록
        $ret_collectall = mysqli_query($con, $sql);
        $rows = array();

        while ($row = mysqli_fetch_assoc($ret_collectall)) { // 이름이 포함된 모든 값 다 가져옴
            $rows[] = $row;
        }

        echo json_encode($rows); 
        mysqli_close($con);
    };
?>