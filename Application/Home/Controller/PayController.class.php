<?php
namespace Home\Controller;

use Common\Util\WxpayUtil\WxpayUtil;

class PayController extends HomeBaseController {

    public function success(){
        $this->display();
    }

    public function pay(){
        $this->display();
    }

    public function create_order(){
        $orderModel = D('OrderMst');
        $order = $orderModel->create();
        $order['checkin_info'] = json_encode($order['checkin_info']);
        $order['user_mst_id'] = $this->user['id'];
        $order['order_no'] = date('ymdHis').rand(rand(1000,5000),rand(5001,9999));


        $productModel = D('ProductMst');
        $product = $productModel->getById($order['product_mst_id']);
        $order['total_price'] = $product['p_price'] * $order['room_num'];
        $order['pay_status'] = 0;

        $order['id'] = $orderModel->insert($order);

        $jsApiParameters = $this->wxPay($order);
        $this->writeLog('========prepay:'.$jsApiParameters);
        die(json_encode([
            'success' => true,
            'jsApi' => $jsApiParameters
        ]));
    }

    public function prepay(){
        $this->writeLog('========prepay=========');
        $order['order_number'] = date('YmdHis');
        $order['total_price'] = 1;
        $jsApiParameters = $this->wxPay($order);
        $this->writeLog('========prepay:'.$jsApiParameters);
        die(json_encode([
            'success' => true,
            'jsApi' => $jsApiParameters
        ]));
    }



    /**
     * 微信预支付订单统一下单
     * @param $orderInfo
     * @return string
     */
    protected function wxPay($orderInfo){
//        $wxpay = \Config::get('wxpay.WX_PAY');

        $notifyUrl = 'http://'.$_SERVER['SERVER_NAME'].'/pay/wxnotify';
        $wxpayUtil = new WxpayUtil();

        $wxpayUtil->openId = $this->user['openid'];
        $wxpayUtil->outTradeNo = $orderInfo['order_no'];
        if(C('IS_TEST')) {
            $wxpayUtil->body = '黑镜测试订单微信支付';
            $wxpayUtil->totalFee = 1;
        } else {
            $wxpayUtil->body = '黑镜订单微信支付';
            $wxpayUtil->totalFee = $orderInfo['total_price'] * 100;
        }
        $wxpayUtil->notifyUrl = $notifyUrl;
        $order = $wxpayUtil->wxPrepay();
        $this->writeLog('-*-*-*-*-*-*-*-*- wx pre pay aaa -*-*-*-*-*-*-*-*-'.json_encode($order) );
        $jsApiParameters = $this->GetJsApiParameters($order);
        $this->writeLog('-*-*-*-*-*-*-*-*- wx GetJsApiParameters  -*-*-*-*-*-*-*-*-'.$jsApiParameters );
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

    public function wxnotify(){
        $xml = file_get_contents("php://input");
        $xml = stripslashes($xml);
        $this->writeLog('-*-*-*-*-*-*-*-*- wxpay notify -*-*-*-*-*-*-*-*- xml :' . $xml);

//        $verify_result = false;
//        if(!empty($xml)){
//            $partnerKey = $this->partnerKey;
//            $notify_data = WxpayUtil::resultInit($xml, $partnerKey);
//
//            if($notify_data !== false) {
//                $verify_result = WxpayUtil::checkNotifyData($notify_data);
//            }
//
//            if($verify_result) {
//                //商户订单号
//                $out_trade_no = $notify_data['out_trade_no'];
//                //微信支付订单号
//                $trade_no = $notify_data['transaction_id'];
//                //交易金额
//                $wxpay_total = $notify_data['cash_fee'];
//                $this->writeLog('-*-*-*-*-*-*-*-*- wxpay notify -*-*-*-*-*-*-*-*- out_trade_no'.$out_trade_no);
//                $this->writeLog('-*-*-*-*-*-*-*-*- wxpay notify -*-*-*-*-*-*-*-*- trade_no'.$trade_no);
//                $this->writeLog('-*-*-*-*-*-*-*-*- wxpay notify -*-*-*-*-*-*-*-*- wxpay_total'.$wxpay_total);
//                $this->notifySuccessOrderAct($out_trade_no, $trade_no, $wxpay_total);
//
//                die('<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>');
//            } else {
//                //验证失败
//                die('<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>');
//            }
//        }else{
//            $this->writeLog('-*-*-*-*-*-*-*-*- wxpay notify -*-*-*-*-*-*-*-*- xml no data');
//            die('<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[NO RESPONSE]]></return_msg></xml>');
//        }
    }
}