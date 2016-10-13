<?php
namespace Home\Model;

use Common\Model\BaseModel;

class UserMstModel extends BaseModel {

    public function checkUser($openId){

        $user = $this->getOne(['openid'=>$openId,'del_flag'=>0]);
        return $user;
    }


    public function saveUser($wxUser){

        $wxUser['id'] = $this->insert($wxUser);

        return $wxUser;
    }
}