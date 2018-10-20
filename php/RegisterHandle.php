<?php
/**
 * Created by PhpStorm.
 * User: DELL
 * Date: 2018/6/28
 * Time: 16:44
 */
sleep(1);
header("content-type:text/html;charset=utf-8");
if($_POST['username']!=""&&$_POST['password']!=""&&$_POST['password2']!=""){
    if($_POST['password']==$_POST['password2']){
        $name=$_POST['username'];
        $password=$_POST['password'];
        $connection=mysqli_connect("localhost","root","") or die("数据库链接失败");
        mysqli_query($connection,"set names utf8");
        mysqli_select_db($connection,"data");
        $sql="SELECT * FROM userinfo WHERE name='$name'";
        $result=mysqli_query($connection,$sql);
        if(mysqli_num_rows($result)>0){
            echo "<script language=\"JavaScript\">";
            echo "alert(\"该用户已存在\")";
            echo "location.href=\"../Register.html\"";
            echo "</script>";
            echo "<br>";
        }
        else{
            $time = date("Y-m-d H:i:s",time());
            $sqll="INSERT INTO userinfo (name,password,time,type,approve) VALUES ('$name','$password','$time','注册用户','未批准')";
            $result=mysqli_query($connection,$sqll);
            if($result){
                echo "<script language=\"javascript\">";
                echo "alert(\"注册成功!请耐心等待管理员批准\");";
                echo "location.href=\"../Login.html\"";
                echo "</script>";
            }
            else{
                echo "<script language=\"javascript\">";
                echo "alert(\"注册失败！\");";
                echo "location.href=\"../Register.html\"";
                echo "</script>";
                echo "<br>";
            }
        }
    }
    else{
        echo "<script language=\"javascript\">";
        echo "alert(\"两次密码不一致\");";
        echo "location.href=\"../Register.html\"";
        echo "</script>";
        echo "<br>";
    }
}
else{
    echo "<script language=\"javascript\">";
    echo "alert(\"用户名,密码不能为空！\");";
    echo "location.href=\"../Register.html\"";
    echo "</script>";
}
mysqli_close($connection);