<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    function email_send($email){
        // 인증키 받아오기
        $key = $_POST["key"];
        
        // 전송
        require 'C:\Users\hcyl2\vendor\autoload.php';
        $mail = new PHPMailer(true); 

        $body = "요청하신 인증 건에 대한 비밀번호는 [{$key}] 입니다.";

        $mail->IsSMTP();             
        $mail->CharSet = "utf-8";             
        $mail->SMTPAuth = true;    
        $mail->SMTPSecure = 'tls';             
        $mail->Port = 587;                    
        
        $mail->Host = "smtp.gmail.com";    
        $mail->Username = "hyochan250@gmail.com";    // 계정
        $mail->Password = "miqylhkiwvkklftx";        // 패스워드
        $mail->SetFrom('hyochan250@gmail.com', '동아리연합회'); // 보내는 사람 email 주소와 표시될 이름 (표시될 이름은 생략가능)
        $mail->AddAddress($email); // 받을 사람 email 주소와 표시될 이름 (표시될 이름은 생략가능)
        $mail->Subject = '동아리연합회 메일 인증 시스템';        // 메일 제목
        $mail->MsgHTML($body);    // 메일 내용 (HTML 형식도 되고 그냥 일반 텍스트도 사용 가능함)
        $mail->Send();

        try {
            // Email sending code here
        } catch (Exception $e) {
            echo "Email could not be sent";
            return;
        }
        
        // 쿼리에 등록
        $email = $_POST["email"];
        $con = mysqli_connect("localhost", "userid", "c1722172", "cookDB") or die ("MYSQL 접속 실패");
        $sql = "INSERT INTO verification VALUES ('".$email."', '".$key."')"; 
        $ret = mysqli_query($con, $sql);
        mysqli_close($con);

        // 이동
        header('Location: /calendar');
    };

    $email_address = $_POST["email"];
	email_send($email_address);
?>