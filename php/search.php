<?php
/**
 * Created by PhpStorm.
 * User: DELL
 * Date: 2018/6/30
 * Time: 19:36
 */
sleep(1);
header("content-type:text/html;charset=utf-8");
$connection=mysqli_connect("localhost","root","") or die("数据库连接失败");
mysqli_query($connection,"set names utf8");
mysqli_select_db($connection,"data");
$name=$_POST['name'];
$sql="SELECT * FROM video WHERE name='$name'";
$result=mysqli_query($connection,$sql);
if(mysqli_num_rows($result)){
    $video=array();
    while($row=mysqli_fetch_array($result,MYSQLI_NUM)){
        $video[]=$row;
    }
    echo json_encode($video);
}
else{
    echo json_encode('none');
}
mysqli_close($connection);