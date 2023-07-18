<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    function email_send($email){
        // 전송
        require 'C:\Users\hcyl2\vendor\autoload.php';
        $mail = new PHPMailer(true); 

        $subject = $_POST["subject"];
        $body = $_POST["body"];

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
        $mail->Subject = $subject;        // 메일 제목
        $mail->MsgHTML($body);    // 메일 내용 (HTML 형식도 되고 그냥 일반 텍스트도 사용 가능함)
        $mail->Send();

        try {
            // Email sending code here
        } catch (Exception $e) {
            echo "Email could not be sent";
            return;
        }
        

        // 타입 받아오기 
        // email_verification_sendmail = 회원가입 인증 메일
        // email_club_application = 동아리 가입 신청 안내 이메일
        $division = @$_POST['division']; 

        if ($division === "email_verification_sendmail") {
            $key = explode(" ", $body)[5];
            $email = $_POST["email"];
            $con = mysqli_connect("localhost", "userid", "c1722172", "cookDB") or die ("MYSQL 접속 실패");
            $sql = "INSERT INTO verification VALUES ('".$email."', '".$key."', '')"; 
            $ret = mysqli_query($con, $sql);
            mysqli_close($con);
        } 
        
        if ($division === "email_club_application") {
            $club_name = $_POST['club_name'];
            $student_number = $_POST['student_number'];
            $status = $_POST['status'];
            $con = mysqli_connect("localhost", "userid", "c1722172", "cookDB") or die ("MYSQL 접속 실패");
            $sql = "update applications set state = '" . $status . "' where student_number = " . $student_number . " and club_name = '" . $club_name . "'"; 
            $ret = mysqli_query($con, $sql);
            mysqli_close($con);
        }

        if ($division === "email_findPW_update") {
            $id = $_POST['id'];
            $username = $_POST['username'];
            $email = $_POST['email'];
            $key = $_POST['key'];
            $con = mysqli_connect("localhost", "userid", "c1722172", "cookDB") or die ("MYSQL 접속 실패");
            $sql = "update user_list set pw = '" . $key . "' where username = '" . $username . "' and id = '" . $id . "' and email = '" . $email . "'"; 
            $ret = mysqli_query($con, $sql);
            mysqli_close($con);
        }
    };

    $email_address = $_POST["email"];
	email_send($email_address);
?>