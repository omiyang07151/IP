<?php
namespace Admin\Controller;

use Common\Controller\AdminBaseController;
class AjaxController extends AdminBaseController {
    public function city(){
        layout(false);
        $province_id = I('province_id');

        $sysCityModel = D('SysCity');
        $cityList = $sysCityModel->getCityList($province_id);
        $this->assign('cityList', $cityList);

        echo $this->fetch();
    }

    public function hotel(){
        layout(false);
        $city_id = I('city_id');

        $hotelModel = D('HotelMst');
        $where = 'del_flag=0 and sys_city_id='.$city_id;
        $hotelList = $hotelModel->buildSelectOptions('id,name', $where);
        $this->assign('hotelList', $hotelList);

        echo $this->fetch();
    }
}