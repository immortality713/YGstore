<?php
include "conn.php";

if(isset($_POST['tel']) && isset($_POST['pass'])){
    $tel = $_POST['tel'];
    $pass = sha1($_POST['pass']);//加密和加密进行匹配
    $result=$conn->query("select * from zhuce where tel='$tel' and pass='$pass'");
    if($result->fetch_assoc()){
        echo true;//用户名和密码匹配成功
    }else{
        echo false;//用户名和密码匹配失败
    }
}