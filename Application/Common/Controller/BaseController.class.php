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

}