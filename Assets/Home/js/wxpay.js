/**
 * Created by omiyang on 16/10/18.
 */
ETWxPay={
    appId:'',
    timeStamp:'',
    nonceStr:'',
    package:'',
    signType:'',
    paySign:'',
    result:'',
    order_no:'',

    //调用微信JS api 支付
    jsApiCall:function()
    {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            result,
            function(res){
                WeixinJSBridge.log(res.err_msg);
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    window.location.href='/pay/success.html?ono='+order_no;
                }else{
                    myjs.showDialog('支付失败,请稍后再试');
                }
            }
        );
    },
    callpay:function()
    {
        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', ETWxPay.jsApiCall, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', ETWxPay.jsApiCall);
                document.attachEvent('onWeixinJSBridgeReady', ETWxPay.jsApiCall);
            }
        }else{
            ETWxPay.jsApiCall();
        }
    }
}