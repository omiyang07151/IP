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
        $('.selday').click(function(){
            $('.choose1').removeClass('choose1');
            $(this).addClass('choose1');
            start = $(this).attr('data-s');
            end = $(this).attr('data-e');
            $('#checkin').val(start);
            $('#checkout').val(end);

            hotel_mst_id = $('#hotel_mst_id').val();
            if(hotel_mst_id!='0' && hotel_mst_id!=undefined){
                $('.date_range').html(start+' - '+end);
            }
            else {
                $('.date_range').html(start);
            }

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

