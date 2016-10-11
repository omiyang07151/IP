define([],
    function(){
        var BasePage={
            'currentIndex' :1,
            'baseurl':'http://www.dianping151102.com/',
            'cdnurl':'http://www.dianping151102.com/',
            getNowtime:function(){
                var d = new Date();
                return d.getTime();
            },
            IO:function(url,data,obj){
                var self=this;
                self.showLoading();
                $.ajax({
                    url:this.baseurl+url,
                    type: 'POST',
                    dataType:"json",
                    data: data,
                    success: function(result){
                        obj.success(result);
                    },
                    error:function(){
                    },
                    complete:function(){
                       self.hideLoading();
                    }
                });
            },
            Is_weixin: function(){
                var ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    return true;
                } else {
                    return false;
                }
            },
            Is_ie:function(){
                if (!$.support.leadingWhitespace) {
//如果是ie 6,7,8
                    return true;
                }
                else{
                    return false;
                }
            },
            showLoading:function(){
                $("#black2").show();
               // $("#loading").show();
            },
            hideLoading:function(){
                $("#black2").hide();
              //  $("#loading").hide();
            },
            strLen : function(str) {
                var strlength = 0;
                for (var i=0; i<str.length; i++) {
                    if(/.*[\u4e00-\u9fa5]+.*$/.test(str.charAt(i))) {
                        strlength = strlength + 2;//中文计算为一个字符
                    } else {
                        strlength = strlength + 1;
                    }
                }
                return strlength;
            }
        }
        return BasePage;
    });