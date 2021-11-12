<?php

/**
 * function_main.php
 * 
 * @author  Yang,junlong at 2009-8-16 04:05:06 build.
 * @version $Id$
 */

if (!defined('GuestBook')) {
    exit('Access Denied');
}

/**
 * 产生form防伪码
 * @param int $var
 */
function formCode($var = 300)
{
    global $_CYGLOBAL;
    $time = time();
    $codeadd = 'Myself == CrossYou';
    $_CYGLOBAL['formcode'] = substr(md5(ceil($time / $var) . '|' . $codeadd), 2, 8);
    return $_CYGLOBAL['formcode'];
}

//表单提交验证
function checkSubmit($var)
{
    global $_CY, $message;

    $_CY['formtime'] = empty($_CY['formtime']) ? 300 : $_CY['formtime'];
    if (!empty($_POST[$var]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
        if ((empty($_SERVER['HTTP_REFERER']) || preg_replace("/https?:\/\/([^\:\/]+).*/i", "\\1", $_SERVER['HTTP_REFERER']) == preg_replace("/([^\:]+).*/", "\\1", $_SERVER['HTTP_HOST'])) && $_POST['formcode'] == formcode($_CY['formtime'])) {
            return true;
        } else {
            $message = "<span class=\"error_box\">您提交的URL错误或者您已经超时(默认为5分钟)</span>";
            return false;
        }
    } else {
        return false;
    }
}

//取消HTML代码
function clearHtmlchars($str)
{
    if (is_array($str)) {
        foreach ($str as $key => $val) {
            $str[$key] = clearhtmlchars($val);
        }
    } else {
        $str = htmlspecialchars($str);
    }
    return $str;
}

/**
 * 字符串解密加密,这个函数不错
 *
 * @param string $string
 * @param string $operation
 * @param string $key
 * @param int $expiry
 * @return unknown
 */
function bkCode($string, $operation = 'DECODE', $key = '', $expiry = 0)
{

    $ckey_length = 4;    // 随机密钥长度 取值 0-32;
    // 加入随机密钥，可以令密文无任何规律，即便是原文和密钥完全相同，加密结果也会每次不同，增大破解难度。
    // 取值越大，密文变动规律越大，密文变化 = 16 的 $ckey_length 次方
    // 当此值为 0 时，则不产生随机密钥

    $key = md5($key ? $key : CY_KEY);
    $keya = md5(substr($key, 0, 16));
    $keyb = md5(substr($key, 16, 16));
    $keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length) : substr(md5(microtime()), -$ckey_length)) : '';

    $cryptkey = $keya . md5($keya . $keyc);
    $key_length = strlen($cryptkey);

    $string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0) . substr(md5($string . $keyb), 0, 16) . $string;
    $string_length = strlen($string);

    $result = '';
    $box = range(0, 255);

    $rndkey = array();
    for ($i = 0; $i <= 255; $i++) {
        $rndkey[$i] = ord($cryptkey[$i % $key_length]);
    }

    for ($j = $i = 0; $i < 256; $i++) {
        $j = ($j + $box[$i] + $rndkey[$i]) % 256;
        $tmp = $box[$i];
        $box[$i] = $box[$j];
        $box[$j] = $tmp;
    }

    for ($a = $j = $i = 0; $i < $string_length; $i++) {
        $a = ($a + 1) % 256;
        $j = ($j + $box[$a]) % 256;
        $tmp = $box[$a];
        $box[$a] = $box[$j];
        $box[$j] = $tmp;
        $result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
    }

    if ($operation == 'DECODE') {
        if ((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26) . $keyb), 0, 16)) {
            return substr($result, 26);
        } else {
            return '';
        }
    } else {
        return $keyc . str_replace('=', '', base64_encode($result));
    }
}

//清除cookie
function clearCookie($cookiename)
{
    bkSetcookie($cookiename, '', -86400 * 365);
}

//cookie设置
function bkSetcookie($var, $value, $life = 0)
{
    global $_CYGLOBAL, $_CY, $_SERVER;
    setcookie($_CY['cookiepre'] . $var, $value, $life ? ($_CYGLOBAL['timestamp'] + $life) : 0, $_CY['cookiepath'], $_CY['cookiedomain'], $_SERVER['SERVER_PORT'] == 443 ? 1 : 0);
}

function sAddslashes($string)
{
    if (is_array($string)) {
        foreach ($string as $key => $val) {
            $string[$key] = saddslashes($val);
        }
    } else {
        $string = addslashes($string);
    }
    return $string;
}

//清除反斜杠
function sStripslashes($string)
{
    if (is_array($string)) {
        foreach ($string as $key => $val) {
            $string[$key] = sStripslashes($val);
        }
    } else {
        $string = stripslashes($string);
    }
    return $string;
}

//还没写完。。。
function getTheme($dir)
{
    $theme = getDirAllFile($dir);
    if (empty($theme)) {
        $theme_name["default"]["name"] = "default";
        $theme_name["default"]["author"] = "crossyou";
    } else {
        foreach ($theme as $val) {
            $myfile = @file($dir . "/" . $val . "/style.css");
            if (empty($myfile)) {
                $theme_name["default"]["name"] = "default";
                $theme_name["default"]["author"] = "crossyou";
            } else {
                $mytheme_name = explode(":", $myfile[1]);
                $mytheme_author = explode(":", $myfile[2]);
                $theme_name[$val]["name"] = $mytheme_name[1];
                $theme_name[$val]["author"] = $mytheme_author[1];
            }
        }
    }
    return $theme_name;
}
function getDirAllFile($dir)
{
    if (is_dir($dir)) {
        $file = scandir($dir);
    }

    foreach ($file as $val) {
        if ($val != "." && $val != ".." && $val != "default") {
            $allfile[] = $val;
        }
    }
    return $allfile;
}

/**
 * 时间日期格式化
 *
 * @param string $format
 * @param int $timestamp
 * @param bool $isformat
 * @return unknown
 */
function formatTime($format, $timestamp = '', $isformat = 0)
{
    global $_CY, $_CYGLOBAL;
    if (empty($timestamp)) {
        $timestamp = $_CYGLOBAL['timestamp'];
    }
    $result = '';
    if ($isformat) {
        $time = $_CYGLOBAL['timestamp'] - $timestamp;
        if ($time > 24 * 3600) {
            $result = gmdate($format, $timestamp + $_CY['timezone'] * 3600);
        } elseif ($time > 3600) {
            $result = intval($time / 3600) . "小时" . "前";
        } elseif ($time > 60) {
            $result = intval($time / 60) . "分钟" . "前";
        } elseif ($time > 0) {
            $result = $time . "秒" . "前";
        } else {
            $result = "现在";
        }
    } else {
        $result = gmdate($format, $timestamp + $_CY['timezone'] * 3600);
    }
    return $result;
}
