$(document).ready(function(){
    myjs.init();
});
var myjs = {
    wid:$(window).width(),
    hei:$(window).height(),
    mySlide:null,
    minite:0,
    sec:0,
    hs:0,
    mySwiper:null,
    init:function(){
        var self = this;
        self.pageClick();
        $('.day>li').css({"line-height":self.wid*0.94*0.9/7+"px"});
        $('.date>li').css({"line-height":self.wid*0.94*0.9/7+"px"});
        $('.choose1').css({"border-radius":self.wid*0.94*0.9/7/2+"px"})
        $('.choose2').css({"border-top-left-radius":self.wid*0.94*0.9/7/2+"px","border-bottom-left-radius":self.wid*0.94*0.9/7/2+"px"});
        $('.choose4').css({"border-top-right-radius":self.wid*0.94*0.9/7/2+"px","border-bottom-right-radius":self.wid*0.94*0.9/7/2+"px"})
    },


    pageClick:function(){
        var self = this;
        $('.weui-dialog__btn_primary').click(function(){
            $('#iosDialog2').hide();
        })
    },
    showLoading:function(msg){
        $('.weui-toast__content').html(msg);
        $('#loadingToast').show();
    },
    hideLoading:function(){
        $('#loadingToast').hide();
    },
    showDialog:function(msg){
        $('.weui-dialog__bd').html(msg);
        $('#iosDialog2').show();
    }








};

