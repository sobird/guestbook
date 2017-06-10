<?php
/* +----------------------------------------------------------+
   | CrossYou.CN
   | $@file  V 1.0.1 UTF-8 2009-8-17 ����09:47:09 : $crossyou$
   |
*/
if(!defined('GuestBook')) {
    exit('Access Denied');
}

$_CY["bkname"]               = "";                //数据文件名字默认为GuestBook
$_CY["bkdir"]                = "";                //路径默认为data
$_CY["bksuff"]               = "";                //文件名默认为txt
$_CY['formtime']             = 300;                //表单验证时间，以秒为单位，过期表单无效
$_CY['cookiepre']            = 'BK_';             //COOKIE前缀
$_CY['cookietime']           = 300;                //建议填写0，浏览器关闭即失效
$_CY['cookiedomain']         = '';                 //COOKIE作用域
$_CY['cookiepath']           = '/';                 //COOKIE作用路径


//站点参数配
$_site['charset']            = '';                     //页面字符集,默认为utf-8，使用其他字符集页面可能会出现乱码
$_site['title']              = '';
                                                    //站点名称，可用逗号分隔,将随机显示
$_site['title_font_size']    = 12;                    //默认为14px;
$_site['url']                = '';                     //站点url,不填自动获取
$_site['author_url']         = '';                    //个人网址
$_site['author_name']        = '';                    //站点作者

//更多配置相关信息，请参见/source/class_initer.php文件。

?>