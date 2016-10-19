<?php
namespace Common\Model;

class SysParamsModel extends BaseModel {

    public function getListByType($type){
        $where = "del_flag =0 and type='$type'";
        $params = $this->getAll($where);
        return $params;
    }
}