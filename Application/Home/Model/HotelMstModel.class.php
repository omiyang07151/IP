<?php
namespace Home\Model;

use Common\Model\BaseModel;

class HotelMstModel extends BaseModel {

    public function getHotelById($id, $fields=null){
        $hotel = $this->getById($id, $fields);
        if(!empty($hotel['facility'])){
            $hotel['facility'] = json_decode($hotel['facility']);
        }
        return $hotel;
    }

}