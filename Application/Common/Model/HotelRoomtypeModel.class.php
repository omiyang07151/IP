<?php
namespace Common\Model;

class HotelRoomtypeModel extends BaseModel {

    public function getNameById($id){
        $roomtype = $this->getById($id, 'name', true);
        return $roomtype['name'];
    }

    public function getNameByHotelId($id, $fields=null){
        $where = 'del_flag=0 and hotel_mst_id='.$id;
        $order = 'id desc';
        $data = $this->getAll($where, null, $fields, $order);
        return $data;
    }
}