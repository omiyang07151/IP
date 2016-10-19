<?php
namespace Admin\Controller;

use Common\Controller\AdminBaseController;
class HotelController extends AdminBaseController {

    public function index(){
        $this->display();
    }

    public function indexdata(){
        $hotelModel = D('HotelMst');

        $searchData = I('condition');
        $data = $hotelModel->getAdminHotelList($searchData, $this->page, $this->size);
        $this->jsonpajax($data);
    }

    public function ajaxcity(){
        layout(false);
        $province_id = I('province_id');

        $sysCityModel = D('SysCity');
        $cityList = $sysCityModel->getCityList($province_id);
        $this->assign('cityList', $cityList);

        echo $this->fetch();
    }

    public function add(){

        $sysProvinceModel = D('SysProvince');
        $provinceList = $sysProvinceModel->getProvinceList();
        $this->assign('provinceList',$provinceList);

        $sysParamsModel = D('SysParams');
        $facilityList = $sysParamsModel->getListByType('FACILITY_ICON');
        $this->assign('iconList', $facilityList);

        $this->display();
    }

    public function edit(){
        $id = I('id');

        $hotelModel = D('HotelMst');
        $data = $hotelModel->getById($id);


        $sysProvinceModel = D('SysProvince');
        $provinceList = $sysProvinceModel->getProvinceList();
        $this->assign('provinceList',$provinceList);

        if(!empty($data['sys_province_id'])){
            $sysCityModel = D('SysCity');
            $cityList = $sysCityModel->getCityList($data['sys_province_id']);
            $this->assign('cityList', $cityList);
        }

        $sysParamsModel = D('SysParams');
        $facilityList = $sysParamsModel->getListByType('FACILITY_ICON');
        $this->assign('iconList', $facilityList);

        $this->assign('data',$data);
        $this->display('add');
    }

    public function save(){
        $hotelModel = D('HotelMst');
        $hotel = $hotelModel->create();

        if(!empty($hotel['facility'])){
            $hotel['facility'] = json_encode($hotel['facility']);
        }

        if(empty($hotel['id'])){
            $hotel['id'] = $hotelModel->insert($hotel);
        }
        else {
            $hotelModel->save($hotel);
        }
        $this->redirect('/admin/hotel');
    }
}