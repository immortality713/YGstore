<?php

//1.连接数据库
header('content-type:text/html;charset=utf-8');

//2.数据库连接
define('HOST', 'localhost'); //主机名
define('USERNAME', 'root'); //用户名
define('PASSWORD', ''); //密码，如果没有密码，直接设为空define('PASSWORD', '');
define('DBNAME', 'render'); //数据库的名称
$conn = @new mysqli(HOST, USERNAME, PASSWORD, DBNAME);
if ($conn->connect_error) {
    die('数据库连接错误，请检查用户名和密码！' . $conn->connect_error);
}

$conn->query('SET NAMES UTF8');

//2.获取前端出入的sid
if(isset($_GET['sid'])){
    $sid = $_GET['sid'];
    //查询这条数据返回给前端。
    $result=$conn->query("select * from taobaogoods where sid = $sid");//获取一条数据。
    echo json_encode($result->fetch_assoc());
}