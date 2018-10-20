<?php
/**
 * Created by PhpStorm.
 * User: DELL
 * Date: 2018/7/3
 * Time: 14:35
 */
header("content-type:text/html;charset=utf-8");
$connection=mysqli_connect("localhost","root","") or die('数据库连接失败');
mysqli_query($connection,"set names utf8");
mysqli_select_db($connection,"data");
$number=$_POST['number'];
$result=mysqli_query($connection,"UPDATE video SET status='已预约' WHERE number='$number'");
if($result==true) {
    echo json_encode('success');
}
else{
    echo json_encode('failure');
}
mysqli_close($connection);