define(['weixin',"core/basepage"], function (WeiXin,Basepage) {
    var WxUtil={
        img_url: Basepage.baseurl+'images/share.jpg',
        page_url: "http://bbyy-wap.enjoytouch.com.cn/game/index",
        friend_title: "头发君的PM2.5大作战",
        friend_content :"头发君的PM2.5大作战",
        timeline_content : "头发君的PM2.5大作战",
        onInit:function(option){
            WeiXin.config({
                debug: option.debug,
                appId:option.appId,
                timestamp: option.timestamp,
                nonceStr: option.nonceStr,
                signature:option.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ]
            });
        },

        BindShare:function(){
            var self=this;

            WeiXin.ready(function () {

                WeiXin.onMenuShareAppMessage({
                    title:self.friend_title,
                    desc: self.friend_content,
                    link: self.page_url,
                    imgUrl:self.img_url,
                    success: function (res) {

                    }
                });
                WeiXin.onMenuShareTimeline({
                    title: self.friend_title, // 分享标题
                    link: self.page_url, // 分享链接
                    imgUrl: self.img_url, // 分享图标
                    success: function (res) {

                    }

                });
                WeiXin.onMenuShareQQ({
                    title: self.friend_title, // 分享标题
                    desc: self.friend_content, // 分享描述
                    link: self.page_url,
                    imgUrl:self.img_url,
                    success: function (res) {

                    }

                });
                WeiXin.onMenuShareWeibo({
                    title: self.friend_title, // 分享标题
                    desc: self.friend_content, // 分享描述
                    link: self.page_url,
                    imgUrl:self.img_url,
                    success: function (res) {

                    }

                });
            })
        }

    }
    return WxUtil;
})
