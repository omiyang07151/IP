<?php
namespace Inoherb\Widget;

use Think\Controller;

class effectWidget extends Controller {

    public function index(){
        layout(false);

        $effectModel = D('EffectMst');
        $effectList = $effectModel->getAllEffects();

        $seriesModel = D('ProductSeries');
        if(!empty($effectList)) {
            foreach($effectList as &$item) {
                $item['series'] = $seriesModel->getSeriesByIds($item['series_id']);
            }
        }
        $this->assign('effects', $effectList);

        $categoryModel = D('CategoryMst');
        $steps = $categoryModel->getTypeByParentName('步骤');
        $this->assign('steps', $steps);
        $skins = $categoryModel->getTypeByParentName('肤质');
        $this->assign('skins', $skins);

        echo $this->fetch('Widget/Effect/index');
    }
}