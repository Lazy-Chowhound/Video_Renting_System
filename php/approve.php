<?php
/**
 * Created by PhpStorm.
 * User: DELL
 * Date: 2018/7/2
 * Time: 13:42
 */
header("content-type:text/html;charset=utf-8");
$connection=mysqli_connect("localhost","root","") or die("数据库连接失败");
mysqli_query($connection,"set names utf8");
mysqli_select_db($connection,"data");
$sql="UPDATE userinfo SET approve='已批准' WHERE type='注册用户' AND approve='未批准'";
$result=mysqli_query($connection,$sql);
if($result){
    echo json_encode('success');
}
else{
    echo json_encode('failure');
}
mysqli_close($connection);