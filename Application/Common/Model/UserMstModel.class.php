<?php
namespace Common\Model;

class UserMstModel extends BaseModel {

    public function checkUser($openId){

        $user = $this->getOne(['openid'=>$openId,'del_flag'=>0]);
        return $user;
    }


    public function saveUser($wxUser){

        $wxUser['id'] = $this->insert($wxUser);

        return $wxUser;
    }

    public function getAdminUserList($searchParams, $page=1, $size=10){
        $where = "del_flag=0 AND nickname like '%#nickname#%'";
        $where = $this->getCondition($where, $searchParams);

        $fields = null;
        $order = 'id desc';

        $data = $this->adminPageData($where, $fields, $order, $page, $size);
        return $data;
    }
}