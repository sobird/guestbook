<?php
$member = !empty($_SESSION['username']) ? "<span class=\"red\">" . $_SESSION['username'] . "</span> 你好!" : "你还没有登陆,";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=<?= $_CONFIG['char_set']; ?>" />
  <link href="tpl/<?= $theme; ?>/style.css" rel="stylesheet" type="text/css" media="all" />
  <title><?= $_CONFIG['site_title']; ?></title>
</head>

<body>
  <div id="header">
    <div class="headerwarp">

      <div id="logo">
        <a href="<?= getSiteUrl(); ?>" title="<?= $title; ?>">
          <h1 style="font-size:<?= $_CONFIG['site_title_size']; ?>px"><?= $_CONFIG['site_title']; ?><sub><?= BK_VER; ?></sub>
          </h1>
        </a>
      </div>

      <div class="navbar">
        <ul>

          <?php if (empty($_SESSION['username'])) { ?>
            <li><a href="login.php">登陆</a></li>
          <?php } else { ?>
            <li><a href="login.php?ac=logout">注销</a></li>
          <?php } ?>

          <li><a href="help.php">帮助</a></li>
          <li class="search">
            <form action="search.php" method="get" style="padding:0 0 0 5px;">
              <input type="hidden" name="formcode" value="<?= formcode($_CY['formtime']); ?>" />
              <input type="text" name="keyword" id="keyword" style="margin:5px;" />
              <input type="submit" id="search_btn" name="search_btn" class="submit" value="搜索" />
            </form>
          </li>
          <li><?= $member; ?></li>
        </ul>
      </div>
    </div>
  </div>

  <div id="container">
    <div id="home">



      <div id="book" class="book_list">
        <div class="">
          <div class="round1"></div>
          <div class="round2"></div>
          <div class="round3"></div>
          <div class="round4"></div>
          <h3 class="list_header"> <a href="#123" class="all">V 1.0.1</a>PHP+TEXT留言本</h3>
        </div>
        <ul class="line_list">

          <li><span class="time">09年8月18日</span>
            <h4>留言本框架图</h4>
            <div class="message">
            </div>
          </li>

          <li>
            <div class="message">
              <div class="help_pic"></div>
              &nbsp;&nbsp;&nbsp;&nbsp; 留言本使用PHP服务器端语言，与TXT文本作为数据文件搭建的一个简易在线留言系统，此留言本为本人处女作，从8月10号开始用了8天的时间(新人第一次做。)，四大功能（留言添加，留言删除，留言修改，留言搜索）基本实现。<br>
              <br>
              1.留言添加：
              标题采用Session处理，暂时记录用户上次留言标题。标题与内容用PHP判断是否为空，若为空，则不允许插入数据，并显示失败信息，否则，添加成功，本留言没用对标题和内容做最大字符数的判断处理，用户插入数据的同时，会在当前电脑里插入一个id唯一的COOKIE，此COOKIE的作用是让用户在COOKIE的有效时间内仍可对自己添加的时间里对留言进行删除修改操作，同时存入一个COOKIE有效时间的COOKIE，一次来提示留言操作还剩多少时间的功能。<br>
              2.留言删除：留言删除使用id定位，将当前留言的id传递给留言删除函数即可完成，无是否删除确定提示，点击删除按钮后，直接删除留言。<br>
              3.留言修改：通过传递留言唯一id来定位所要修改的留言。<br />
              4.l留言搜索:留言搜索主要使用了这一个函数如下所示(可以返回搜索的时间)：<br />
              function bkSearch($str){<br />
              $reg_exp=&quot;/$str/i&quot;; <br />
              $tpl=$this-&gt;bk_fetch_array();<br />
              if(!empty($tpl)){<br />
              $start_time=explode(&quot; &quot;,microtime());<br />
              $start_time=$start_time[0]+$start_time[1];<br />
              foreach ($tpl as $val){<br />
              if(preg_match ($reg_exp, $val['message'].$val['subject'])){<br />
              $val['subject']=preg_replace(&quot;/$str/i&quot;,&quot;&lt;span style='color:red'&gt;&quot;.$str.&quot;&lt;/span&gt;&quot;,$val['subject']);<br />
              $val['message']=preg_replace(&quot;/$str/i&quot;,&quot;&lt;span style='color:red'&gt;&quot;.$str.&quot;&lt;/span&gt;&quot;,$val['message']);<br />
              $result[]=$val;<br />
              }<br />
              }<br />
              $finish_time=explode(&quot; &quot;,microtime());<br />
              $finish_time=$finish_time['0']+$finish_time[1];<br />
              $cost_time=$finish_time-$start_time;<br />
              $this-&gt;cost_time=$cost_time;<br />
              return $result;<br />
              }<br />
              return FALSE;<br />
              }<br />

              <br />
              现在看看
              都不知道自己是怎么写出来的，反正是怎么想的就怎么写的，实际很简单，主要就是使用了PHP的两个内置函数preg_match，preg_replace()，前者匹配字符，后者替换所有匹配的字符为红颜色；<br />
              以上就是本留言本四大功能的简单解释，赶紧<a href="index.php">去试试</a>吧！！！
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div id="sidebar">
      <div class="sideround">
        <div class="sideround1"></div>
        <div class="sideround2"></div>
        <div class="sideround3"></div>
        <div class="sideround4"></div>
      </div>

      <div class="navlist">
        <ul>
          <li><a href="index.php">首 页</a></li>
          <li><a class="aboutme" href="help.php?ac=aboutme">关于我</a></li>
          <li><a href="help.php?ac=helpDoc">帮助文档</a></li>
          <li class="theme">
            <a class="tab" href="index.php?theme=default">主题(默认值)</a>
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
      <span style="color:#ccc">留言本(<a href="<?= $_CONFIG['author_url']; ?>"><?= $_CONFIG['author_name']; ?></a>)<span>&copy;</span> 2009</span><span style="color:#ccc; margin-left:10px;">本页面程序执行时间:<?= phpRunTime($start_time); ?>/内存使用:<?= getMemoryUsed(); ?>/浏览器:<?= getClientBrowser() ?>/当前IP:<?= getClientIpAddr(); ?></span>
    </div>
  </div>
</body>

</html>