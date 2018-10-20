<?php
/**
 * Created by PhpStorm.
 * User: DELL
 * Date: 2018/7/2
 * Time: 10:48
 */
header("content-type:text/html;charset=utf-8");
$connection=mysqli_connect("localhost","root","") or die("数据库链接失败");
mysqli_query($connection,"set names utf8");
mysqli_select_db($connection,"data");
$sql="SELECT * FROM userinfo WHERE approve='未批准'";
$result=mysqli_query($connection,$sql);
if(mysqli_num_rows($result)>0){
    $table=array();
    while($row=mysqli_fetch_array($result,MYSQLI_NUM)){
        $table[]=$row;
    }
    echo json_encode($table);
}
else{
    echo json_encode('none');
}
mysqli_close($connection);