<?php
namespace Inoherb\Widget;

use Think\Controller;

class TopWidget extends Controller {

    public function waplist(){
        layout(false);

        $effectModel = D('EffectMst');
        $effectList = $effectModel->getAllEffects();
        $this->assign('effects', $effectList);

        $seriesModel = D('ProductSeries');
        $series = $seriesModel->getSeriesAll();
        $this->assign('series', $series);

        $categoryModel = D('CategoryMst');
        $bztypes = $categoryModel->getTypeByParentName('步骤');
        $this->assign('bztypes', $bztypes);

        $cjtypes = $categoryModel->getTypeByParentName('场景');
        $this->assign('cjtypes', $cjtypes);

        $nltypes = $categoryModel->getTypeByParentName('年龄');
        $this->assign('nltypes', $nltypes);

        $fztypes = $categoryModel->getTypeByParentName('肤质');
        $this->assign('fztypes', $fztypes);

        $jgtypes = $categoryModel->getTypeByParentName('价格');
        $this->assign('jgtypes', $jgtypes);

        echo $this->fetch('Widget/Top/waplist');
    }
}