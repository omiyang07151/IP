<?php
namespace Admin\Controller;
use Common\Controller\BaseController;

class LoginController extends BaseController {
    public function index(){
        layout(false);
        $this->display();
    }

    public function dologin(){
        $accountModel = D('AccountMst');
        $username = I('username');
        $password = I('password');

        $account = $accountModel->loginAccount($username, md5($password));
        if(empty($account)){
            $this->error_json();
        }
        else {
            session('Admin_Account', $account);
            $this->success_json();
        }
    }
}