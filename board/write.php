<?php

include 'dbconfig.php';


//print_r($_POST);


//$_POST['name'])이 값이 setting이 되었니? 그리고 값이 비어있지 않니? 참이면 그대로 아니면 빈값으로
$name=(isset($_POST['name'])&& $_POST['name'] !='') ?$_POST['name']:'';  
$password=(isset($_POST['password'])&& $_POST['password'] !='') ?$_POST['password']:'';  
$subject=(isset($_POST['subject'])&& $_POST['subject'] !='') ?$_POST['subject']:'';  
$content=(isset($_POST['content'])&& $_POST['content'] !='') ?$_POST['content']:'';  
$code=(isset($_POST['code'])&& $_POST['code'] !='') ?$_POST['code']:'';

if($code=="undefined"){
    $code='freeboard';
}

//비밀번호 단방향 암호화

$pwd_hash=password_hash($password, PASSWORD_BCRYPT);





//정규식 , 정규표현식 EXP 모르는게 너무 많노
preg_match_all("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i", $content, $matches);


#explode 문자열 분리하기  inplode 문자열 합쳐주기
$img_array=[];
foreach($matches[1] AS $key =>$val){
   
    //data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD

    list($type,$data)=explode(';', $val); //a라는 곳에 jpeg까지 담기고 나머지가 b에 담김

    //$type : data:image/jpeg
    //$data : base64,/9j/4AAQSkZJRgABAQEASABIAAD

    list(,$ext)=explode('/', $type);

    $ext=($ext == 'jpeg') ? 'jpg': $ext;  // 만약 확장자가 jpeg로 넘어오면 jpg로 저장을 하고 그외에는 ext으로 저장을 하겠다.
    $filename=date("YmdHis").'_'. $key.'.'.$ext; //202303031111_0.jpg
 
    list(,$base64_decode_data) = explode(',',$data);

    $rs_code=base64_decode($base64_decode_data); //이게 이미지데이터
    file_put_contents("upload/".$filename,$rs_code); // upload폴더에 filename데이터를 넣는다 어떤데이터? base 64를 디코딩한 원본데이터를 넣겠다라는 뜻
    
    $img_array[]= "upload/".$filename;
    //컨텐츠에는 디코딩전 base64 데이터가 들어가 있다 그렇기에 content에 디코딩을 한 데이터를 넣어줘야된다.
    $content=str_replace($val,"upload/".$filename , $content);//$content=str_replace(바꿀대상, 변경할이름, $content);
   
    

}

$imglist= implode('|',$img_array);
$ip=$_SERVER['REMOTE_ADDR'];


//DB에 insert

$sql="INSERT INTO testboard(code,name,subject,password,content,imglist,ip,r_date)
VALUES(:code,:name,:subject,:password,:content,:imglist,:ip,NOW())";

$stmt=$conn->prepare($sql);
$stmt->bindParam(':code',$code);
$stmt->bindParam(':name',$name);
$stmt->bindParam(':subject',$subject);
$stmt->bindParam(':content',$content);
$stmt->bindParam(':password',$pwd_hash);
$stmt->bindParam(':imglist',$imglist);
$stmt->bindParam(':ip',$ip);
$stmt->execute();
//{"result" :"success"}

$arr=['result'=>'success'];
$j=json_encode($arr); 


die($j);  



