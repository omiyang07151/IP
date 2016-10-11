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
        $('.fx-choose>li').click(function(){
            $(this).addClass('fx-on');
            $(this).siblings().removeClass('fx-on')
        });
        $('.btn-minus').click(function(){
            var a = $('.num-input').val()
            if(a<=1){
            }
            else{
                a--;
                $('.num-input').val(a)
            }
        });
        $('.btn-add').click(function(){
            var a = $('.num-input').val()
            a++;
            $('.num-input').val(a)
        });
    }







};

