require(["core/app","core/wx","core/basepage","page/index","core/preload","jquery.html5Loader","transit","touch"],
    function(App,Wx,Basepage,Wedding,Preload) {

        //var option=$.parseJSON($("#wxsignpackage").val());option = eval('('+option+')');
        //App.initialize({});
        //option.debug=false;
        //Wx.onInit(option);
        //Wx.BindShare();
        Preload.createFile();
        Wedding.init();

        //$.html5Loader({
        //    filesToLoad: {files: Preload.files.preloadfiles.files},
        //    onBeforeLoad: function () {
        //    },
        //    onComplete:function(){
        //        // setTimeout(  $.proxy(  Gamep.init(), Gamep),10000);
        //    },
        //    onUpdate: function(obj){
        //        //$.proxy( Wedding);
        //        if(obj>parseInt($('.load-txt span').html())){
        //            $('.load-txt span').html(obj);
        //        }
        //        if(obj==100){
        //            setTimeout( function(){
        //                $.proxy( Wedding.init(), Wedding)
        //            },1000);
        //        }
        //    }
        //});
    });
