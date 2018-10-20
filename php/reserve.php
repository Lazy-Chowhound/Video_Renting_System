<?php
/**
 * Created by PhpStorm.
 * User: DELL
 * Date: 2018/7/1
 * Time: 15:02
 */
header("content-type:text/html;charset=utf-8");
$connection=mysqli_connect("localhost","root","") or die('数据库连接失败');
mysqli_query($connection,"set names utf8");
mysqli_select_db($connection,"data");
$name=$_POST['name'];
$sql="SELECT * FROM video WHERE name='$name'";
$result=mysqli_query($connection,$sql);
$row=mysqli_fetch_array($result,MYSQLI_NUM);
if($row[2]=='可借'){
    mysqli_query($connection,"UPDATE video SET status='已预约' WHERE name='$name'");
    echo json_encode('success');
}
else{
    echo json_encode('failure');
}
mysqli_close($connection);