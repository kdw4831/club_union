<?php
    $con = mysqli_connect("localhost", "userid", "c1722172", "cookDB") or die ("MYSQL 접속 실패");
    $sql = $_POST['sql'];
    $ret = mysqli_query($con, $sql);

    if ($_POST['type'] === "get_from_sql") {
        $ret_collectall = mysqli_query($con, $sql);
        $rows = array();

        while ($row = mysqli_fetch_assoc($ret_collectall)) { 
            $rows[] = $row;
        }
        mysqli_close($con);
        echo json_encode($rows);  
        return;
    };

    mysqli_close($con);
    echo "success";
?>