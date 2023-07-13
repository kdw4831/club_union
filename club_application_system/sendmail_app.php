<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    // 이메일 접속 함수
    function email_send($email) {     
        // 쿼리 수정
        $club_name = $_POST['club_name'];
        $student_number = $_POST['student_number'];
        $status = $_POST['status'];
        $con = mysqli_connect("localhost", "userid", "c1722172", "cookDB") or die ("MYSQL 접속 실패");
        $sql = "update applications set state = '" . $status . "' where student_number = " . $student_number . " and club_name = '" . $club_name . "'"; 
        $ret = mysqli_query($con, $sql);
        mysqli_close($con);
        
        if ($_POST['status'] != "면접 완료") { // 면접 완료인 경우 따로 메일을 보내지 않음.
            require 'C:\Users\hcyl2\vendor\autoload.php';
            $mail = new PHPMailer(true); 

            $body = $_POST["body"]; // 내용

            $mail->IsSMTP();             
            $mail->CharSet = "utf-8";             
            $mail->SMTPAuth = true;    
            $mail->SMTPSecure = 'tls';             
            $mail->Port = 587;                    
            
            $mail->Host = "smtp.gmail.com";    
            $mail->Username = "hyochan250@gmail.com";    // 계정
            $mail->Password = "miqylhkiwvkklftx";        // 패스워드
            $mail->SetFrom('hyochan250@gmail.com', '동아리연합회'); // 보내는 사람 email 주소와 표시될 이름 (표시될 이름은 생략가능)
            $mail->AddAddress($_POST["email"]); // 받을 사람 email 주소와 표시될 이름 (표시될 이름은 생략가능)
            $mail->Subject = "동아리연합회";        // 메일 제목
            $mail->MsgHTML($body);    // 메일 내용 (HTML 형식도 되고 그냥 일반 텍스트도 사용 가능함)
            $mail->Send();

            try {
                // Email sending code here
            } catch (Exception $e) {
                echo "Email could not be sent";
                return;
            }
        }

        echo $status;
    };
    $email_address = $_POST["email"];
	email_send($email_address);
?>