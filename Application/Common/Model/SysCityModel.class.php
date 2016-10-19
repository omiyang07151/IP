<?php
namespace Common\Model;

class SysCityModel extends BaseModel {

    public function getNameById($id){
        $province = $this->getById($id, 'name');
        return $province['name'];
    }

    public function getCityList($province_id){
        $where = 'del_flag=0 and province_id='.$province_id;
        $data = $this->buildSelectOptions('id,name', $where);
        return $data;
    }
}