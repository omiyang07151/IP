<?php
namespace Common\Model;

class AccountMstModel extends BaseModel {

    public function loginAccount($username, $password){
        $where['del_flag'] = 0;
        $where['username'] = $username;
        $where['password'] = $password;

        $account = $this->getOne($where);
        return $account;
    }

}