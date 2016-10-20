<?php
namespace Common\Controller;

class AdminBaseController extends BaseController{
    public $account;
    public $page;
    public $size;

    public function __construct()
    {
        parent::__construct();

        $this->page = I('iDisplayStart');
        $this->size = I('iDisplayLength');
        if(empty($this->page) || !is_numeric($this->page)){
            $this->page = C('ADMIN_DEFAULT_PAGE');
        }
        if(empty($this->size) || !is_numeric($this->size)){
            $this->size = C('ADMIN_DEFAULT_SIZE');
        }

        $this->checkAccount();
    }

    public function checkAccount(){
        $account = session('Admin_Account');
        if(!empty($account)){
            $this->account = $account;
        }
        else {
            redirect('/admin/login.html');
            exit;
        }
    }


}