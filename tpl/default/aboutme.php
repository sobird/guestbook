<?php
$member=!empty($_SESSION['username'])?"<span class=\"red\">".$_SESSION['username']."</span> 你好!":"你还没有登陆,";
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
<li><?=$member; ?></li>
</ul>
</div>
</div>
</div>

<div id="container">
<div id="home">



<div id="book" class="book_list">
<div class="">
<div  class="round1"></div><div  class="round2"></div>
<div  class="round3"></div><div  class="round4"></div>
<h3 class="list_header"> <a href="#123" class="all">CrossYou</a>关于我</h3>
</div>
<ul class="line_list">

<li><span class="time">09年8月18日</span> 
  <h4>想做，不如去做，去做，不如在做；在做，不如做好，做好，不如做完。</h4>
  <div class="message">
——————————————————————————————————————Size the day!</div>
</li>

<li>
  <div class="message">&nbsp;&nbsp;&nbsp;&nbsp; 知道PHP大约是在07年的时候，那时一位学长做了一个学校性质的论坛，我有幸当上了一名光荣的版主，可惜当时没有电脑，不能经常去上，一个星期不知道能上去一次不，不过刚开始的时候每次上网都会去观光一下那个论坛，显摆下自己版主的身份，其实当时真不知道，版主具体的职责，现在看来，那是的我这个版主是相当不称职的，或许是没有时间，也或许是还没有在论坛发帖子的习惯，更或许的我发现就我们几个版主在这论坛里发帖子，尽管已有几千人注册了，我也曾提过一些意见，现在看来这些意见也都不是意见了。后来就慢慢的不去了，当时真的对这些东西了解的太少了，在没上大学之前，电脑就没摸过几次。<br /> 
 &nbsp;&nbsp;&nbsp;&nbsp; 那些时间没有白费，我知道了DISCUZ，知道了好123，知道了百度，不过真的是知道的有点太晚了。后来自己就试着用DISCUZ在自己电脑上搭建了一个论坛，慢慢的知道了这个论坛的程序是用PHP写出来的，当时对PHP的印象就是开源了，再有就是要比ASP运行的快一些，大三上学期，学了一门WEB开发的课-ASP.NET感觉像java尽管自己不是很懂，这学期中，慢慢的试着看了一些PHP的书，这样的书在我们学校图书馆里少的可怜，就着这些少的可怜的书，大三上学期，也知道了一些PHP的基本知识，例如，变量名要区分大小写什么的。去年暑假第一次听一位同学说起过AJAX，我后来就百度了一下，才知道自己知道的又是太晚了。当AJAX在05年这个web2.0时代，开始风行的时候，我还做在高三教室里，做我的习题集，谁知道这么个鬼东西。事情有时候就是这么巧，当我快要把这个AJAX忘记的时候，在大三上学期即将结束的时候，却在我们学校图书馆里，发现了一本关于AJAX的书，9月份刚出的一本新书，是前两天刚来的，让我给碰上了，哪本书着重讲了一些web2.0的东西，什么sns，blog，tag，digger，六度分割，表现与形式分离，结构，表现，行为，JavaScript，DOM，CSS乱七八糟的不少东西，认认真真的看了一遍，可以说就是那本书给了我学习web技术的兴趣，也同时促使我真正开始学习PHP这一门服务地端的语言了。<br>
&nbsp;&nbsp;&nbsp;&nbsp; 后来在一篇报刊上了看了戴志康的个人经历，多多少少的是给了我这样一名学习成绩不是很好的人一点安慰吧，于是我对PHP，对开源，也有了更深的认识，也更坚定了我学习PHP的决心。大三下学期，几乎没有在搞PHP了。因为自己用UCH搭建了一个网站的缘故，于是开始学习了做模板，套用别人的CSS风格到自己站上，其实主要是学习了，到底也没有什么成果。一晃眼整个大三结束了，想象着这个暑假回家，自己写个程序出来，可是，真正去做点什么的时候才发现自己的那两下子，狗屁不如。写一个程序不是件容易的事情。暑假还有十天就要回学校了，正在考虑着是否需要去找工作，这个留言本花了我三天的功夫，第一个版本V 1.0.0 花了我大约五天的时间，也就是总共花费了八天的时间，光CSS设计就一天的功夫，代码写的也很乱，不过我设计的四大功能（添加，修改，删除，搜索留言）已经很好的实现了，第二个版本V 1.0.1 主要是整理了第一个版本的一些代码，并写了一个Initer的初始化的类，不知道值不值得这样写，优化了一些函数。目前正在进行这个留言本的扫尾工作，当然这个版本仅仅使用了PHP+TXT文本来实现的，有些效果上，和用户体验上不是太理想。打算下一个版本用smarty模板引擎，jquery框架，以及AJAX来重写这个留言本，争取让它变得更友好，更桌面话。
<br>
<br>
<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
--------------------------crossyou&nbsp; 20:30
</div>
</li>
</ul>
</div>
</div>

<div id="sidebar">
<div class="sideround">
<div  class="sideround1"></div><div  class="sideround2"></div>
<div  class="sideround3"></div><div  class="sideround4"></div>
</div>

<div class="navlist">
<ul>
<li><a href="index.php">首 页</a></li>
<li><a class="aboutme"href="help.php?ac=aboutme">关于我</a></li>
<li><a href="help.php?ac=helpDoc">帮助文档</a></li>
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
<div class="clear"></div>
</div>


<div id="footer">
<div class="copyright">
<span style="color:#ccc">留言本(<a href="<?=$_CONFIG['author_url']; ?>"><?=$_CONFIG['author_name']; ?></a>)<span>&copy;</span> 2009</span><span style="color:#ccc; margin-left:10px;">本页面程序执行时间:<?=phpRunTime($start_time); ?>/内存使用:<?=getMemoryUsed(); ?>/浏览器:<?=getClientBrowser() ?>/当前IP:<?=getClientIpAddr(); ?></span>
</div>
</div>
</body>
</html>