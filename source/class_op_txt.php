<?php

/**
 * class_op_txt.php
 * 
 * @author  Yang,junlong at 2009-8-16 07:55:00 build.
 * @version $Id$
 */

if (!defined('GuestBook')) {
    exit('Access Denied');
}


class bkstuff
{

    private  $link;
    private  $filearr;
    public   $bksuff;
    public   $cost_time;
    public   $bkname;

    function bkConnect($bkdir)
    {
        if (is_dir($bkdir)) {
            $this->link = $bkdir . DIRECTORY_SEPARATOR . "#";
        } else {
            $this->bkCreateDir($bkdir);
            $this->link = $bkdir . DIRECTORY_SEPARATOR . "#";
        }
    }

    function bkRead($bkname = "")
    {
        if (empty($bkname)) {
            $bkname = $this->bkname;
        }
        if (!file_exists($this->link . $bkname . $this->bksuff)) {
            if (!@$fo = fopen($this->link . $bkname . $this->bksuff, 'a')) {
                $this->bkerror("Data file create failed,please check you permission!");
            }
            fwrite($fo, "注意，第一行尽量不要填写数据信息，否则可能会读取不到。userid不唯一可能会有意外的结果！\r\n");
            fclose($fo);
        }
        if (!$bkfile = file($this->link . $bkname . $this->bksuff)) {
            $this->bkerror("File open error when read file!");
        }
        $this->filearr = $bkfile;
    }

    function bk_fetch_array()
    {
        $result = $this->filearr;
        if (is_array($result)) {
            foreach ($result as $value) {
                $allbk = unserialize($value);
                if (!empty($allbk)) {
                    $bk[] = $allbk;
                }
            }
        }
        return $bk;
    }

    function bkWrite($bkname = "", $str, $mod = "a")
    {
        if (empty($bkname)) {
            $bkname = $this->bkname;
        }
        $string = str_replace("\r\n", "<br>", $str);
        $fo = @fopen($this->link . $bkname . $this->bksuff, $mod);
        fwrite($fo, serialize($string) . "\r\n");
        fclose($fo);


        return true;
    }

    function bkUpdate($bkid, $str, $mod = 1)
    {
        $tpl = $this->bk_fetch_array();
        foreach ($tpl as $key => $val) {
            if ($tpl[$key]['bkid'] == $bkid) {
                if ($mod) {
                    $tpl[$key] = $str;
                } else {
                    unset($tpl[$key]);
                }
            } else {
                $tpl[$key] = $val;
            }
            if ($key == 0) {
                $this->bkWrite("", $tpl[$key], "w");
            } else {
                $this->bkWrite("", $tpl[$key], "a");
            }
        }
        return TRUE;
    }

    function bkSearch($str)
    {
        $reg_exp = "/$str/i";
        $tpl = $this->bk_fetch_array();
        if (!empty($tpl)) {
            $start_time = explode(" ", microtime());
            $start_time = $start_time[0] + $start_time[1];
            foreach ($tpl as $val) {
                if (preg_match($reg_exp, $val['message'] . $val['subject'])) {
                    $val['subject'] = preg_replace("/$str/i", "<span style='color:red'>" . $str . "</span>", $val['subject']);
                    $val['message'] = preg_replace("/$str/i", "<span style='color:red'>" . $str . "</span>", $val['message']);
                    $result[] = $val;
                }
            }
            $finish_time = explode(" ", microtime());
            $finish_time = $finish_time['0'] + $finish_time[1];
            $cost_time = $finish_time - $start_time;
            $this->cost_time = $cost_time;
            return $result;
        }
        return FALSE;
    }

    function bkSplitDir($dir)
    {
        $dirname = split('[/\]', $dir);
        foreach ($dirname as  $value) {
            if (!empty($value)) {
                $name[] = $value;
            }
        }
        return $name;
    }

    function bkCreateDir($dir)
    {
        $dirname = $this->bkSplitDir($dir);
        $newdir = "";
        foreach ($dirname as $val) {
            $newdir .= $val . "/";
            if (!is_dir($newdir)) {
                if (!@mkdir($newdir)) {
                    $this->bkerror("Create dir failed,please check you permission!");
                }
            }
        }
        return true;
    }

    function bkerror($message = "")
    {
        echo "<div style=\"position:absolute;font-size:11px;font-family:verdana,arial;background:#EBEBEB;padding:0.5em;\">
                <b>Book <span color=\"red\">Create-Read-Write</> Error</b><br>
                <b>Message</b>: $message<br>
                </div>";
        exit();
    }
}
