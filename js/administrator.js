function inquery() {
    document.getElementById('videoname').value='';
    document.getElementById('retrieve').style.display='block';
    document.getElementById('searcharea').style.display='block';
    document.getElementById('searchresult').style.display='none';
    document.getElementById('enter').style.display='none';
    document.getElementById('approve').style.display='none';
    document.getElementById('approvebutton').style.display='none';
    document.getElementById('status').style.display='none';
    document.getElementById('setarea').style.display='none';
    document.getElementById('display').style.display='none';
}

function search() {
    if (document.getElementById('videoname').value == ""){
        alert("请输入名称！");
    }
    else {
        document.getElementById('searchresult').style.display='block';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'php/search.php', true)
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send('name='+document.getElementById('videoname').value);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status === 200 && xmlhttp.readyState == 4) {
                var info = xmlhttp.responseText;
                var table = eval(info);
                var div = document.getElementById('searchresult');
                if (table == 'none') {
                    var tab = "<table border='1' bordercolor='black' width='900' height='150' id='hide' class='none'>";
                    tab += "<tr><th>暂无相关影像制品信息</th></tr>";
                    div.innerHTML = tab;
                }
                else {
                    var tab = "<table border='1' bordercolor='black' width='900' height='150' id='hide' class='searchresult'>";
                    tab += "<tr><th>编号</th><th>名称</th><th>状态</th><th>借出时间</th><th>应还时间</th></tr>";
                    for (var i = 0; i < table.length; i++) {
                        tab += "<tr>";
                        for (var j = 0; j < 5; j++) {
                            if (table[i][j]) {
                                tab += "<td>" + table[i][j] + "</td>";
                            }
                            else {
                                tab += "<td></td>"
                            }
                        }
                        tab += "</tr>";
                    }
                    tab += "</table>"
                    div.innerHTML = tab;
                }
            }
        }
    }
}

function setEnter(){
    document.getElementById('retrieve').style.display='none';
    document.getElementById("name").value="";
    document.getElementById('number').value="";
    document.getElementById('enter').style.display='block';
    document.getElementById('approve').style.display='none';
    document.getElementById('approvebutton').style.display='none';
    document.getElementById('setarea').style.display='none';
    document.getElementById('status').style.display='none';
    document.getElementById('display').style.display='none';
}

function enter() {
    var name = document.getElementById('name').value;
    var number = document.getElementById('number').value;
    if (name == "" || number == "") {
        alert("编号和名称不能为空！");
    }
    else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'php/Enter.php', true);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send("number=" + number+"&name=" + name);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var info = xmlhttp.responseText;
                var result = eval(info);
                if (result == "duplicate") {
                    alert('该编号的影像已存在!');
                }
                else if (result == 'success') {
                    alert("影像信息录入成功!");
                }
                else {
                    alert("影像信息录入失败!");
                }
            }
        }
        document.getElementById('name').value="";
        document.getElementById('number').value="";
    }
}

function setApprove() {
    document.getElementById('retrieve').style.display='none';
    document.getElementById('enter').style.display='none';
    document.getElementById('approve').style.display='block';
    document.getElementById('setarea').style.display='none';
    document.getElementById('status').style.display='none';
    document.getElementById('display').style.display='none';
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open('POST','php/searchapprove.php',true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(null);
    xmlhttp.onreadystatechange=function () {
        if(xmlhttp.status==200&&xmlhttp.readyState==4){
            var info=xmlhttp.responseText;
            var table=eval(info);
            var div = document.getElementById('approve');
            if (table == 'none') {
                var tab = "<table border='1' bordercolor='black' width='900' height='150' id='hide' class='none'>";
                tab += "<tr><th>暂无申请的账号</th></tr>";
                div.innerHTML = tab;
            }
            else {
                document.getElementById('approvebutton').style.display='block';
                var tab = "<table border='1' bordercolor='black' width='600' height='150' id='hide' class='approveresult'>";
                tab += "<tr><th>用户名</th><th>申请时间</th></th><th>状态</th></tr>";
                for (var i = 0; i < table.length; i++) {
                    tab += "<tr>";
                    for (var j = 0; j < 5; j=j+2) {
                            tab += "<td>" + table[i][j] + "</td>";
                    }
                    tab += "</tr>";
                }
                tab += "</table>"
                div.innerHTML = tab;
            }
        }
    }
}

function approve() {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST",'php/approve.php',true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(null);
    xmlhttp.onreadystatechange=function () {
        if(xmlhttp.status==200&&xmlhttp.readyState==4){
            var info=xmlhttp.responseText;
            var table=eval(info);
            if(table='success'){
                alert('批准成功!');
                location.href="administrator.html";
                document.getElementById('request').click();
            }
            else if(table='failure'){
                alert('批准失败!');
            }
        }
    }
}

function setStatus() {
    document.getElementById('retrieve').style.display='none';
    document.getElementById('enter').style.display='none';
    document.getElementById('approve').style.display='none';
    document.getElementById('approvebutton').style.display='none';
    document.getElementById('status').style.display='block';
    document.getElementById('setarea').style.display='none';
    document.getElementById('statusresult').style.display='none';
    document.getElementById('inputnumber').value='';
    document.getElementById('select').value='available';
    document.getElementById('display').style.display='none';
}

function statusSearch() {
    if (document.getElementById('inputnumber').value == ""){
        alert("请输入编号！");
    }
    else {
        document.getElementById('statusresult').style.display='block';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'php/searchNumber.php', true)
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send('number='+document.getElementById('inputnumber').value);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status === 200 && xmlhttp.readyState == 4) {
                var info = xmlhttp.responseText;
                var table = eval(info);
                var div = document.getElementById('statusresult');
                if (table == 'none') {
                    var tab = "<table border='1' bordercolor='black' width='900' height='150' id='hide' class='none'>";
                    tab += "<tr><th>暂无相关影像制品信息</th></tr>";
                    div.innerHTML = tab;
                }
                else {
                    var tab = "<table border='1' bordercolor='black' width='900' height='130' id='hide' class='statustable'>";
                    tab += "<tr><th>编号</th><th>名称</th><th>状态</th><th>借出时间</th><th>应还时间</th></tr>";
                    for (var i = 0; i < table.length; i++) {
                        tab += "<tr>";
                        for (var j = 0; j < 5; j++) {
                            if (table[i][j]) {
                                tab += "<td>" + table[i][j] + "</td>";
                            }
                            else {
                                tab += "<td></td>"
                            }
                        }
                        tab += "</tr>";
                    }
                    tab += "</table>"
                    div.innerHTML = tab;
                    document.getElementById('setarea').style.display='block';
                }
            }
        }
    }
}

function convert() {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open('POST','php/setStatus.php',true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("number="+document.getElementById('inputnumber').value+"&status="+document.getElementById('select').value);
    xmlhttp.onreadystatechange=function () {
        if(xmlhttp.readyState==4&&xmlhttp.status==200){
            var info=xmlhttp.responseText;
            var result=eval(info);
            if(result=="success"){
                alert("修改成功!");
            }
            else if(result=="failure") {
                alert("修改失败!")
            }
        }
    }
}

function setDisplay() {
    document.getElementById('retrieve').style.display='none';
    document.getElementById('enter').style.display='none';
    document.getElementById('approve').style.display='none';
    document.getElementById('approvebutton').style.display='none';
    document.getElementById('status').style.display='none';
    document.getElementById('setarea').style.display='none';
    document.getElementById('statusresult').style.display='none';
    document.getElementById('inputnumber').value='';
    document.getElementById('select').value='available';
    document.getElementById('display').style.display='none';
    setLoad();
    setTimeout(function () {
        document.getElementById('loading').style.display='none';
    },1800);
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","php/anonymous.php",true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(null);
    xmlhttp.onreadystatechange=function() {
        if(xmlhttp.readyState==4&&xmlhttp.status==200) {
            var info=xmlhttp.responseText;
            var table=eval(info);
            var div=document.getElementById("display");
            var tab="<table border='1' bordercolor='black' width='900' height='150' class='table2'>"
            tab+="<tr><th>编号</th><th>名称</th><th>状态</th><th>借出时间</th><th>应还时间</th></tr>"
            for(var i=0;i<table.length;i++)
            {
                tab+="<tr>";
                for(var j=0;j<5;j++)
                {
                    if(table[i][j]) {
                        tab += "<td>" + table[i][j] + "</td>";
                    }
                    else{
                        tab+="<td></td>"
                    }
                }
                tab+="</tr>";
            }
            tab+="</table>"
            div.innerHTML=tab;
            document.getElementById('display').style.display='block';
        }
    }
}

function setLoad() {
    document.getElementById('loading').style.display='flex';
}

