<?php
namespace Home\Controller;

class PayController extends HomeBaseController {

    public function success(){
        $this->display();
    }

    public function pay(){

    }

    /**
     * 微信预支付订单统一下单
     * @param $orderInfo
     * @return string
     */
    protected function wxPay($orderInfo){
//        $wxpay = \Config::get('wxpay.WX_PAY');
        $appId = $this->appId;
        $appSecret =  $this->appSecret;
        $notifyUrl = 'http://www.mirrorblack.cn/pay/wxnotify';
        $wxpayUtil = new WxpayUtil($appId, $appSecret ,$this->partnerId ,$this->partnerKey);
        $user = session('User');
        $wxpayUtil->openId = $user['weixin_open_id'];
        $wxpayUtil->outTradeNo = $orderInfo['order_number'];
        if(\Config::get('config.IS_TEST_PAY')) {
            $wxpayUtil->body = '黑镜测试订单微信支付';
            $wxpayUtil->totalFee = 1;
        } else {
            $wxpayUtil->body = '黑镜订单微信支付';
            $wxpayUtil->totalFee = $orderInfo['total_price'] * 100;
        }
        $wxpayUtil->notifyUrl = $notifyUrl;
        $order = $wxpayUtil->wxPrepay();
        $jsApiParameters = $this->GetJsApiParameters($order);
        $this->Log('-*-*-*-*-*-*-*-*- wx pre pay  -*-*-*-*-*-*-*-*-' );
        return $jsApiParameters;
    }
    /**
     *
     * 获取jsapi支付的参数
     * @param array $UnifiedOrderResult 统一支付接口返回的数据
     * @throws WxPayException
     *
     * @return json数据，可直接填入js函数作为参数
     */
    public function GetJsApiParameters($UnifiedOrderResult)
    {
        if(!array_key_exists("appid", $UnifiedOrderResult)
            || !array_key_exists("prepay_id", $UnifiedOrderResult)
            || $UnifiedOrderResult['prepay_id'] == "")
        {
            throw new \WxPayException("参数错误");
        }
        $jsapi = new \WxPayJsApiPay();
        $jsapi->SetAppid($UnifiedOrderResult["appid"]);
        $timeStamp = time();
        $jsapi->SetTimeStamp("$timeStamp");
        $jsapi->SetNonceStr(\WxPayApi::getNonceStr());
        $jsapi->SetPackage("prepay_id=" . $UnifiedOrderResult['prepay_id']);
        $jsapi->SetSignType("MD5");
        $jsapi->SetPaySign($jsapi->MakeSign());
        $parameters = $jsapi->GetValues();
        return $parameters;
    }
}