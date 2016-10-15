<?php
namespace Home\Model;

use Common\Model\BaseModel;

class HotelRoomtypeModel extends BaseModel {

    public function getNameById($id){
        $roomtype = $this->getById($id, 'name', true);
        return $roomtype['name'];
    }
}