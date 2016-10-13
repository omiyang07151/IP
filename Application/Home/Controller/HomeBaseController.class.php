<?php
namespace Home\Controller;
use Common\Controller\BaseController;
use Common\Util\WxUtil;
use Think\Log;

class HomeBaseController extends BaseController{


    public $user;

    public function __construct()
    {
        parent::__construct();


        if(!$this->isLogin()){
            Log::write('logining....');
            $this->getOpenid();
        }
        else {
            Log::write('not logining....');
            $this->user = session('User');
        }
    }

    public function isLogin(){
        $user = session('User');
        if(!empty($user)){
            return true;
        }
        else {
            return false;
        }
    }

    public function getOpenid(){

        $wxUtil = new WxUtil();

        $wxUser = $wxUtil->getWxUserInfo();
        Log::write('wxUser:'.json_encode($wxUser));

        $result = $this->saveUser($wxUser);
        session('User',$result);

    }



    public function saveUser($wxUser){
        $userModel = D('UserMst');
        $checkuser = $userModel->checkUser($wxUser['openid']);
        if(empty($checkuser)){
            $user = $userModel->saveUser($wxUser);
        }else{
            $user = $checkuser;
        }
        return $user;
    }




}
