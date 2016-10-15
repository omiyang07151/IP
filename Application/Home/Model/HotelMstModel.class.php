<?php
namespace Home\Model;

use Common\Model\BaseModel;

class HotelMstModel extends BaseModel {

    public function getHotelById($id){
        $hotel = $this->getById($id);
        $hotel['facility'] = json_decode($hotel['facility']);
        return $hotel;
    }
    
}