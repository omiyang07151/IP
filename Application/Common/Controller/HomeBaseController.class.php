<?php
namespace Common\Controller;

use Common\Util\WxUtil;
use Think\Log;

class HomeBaseController extends BaseController{


    public $user;
    public $page;
    public $size;

    public function __construct()
    {
        parent::__construct();

        $this->page = I('page');
        $this->size = I('size');
        if(empty($this->page) || !is_numeric($this->page)){
            $this->page = C('HOME_DEFAULT_PAGE');
        }
        if(empty($this->size) || !is_numeric($this->size)){
            $this->size = C('HOME_DEFAULT_SIZE');
        }

        if($this->isLogin()){
            Log::write('User logined ===================');
            $this->user = session('User');
        }
        else {
            Log::write('User not logined ===================');

            if(C('IS_TEST')){
                $userModel = D('UserMst');
                $this->user = $userModel->checkUser('oVag7w9vVByAX8RpLENg1JFIh9co');
                session('User',$this->user);
            }
            else {
                $wxUtil = new WxUtil();
                $wxUser = $wxUtil->getWxUserInfo();

                $result = $this->saveUser($wxUser);
                $this->user = $this->getUserFromWx();
                session('User',$result);
            }
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
