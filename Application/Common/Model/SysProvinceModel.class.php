<?php
namespace Common\Model;

class SysProvinceModel extends BaseModel {

    public function getNameById($id){
        $province = $this->getById($id, 'name');
        return $province['name'];
    }

    public function getProvinceList(){

        $data = $this->buildSelectOptions('id,name');
        return $data;
    }
}