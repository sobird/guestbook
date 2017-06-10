<?php
/* +----------------------------------------------------------+
   | CrossYou.CN
   | $@file  V 1.0.1 UTF-8 2009-8-16 ����04:35:53 : $crossyou$
   |
*/
if(!defined('GuestBook')) {
    exit('Access Denied');
}

/**
 * 判断当前浏览器类型
 *
 * @return unknown
 */
function getClientBrowser() {
   $browser = $_SERVER['HTTP_USER_AGENT'];
   
   if (strpos(strtoupper($browser), 'MSIE') !== false) {    
       return "Internet Explorer";
   } else    if (strpos(strtoupper($browser), 'FIREFOX') !== false) {
       return "Firefox";
   } else    if (strpos(strtoupper($browser), 'KONQUEROR') !== false) {
       return "Konqueror";
   } else    if (strpos(strtoupper($browser), "LYNX") !== false) {
       return "Lynx";
   } else {    
       return $browser;
   }
}

/**
* 根据url取得域名
* 
*/
function getDomain($url){
     preg_match("/^(http:\/\/)?([^\/]+)/i",$url, $matches);
     return $matches[2];
}

/**
 * 获取站点URL
 *
 * @return unknown
 */
function getSiteUrl(){
    
    $uri = $_SERVER['REQUEST_URI']?$_SERVER['REQUEST_URI']:($_SERVER['PHP_SELF']?$_SERVER['PHP_SELF']:$_SERVER['SCRIPT_NAME']);
    $url = 'http://'.$_SERVER['HTTP_HOST'].substr($uri, 0, strrpos($uri, '/')+1);
    return $url;
}

/**
 * 获取客户端的IP地址
 */
function getClientIpAddr(){
    $client_ip=$_SERVER['REMOTE_ADDR'];
    return $client_ip;
}

/**
 * php执行到当前行所用的时间,默认结果8位小数
 * 
 * @param Number $start_time
 * @param int    $format
 */
function phpRunTime($start_time,$format=8){
    $finish_time=explode(" ",microtime());
    $finish_time=$finish_time['0']+$finish_time[1];
    $execute_time=$finish_time-$start_time;
    $execute_time=number_format($execute_time,"$format",".","");
    return $execute_time;
}

/**
 * 获取页面占用的内存
 * 
 */
function getMemoryUsed(){
    $memoryused=memory_get_usage();
    if (empty($memoryused)||$memoryused==0){
        return false;
    }
    
    $msize = array(
    "GB"=>1073741824,
    "MB"=>1048576,
    "KB"=>1024,
    "B"=>1,
    );
    
    if($memoryused>$msize['GB']){
        $memorysize=number_format($memoryused/$msize['GB'],2,".","")."GB";
    }elseif ($memoryused>$msize['MB']){
        $memorysize=number_format($memoryused/$msize['MB'],2,".","")."MB";
    }elseif($memoryused>$msize['KB']){
        $memorysize=number_format($memoryused/$msize['KB'],2,".","")."KB";
    }else{
        $memorysize=number_format($memoryused,2,".","")."GB";
    }
    return $memorysize;
}


?>