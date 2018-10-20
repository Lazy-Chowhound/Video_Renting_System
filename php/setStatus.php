<?php
/**
 * Created by PhpStorm.
 * User: DELL
 * Date: 2018/7/2
 * Time: 14:15
 */
header("content-type:text/html;charset=utf-8");
$connection=mysqli_connect("localhost","root","") or die("数据库链接失败");
mysqli_query($connection,'set names utf8');
mysqli_select_db($connection,"data");
$number=$_POST['number'];
$status=$_POST['status'];
if($status=='available') {
    $sql = "UPDATE video SET status='可借',rentdate=NULL,returndate=NULL WHERE number='$number'";
    $result = mysqli_query($connection, $sql);
}
else if($status=='reserved'){
    $sql = "UPDATE video SET status='已预约' WHERE number='$number'";
    $result = mysqli_query($connection, $sql);
}
else if($status='rentout') {
    $rentdate = date("Y-m-d",time());
    $returndate=date('Y-m-d',strtotime("$rentdate +30 day"));
    $sql = "UPDATE video SET status='借出',rentdate='$rentdate',returndate='$returndate' WHERE number='$number'";
    $result = mysqli_query($connection, $sql);
}
if ($result ==true) {
    echo json_encode("success");
} else {
    echo json_encode("failure");
}
mysqli_close($connection);