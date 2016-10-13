<?php
namespace Home\Model;

use Common\Model\BaseModel;

class UserMstModel extends BaseModel {

    public function checkUser($openId){

        $user = $this->getOne(['weixin_open_id'=>$openId,'del_flag'=>0]);
        return $user;
    }


    public function saveUser($openId){
        $userValue['weixin_open_id'] = $openId;
        $userValue['id'] = $this->insert($userValue);

        return $userValue;
    }
}