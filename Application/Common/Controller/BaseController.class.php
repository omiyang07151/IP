<?php
namespace Common\Controller;

use Think\Controller;
class BaseController extends Controller{

    public function __construct()
    {
        parent::__construct();
    }

    public function writeLog($string, $action=false){
        if($action){
            $destination = C('LOG_PATH').date('y_m_d').'_'.MODULE_NAME.'_'.CONTROLLER_NAME.'_'.ACTION_NAME.'.log';
        }
        else {
            $destination = C('LOG_PATH').date('y_m_d').'_'.MODULE_NAME.'_'.CONTROLLER_NAME.'.log';
        }
        \Think\Log::write($string,\Think\Log::INFO,'',$destination);
    }

    public function success_json($data=null){
        $result['success']=true;
        if(!empty($data)){
            $result['data']=$data;
        }
        header("Content-Type:text/html; charset=utf-8");
        exit(json_encode($result));
    }

    public function error_json($data=null){
        $result['success']=false;
        if(!empty($data)){
            $result['data']=$data;
        }
        header("Content-Type:text/html; charset=utf-8");
        exit(json_encode($result));
    }

    public function jsonpajax($data=array())
    {
        header("Content-Type:text/html; charset=utf-8");
        $callback = $_GET["callback"];
        exit($callback.'('.json_encode($data).')');
    }
}