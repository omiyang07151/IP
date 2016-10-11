define([], function () {
    var App ={
        el: "body",
        windowWidth: 0,
        windowHeight: 0,
        innerHeight:0,
        innerWidth:0,
        fgg:0,
        initialize: function (options) {
            // register window resize handler.
            var resizeHandler = _.throttle(this.onWindowResize, 200);
            $(window).resize($.proxy(resizeHandler, this));



            this.windowWidth = $(window).width();
            this.windowHeight = $(window).height();
            if( this.windowWidth>640){
                this.fgg=(640- this.windowWidth)/640;
            }else{
                this.fgg=(640- this.windowWidth)/640;
            }
            // let sub class to initialize this view.
            this.onInit(options);
            window.addEventListener("deviceorientation", $.proxy(this.onOrientation, this), false);
        },

        onWindowResize: function () {
            var winWidth = $(window).width();
            var winHeight = $(window).height();


            this.windowWidth = winWidth;
            this.windowHeight = winHeight;

            // let sub class to update view.
            this.onResize();


        },

        onInit: function (options) {

        },

        onResize: function () {
            // sub-class to override.
        },
        onOrientation: function () {
            this.windowWidth = $(window).width();
            this.windowHeight = $(window).height();
            this.innerHeight =window.innerHeight;
                this.innerWidth=window.innerWidth;
            if( this.windowWidth>640){
                this.fgg=(640- this.windowWidth)/640;
            }else{
                this.fgg=(640- this.windowWidth)/640;
            }
            if ($(window).width() > $(window).height()) {
                $("#rotation").fadeOut();
            } else {
                $("#rotation").fadeIn();
            }
        },
        showRatationTip: function () {
            var container = $("#rotation");
            var img = $("#rotation img");

            img.css("left", (this.windowWidth - img.width()) * .5);
            img.css("top", (this.windowHeight - img.height()) * .5);

            container.fadeIn();
        }

    }
    return App;
})