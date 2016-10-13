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


        if($this->isLogin()){
            $this->user = session('User');
        }
        else {
            $wxUtil = new WxUtil();
            $wxUser = $wxUtil->getWxUserInfo();

            $result = $this->saveUser($wxUser);
            $this->user = $this->getUserFromWx();
            session('User',$result);
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
