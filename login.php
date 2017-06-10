<?php
/* +----------------------------------------------------------+
   | CrossYou.CN
   | $@file  V 1.0.1 UTF-8 2009-8-18 ����02:47:57 : $crossyou$
   |
*/
include_once 'main.php';

//获取方法
$ac=!empty($_GET["ac"])?$_GET["ac"]:"?";

if($ac=='logout'&&!empty($_SESSION['username'])){
	unset($_SESSION['username']);
	$message="<span class=\"correct_box\">注销成功。</span>";
}

if(checksubmit("login_btn")){
	$username=trim($_POST['username']);
	$password=$_POST['password'];
	$infoarr['username']=$username;
	$infoarr['password']=$password;
	$infoarr['dateline']=$time_stamp;
	
	if(empty($username)){
		$message="<span class=\"error_box\">请输入用户名。</span>";
	}elseif(empty($password)){
		$message="<span class=\"error_box\">请输入用户密码。</span>";
	}else{
	$_CYGLOBAL['bk']->bkRead('BookUser');
    $userinfo=$_CYGLOBAL['bk']->bk_fetch_array();
    if(!empty($userinfo)){
	foreach ($userinfo as $key=>$val){
		if($userinfo[$key]['username']==$username){
			$userpwd=$userinfo[$key]['password'];
			$userpwd=trim($userpwd);
		}
	}

	if(!isset($userpwd)){
		
		$_CYGLOBAL['bk']->bkWrite("BookUser",$infoarr);
		$message="<span class=\"tip_box\">不存在此用户，插入此用户数据。</span>";
		$_SESSION['username']=$username;
	}else{
	if($userpwd==$password){
		$message="<span class=\"correct_box\">登陆成功，数据文件中存在此用户。</span>";
		
		$_SESSION['username']=$username;
	}else{		
    	$message="<span class=\"error_box\">登陆失败，密码不正确。</span>";
	}
	}
    }else{
    	$_CYGLOBAL['bk']->bkWrite("BookUser",$infoarr);
    	$message="<span class=\"tip_box\">数据文件中无数据，第一次插入数据。</span>";
    	$_SESSION['username']=$username;
    }
	}
	
}
$members=!empty($_SESSION['username'])?"<span class=\"red\">".$_SESSION['username']."</span> 你好!":"你还没有登陆,";
$member=$_SESSION['username'];
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?=$_CONFIG['char_set']; ?>" />
<link href="tpl/<?=$theme; ?>/style.css" rel="stylesheet" type="text/css" media="all" />
<title><?=$_CONFIG['site_title']; ?></title>
</head>

<body>
<div id="header">
<div class="headerwarp">

<div id="logo">
<a href="<?=getSiteUrl(); ?>" title="<?=$title; ?>">
<h1 style="font-size:<?=$_CONFIG['site_title_size']; ?>px"><?=$_CONFIG['site_title']; ?><sub><?=BK_VER; ?></sub>
</h1>
</a>
</div>

<div class="navbar">
<ul >

<?php if(empty($_SESSION['username'])) { ?>
<li><a href="login.php">登陆</a></li>
<?php }else{ ?>
<li><a href="login.php?ac=logout">注销</a></li>
<?php } ?>

<li><a href="help.php">帮助</a></li>
<li class="search">
<form action="search.php" method="get" style="padding:0 0 0 5px;">
<input type="hidden" name="formcode" value="<?=formcode($_CY['formtime']);?>" />
<input type="text" name="keyword" id="keyword" style="margin:5px;"/>
<input type="submit" id="search_btn" name="search_btn" class="submit" value="搜索" />
</form>
</li>
<li><?=$members; ?></li>
</ul>
</div>
</div>
</div>


<div id="container">
<div id="home">
<?php
if(empty($member)){

?>
<div id="loginform">
<div class="round">
<div  class="round1"></div><div  class="round2"></div>
<div  class="round3"></div><div  class="round4"></div>
<h3 class="list_header"> <a href="<?=$email; ?>" class="crossyou">Crossyou</a>用户登录</h3>
</div>
<?=$message; ?>
<div class="box">
<form action="login.php" method="post" style="padding:20px 0 20px 5px;">
用户名:<input type="text" name="username" style="margin:5px;"/><span style="color:#ccc">(请不要为空!)</span>
密 码:<input type="text"  name="password" style="margin:5px;"/>
<input type="hidden" name="formcode" value="<?=formcode($_CY['formtime']);?>" />
<input type="submit" id="login_btn" name="login_btn" class="submit" value="登陆" />
</form>
</div>

<h3 class="login_bottom">&nbsp;</h3>
</div>
<?php
}else{
?>
<div id="login_succeed">
<div class="round">
<div  class="round1"></div><div  class="round2"></div>
<div  class="round3"></div><div  class="round4"></div>
<h3 class="list_header"> <a href="<?=$email; ?>" class="crossyou">Crossyou</a>管理<a href="?ac=logout" class="crossyou">注销</a></h3>
</div>
<?=$message; ?>
<div class="box">
<span class="tip_box"><?=$member ?> 您好！现在没什么可管理的，仅仅提供演示，注销试试？</span>
</div>

<h3 class="login_bottom">&nbsp;</h3>
</div>

<?php

}?>
</div>

<div id="sidebar">
<div class="sideround">
<div  class="sideround1"></div><div  class="sideround2"></div>
<div  class="sideround3"></div><div  class="sideround4"></div>
</div>

<div class="navlist">
<ul>
<li><a href="index.php">首 页</a></li>
<li><a class="aboutme"href="help.php?ac=aboutMe">关于我</a></li>
<li class="theme">
<a  class="tab"href="index.php?theme=default">主题(默认值)</a>
<ul class="menu">
<li><a class="first" href="index.php?theme=red">红色</a></li>
<li><a href="index.php?theme=purple">紫色</a></li>
</ul>
</li>
</ul>
</div>

</div>
</div>
<div class="clear"></div>
<div id="footer">

<div class="copyright">
<span style="color:#ccc">留言本(<a href="<?=$_CONFIG['author_url']; ?>"><?=$_CONFIG['author_name']; ?></a>)<span>&copy;</span> 2009</span><span style="color:#ccc; margin-left:10px;">本页面程序执行时间:<?=phpRunTime($start_time); ?>/内存使用:<?=getMemoryUsed(); ?>/浏览器:<?=getClientBrowser() ?>/当前IP:<?=getClientIpAddr(); ?></span>
</div>
</div>
</body>
</html>
