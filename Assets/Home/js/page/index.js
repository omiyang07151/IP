define(["core/basepage","core/app","core/wx","core/preload","touch"],
    function (Basepage,App,Wx,Preload,touch) {

        var Wedding = {
            wid:$(window).width(),
            hei:$(window).height(),
            mySlide:null,
            swiperevent:null,
            minite:0,
            sec:0,
            hs:0,


            init:function(){
                var self = this;
                self.pageClick();

            },
            pageClick:function(){
                var self = this;



            },



            scroll:function(){
                var self = this;
                $(window).scroll(function(){
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = $(document).height();
                    var windowHeight = $(this).height();
                    if(scrollTop + windowHeight == scrollHeight){
                        alert("you are in the bottom");
                    }
                })
            }


        };




        return Wedding
    });






