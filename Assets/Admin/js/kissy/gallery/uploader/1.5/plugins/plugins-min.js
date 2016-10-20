/*!build time : 2014-02-28 2:35:27 PM*/
KISSY.add("gallery/uploader/1.5/plugins/auth/auth",function(a,b,c){function d(a){var b=-1;do a/=1024,b++;while(a>99);return Math.max(a,.1).toFixed(1)+["kB","MB","GB","TB","PB","EB"][b]}function e(a){var b=this;e.superclass.constructor.call(b,a)}var f="",g=b.all,h="error";return a.extend(e,c,{pluginInitializer:function(a){if(!a)return!1;var b=this;b.set("uploader",a),b._useThemeConfig();var c=a.get("queue");b._setSwfButtonExt(),c.on("add",function(a){var c=a.file;if("restore"==c.type)return!0;var d=b.testAllowExt(c);d&&(d=b.testMaxSize(c)),d&&b.testRepeat(c),d&&b.testWidthHeight(c)}),c.on("remove",function(a){var c=a.file,d=c.status;"success"==d&&b.testMax()&&b.testRequired()}),a.on("success",function(){b.testMax()}),a.on("error",function(c){-1===c.status&&"max"==c.rule&&b._maxStopUpload(),a.set("isAllowUpload",!0)})},_useThemeConfig:function(){var b=this,c=b.get("msg");if(!a.isEmptyObject(c))return!1;var d=b.get("uploader"),e=d.get("theme");if(!e)return!1;var c=e.get("authMsg");c&&b.set("msg",c);var f=b.get("allowExts");return f||b.set("allowExts",e.get("allowExts")),b},setAllowExts:function(b){if(!a.isString(b))return!1;var c=[],d=[];return b=b.split(","),a.each(b,function(a){c.push("*."+a),d.push(a.toUpperCase())}),c=c.join(";"),d=d.join(","),{desc:d,ext:c}},testAll:function(){var a=this;return a.testRequire()&&a.testMax()},isUploaderType:function(a){var b=this,c=b.get("uploader"),d=c.get("type");return a==d},testRequired:function(){var a=this,b=a.get("uploader"),c=b.get("queue"),d=c.getFiles("success");return d.length>0},testAllowExt:function(b){function c(b,c){var d,e=!1,f=c.toLowerCase();return a.each(b,function(a){return d=new RegExp("^.+."+a+"$"),d.test(f)?e=!0:void 0}),e}function d(a){var b=a.split(".");return b[b.length-1]}if(!a.isObject(b))return!1;var e=this,f=b.name,g=e.get("allowExts");if(!g)return!0;var h=g.split(","),i=c(h,f);if(!i){var j=d(f),k=e.msg("allowExts");k=a.substitute(k,{ext:j}),e._fireUploaderError("allowExts",[g,k],b)}return i},testMax:function(){var b=this,c=b.get("max");if(c==f)return!0;var d=b.get("uploader"),e=d.get("queue"),g=e.getFiles("success"),h=g.length,i=c>h;if(i)d.set("disabled",!1),d.set("isAllowUpload",!0);else{d.set("disabled",!0),d.set("isAllowUpload",!1);var j=b.msg("max");j=a.substitute(j,{max:c}),b._fireUploaderError("max",[c,j])}return i},testMaxSize:function(b){var c=this,e=b.size,g=c.get("maxSize");if(g==f||!e)return!0;c.get("uploader");g=1024*g;var h=g>=e;if(!h){var i=c.msg("maxSize");i=a.substitute(i,{maxSize:d(g),size:b.textSize}),c._fireUploaderError("maxSize",[g,i],b)}return h},testRepeat:function(b){if(!a.isObject(b))return!1;var c=this,d=b.name,e=c.get("allowRepeat");if(e===f)return!1;var g=c.get("uploader"),h=g.get("queue"),i=h.getFiles("success"),j=!1;return a.each(i,function(a){return a.name==d?(a.size?a.size==b.size&&c._fireUploaderError("allowRepeat",[e,c.msg("allowRepeat")],b):c._fireUploaderError("allowRepeat",[e,c.msg("allowRepeat")],b),j=!0):void 0}),j},testWidthHeight:function(b){function c(a,c){var f=e.call(d,a,c);if(f){h.set("isAllowUpload",!0);var g=h.get("queue").getFileIndex(b.id);h.upload(g)}else{var i=d.msg("widthHeight");d._fireUploaderError("widthHeight",[e,i],b)}}var d=this,e=d.get("widthHeight");if(e===f)return!0;var h=d.get("uploader");h.set("isAllowUpload",!1);var i=b.data;if(a.isEmptyObject(i)){var j=h.get("target").all("input").getDOMNode();j.select(),j.blur();var k=document.selection.createRange().text,l=g('<img style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);width:300px;visibility:hidden;"  />').appendTo("body").getDOMNode();l.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src=k;var m=l.offsetWidth,n=l.offsetHeight;c(m,n),g(l).remove()}else{var o=new FileReader;o.onload=function(a){var b=a.target.result,d=new Image;d.onload=function(){var a=d.width,b=d.height;c(a,b)},d.src=b},o.readAsDataURL(i)}},_setSwfButtonExt:function(){var a=this,b=a.get("uploader"),c=a.get("allowExts"),d=b.get("button"),e=a.isUploaderType("flash");return e&&c!==f?(c=a.setAllowExts(c),d&&d.set("fileFilters",c[0]),a):!1},_getExts:function(b){if(!a.isString(b))return!1;var c=b.split(";"),d=[],e=/^\*\./;return a.each(c,function(a){a=a.replace(e,""),d.push(a.toUpperCase())}),a.each(d,function(a){c.push(a)}),c},_fireUploaderError:function(b,c,d){var e=this,f=e.get("uploader"),g=f.get("queue"),i={status:-1,rule:b},j=-1;d&&(j=g.getFileIndex(d.id),a.mix(i,{file:d,index:j})),c&&a.mix(i,{msg:c[1],value:c[0],result:{}}),g.fileStatus(j,"error",i),e.fire(h,i),f.fire("error",i)},_maxStopUpload:function(){var b=this,c=b.get("uploader"),d=c.get("queue"),e=b.get("max"),g=c.get("curUploadIndex");if(g==f||e>g)return!1;var h=d.get("files"),i=d.getFiles("success");i.length>e&&c.stop(),a.each(h,function(a,b){b>g&&d.remove(a.id)}),c.set("curUploadIndex",f)},msg:function(b,c){var d=this;if(!a.isString(b))return d;var e=d.get("msg");return a.isString(c)?(e[b]=c,c):e[b]},_processRuleConfig:function(b,c){var d=this;return a.isString(b)?(a.isArray(c)&&d.msg(b,c[1]),d):d}},{ATTRS:{pluginId:{value:"auth"},uploader:{value:f},required:{value:f},max:{value:f},allowExts:{value:f},maxSize:{value:f},allowRepeat:{value:f},widthHeight:{value:f},msg:{value:{}}}}),e},{requires:["node","base"]}),KISSY.add("gallery/uploader/1.5/plugins/filedrop/filedrop",function(a,b,c){var d="",e=b.all,f=a.UA,g=function(a){var b=this;g.superclass.constructor.call(b,a),b.set("mode",h())},h=function(){return f.webkit>=7||f.firefox>=3.6?"supportDrop":f.ie?"notSupportDropIe":f.webkit<7||f.firefox<3.6?"notSupportDrop":void 0};return a.mix(g,{event:{AFTER_DROP:"afterdrop"}}),a.extend(g,c,{pluginInitializer:function(b){var c,d=this,e=d.get("mode");if(!b)return!1;if(d.set("uploader",b),"flash"==b.get("type"))return a.log("flash\u4e0a\u4f20\u65b9\u5f0f\u4e0d\u652f\u6301\u62d6\u62fd\uff01"),d.set("isSupport",!1),!1;if("supportDrop"!=e)return a.log("\u8be5\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u62d6\u62fd\u4e0a\u4f20\uff01"),d.set("isSupport",!1),!1;var f=b.get("target");d.set("target",f),c=d._createDropArea(),c.on("click",d._clickHandler,d),b.on("afterDisabledChange",function(a){d[a.newVal&&"hide"||"show"]()}),d.fire("render",{buttonTarget:d.get("buttonWrap")})},show:function(){var a=this,b=a.get("dropContainer");b.show()},hide:function(){var a=this,b=a.get("dropContainer");b.hide()},_createDropArea:function(){var b=this,c=e(b.get("target")),d=b.get("mode"),f=a.substitute(b.get("tpl")[d],{name:b.get("name")}),g=e(f),h=g.all(".J_ButtonWrap");return g.appendTo(c),g.on("dragover",function(a){a.stopPropagation(),a.preventDefault()}),g.on("drop",function(a){a.stopPropagation(),a.preventDefault(),b._dropHandler(a)}),b.set("dropContainer",g),b.set("buttonWrap",h),b._setStyle(),g},_setStyle:function(){var a=this,b=a.get("dropContainer");return b.length?(b.parent().css("position","relative"),b.css({position:"absolute",top:"0",left:"0",width:"100%",height:"100%",zIndex:"1000"}),void 0):!1},_clickHandler:function(){var a=this,b=a.get("uploader"),c=b.get("button"),d=c.get("fileInput");d.fire("click")},_dropHandler:function(b){var c=this,e=g.event,f=b.originalEvent.dataTransfer.files,h=[],i=c.get("uploader");return f.length&&i!=d?(a.each(f,function(b){a.isObject(b)&&h.push({name:b.name,type:b.type,size:b.size,data:b})}),c.fire(e.AFTER_DROP,{files:h}),i._select({files:h}),void 0):!1}},{ATTRS:{pluginId:{value:"filedrop"},target:{value:d,getter:function(a){return e(a)}},uploader:{value:d},dropContainer:{value:d},isSupport:{value:!0},tpl:{value:{supportDrop:'<div class="drop-wrapper"></div>',notSupportDropIe:'<div class="drop-wrapper"><p>\u60a8\u7684\u6d4f\u89c8\u5668\u53ea\u652f\u6301\u4f20\u7edf\u7684\u56fe\u7247\u4e0a\u4f20\uff0c</p><p class="suggest J_ButtonWrap">\u63a8\u8350\u4f7f\u7528chrome\u6d4f\u89c8\u5668\u6216firefox\u6d4f\u89c8\u5668</p></div>',notSupportDrop:'<div class="drop-wrapper"><p>\u60a8\u7684\u6d4f\u89c8\u5668\u53ea\u652f\u6301\u4f20\u7edf\u7684\u56fe\u7247\u4e0a\u4f20\uff0c</p><p class="suggest J_ButtonWrap">\u63a8\u8350\u5347\u7ea7\u60a8\u7684\u6d4f\u89c8\u5668</p></div>'}},name:{value:""}}}),g},{requires:["node","base"]}),KISSY.add("gallery/uploader/1.5/plugins/imageZoom/imageZoom",function(a,b,c,d){function e(a){var b=this;e.superclass.constructor.call(b,a)}var f="",g=b.all;return a.extend(e,c,{pluginInitializer:function(a){if(!a)return!1;var b=this,c=a.get("theme");if(!c)return!1;var e=b.get("imageHook"),f=new d({baseEl:c.get("queueTarget"),img:e});f.get("baseEl").delegate("click",e,function(a){var b=a.target;f.show(g(b))}),b.set("albums",f),a.on("success",b._successHandler,b)},_successHandler:function(a){var b=a.file,c=b.id,d=b.result,e=d.url,f=g(".J_Pic_"+c);f.attr("data-original-url",e)}},{ATTRS:{pluginId:{value:"imageZoom"},albums:{value:f},imageHook:{value:".preview-img"}}}),e},{requires:["node","base","gallery/albums/1.1/"]}),KISSY.add("gallery/uploader/1.5/plugins/imgcrop/imgcrop",function(a,b,c,d){function e(a){var b=this;e.superclass.constructor.call(b,a),b.set("config",a)}var f=b.all;return a.extend(e,c,{pluginInitializer:function(a){if(!a)return!1;var b=this,c=b.get("config"),e=new d(c);b.set("crop",e),a.on("success",b._successHandler,b),a.on("select",b._selectHandler,b),e.on("imgload",function(){b.set("isRender",!0)})},_successHandler:function(a){var b=this,c=b.get("crop"),d=a.file,e=d.id,g=a.result.url;c.set("url",g);var h=".J_CropArea_"+e,i=f(h);return i.length?(c.set("areaEl",h),c.container=i,c.set("areaWidth",i.width()),c.set("areaHeight",i.height()),c.render(),void 0):!1},_selectHandler:function(){var a=this,b=a.get("isRender"),c=a.get("crop");return b?(c.destroy(),void 0):!1}},{ATTRS:{pluginId:{value:"imgcrop"},isRender:{value:!1},config:{value:{}}}}),e},{requires:["node","base","gallery/imgcrop/2.1/index"]}),KISSY.add("gallery/uploader/1.5/plugins/preview/preview",function(a,b,c,d,e,f){function g(){var b="";if("undefined"==typeof window.FileReader)switch(a.UA.shell){case"firefox":b="domfile";break;case"ie":switch(a.UA.ie){case 6:b="simple";break;default:b="filter"}}else b="html5";return b}function h(a,b){if(!a)return!1;if("filter"!=m)a.src=b||"";else if(b){b=b.replace(/[)'"%]/g,function(a){return escape(escape(a))});try{a.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src=b}catch(c){}}return!0}function i(b){var c=this,d={maxWidth:40,maxHeight:40};c.config=a.mix(d,b),i.superclass.constructor.call(c,b)}var j=b.all,k=document,l="[Plugin: Preview] ",m=g(),n={check:"check",success:"success",showed:"showed",error:"error"};return a.extend(i,e,{pluginInitializer:function(a){if(!a)return!1;var b=this;b.set("uploader",a),a.on("add",b._uploaderAddHandler,b)},_uploaderAddHandler:function(b){var c=this,d=c.get("uploader");if(d.get("hasRestore"))return!1;var e=d.get("fileInput"),f=b.file,g=f.data,h=f.id,i=c.get("preHook"),k=j(i+h);return k.length?(d.get("multiple")&&"ajax"==d.get("type")?c.show(g,k,function(){k.show()}):(c.preview(e,k),k.show()),void 0):(a.log("\u94a9\u5b50\u4e3a\uff1a"+i+h+"\uff0c\u627e\u4e0d\u5230\u56fe\u7247\u5143\u7d20\uff0c\u65e0\u6cd5\u9884\u89c8\u56fe\u7247"),!1)},show:function(b,c,d){if(!b||!c||!c.length)return!1;var e=this,f=new FileReader;f.onload=function(a){var b=e.data=a.target.result;e.fire(n.getData,{data:b,mode:m}),c.attr("src",b),d&&d.call(e,b),e.fire(n.showed,{img:b})},f.onerror=function(){a.log(l+"File Reader Error. Your browser may not fully support html5 file api","warning"),e.fire(n.error)},f.readAsDataURL(b)},preview:function(b,d){b=c.get(b),d=c.get(d);var e=this,g=function(){e.fire(n.getData,{data:e.data,mode:m}),d&&(h(d,e.data),e.fire(n.showed,{img:d}))};if(e.data=void 0,b){switch(10==f.ie&&(m="filter"),m){case"domfile":e.data=b.files[0].getAsDataURL();break;case"filter":b.select();try{e.data=k.selection.createRange().text}catch(i){a.log(l+"IE\u4e0b\u56e0\u4e3a\u5b89\u5168\u95ee\u9898\u4f1a\u629b\u51fa\u62d2\u7edd\u8bbf\u95ee\u7684\u9519\u8bef\uff0c\u4e0d\u59a8\u788d\u9884\u89c8: "),a.log(i,"dir")}finally{k.selection.empty()}e.data||(e.data=b.value);break;case"html5":var j=new FileReader;j.onload=function(a){e.data=a.target.result,g()},j.onerror=function(){a.log(l+"File Reader Error. Your browser may not fully support html5 file api","warning"),e.fire(n.error)},b.files&&b.files.length&&j.readAsDataURL(b.files[0]);break;case"simple":default:e.data=b.value}e.data?g():"html5"!=m&&(h(d),e.fire(n.error))}else a.log(l+"File Input Element does not exists.");return e.data}},{ATTRS:{pluginId:{value:"preview"},uploader:{value:""},preHook:{value:".J_Pic_"}}}),i},{requires:["node","dom","event","base","ua"]}),KISSY.add("gallery/uploader/1.5/plugins/proBars/progressBar",function(a,b,c){function d(b,c){var e=this;c=a.merge({wrapper:f(b)},c),d.superclass.constructor.call(e,c)}var e="",f=b.all,g="progressbar",h="role",i="aria-valuemin",j="aria-valuemax",k="aria-valuenow",l="data-value";return a.mix(d,{tpl:{DEFAULT:'<div class="ks-progress-bar-value" data-value="{value}"></div>'},cls:{PROGRESS_BAR:"ks-progress-bar",VALUE:"ks-progress-bar-value"},event:{RENDER:"render",CHANGE:"change",SHOW:"show",HIDE:"hide"}}),a.extend(d,c,{render:function(){var a=this,b=a.get("wrapper"),c=a.get("width");return b.length?("auto"==c&&(c=b.parent().width()),b.width(c),b.addClass(d.cls.PROGRESS_BAR),a._addAttr(),!a.get("visible")&&a.hide(),a.set("bar",a._create()),a.fire(d.event.RENDER),void 0):!1},show:function(){var a=this,b=a.get("wrapper");b.fadeIn(a.get("duration"),function(){a.set("visible",!0),a.fire(d.event.SHOW,{visible:!0})})},hide:function(){var a=this,b=a.get("wrapper");b.fadeOut(a.get("duration"),function(){a.set("visible",!1),a.fire(d.event.HIDE,{visible:!1})})},_create:function(){var b=this,c=b.get("wrapper"),d=b.get("value"),e=b.get("tpl"),g=a.substitute(e,{value:d});return c.html(""),f(g).appendTo(c)},_addAttr:function(){var a=this,b=a.get("wrapper"),c=a.get("value");return b.attr(h,g),b.attr(i,0),b.attr(j,100),b.attr(k,c),a}},{ATTRS:{wrapper:{value:e},bar:{value:e},width:{value:"auto"},value:{value:0,setter:function(a){var b,c=this,e=c.get("wrapper"),f=c.get("bar"),g=c.get("speed");return a>100&&(a=100),0>a&&(a=0),b=Math.ceil(e.width()*(a/100)),f.stop().animate({width:b+"px"},g,"none",function(){e.attr(k,a),f.attr(l,a),c.fire(d.event.CHANGE,{value:a,width:b})}),a}},visible:{value:!0},duration:{value:.3},tpl:{value:d.tpl.DEFAULT},speed:{value:.2}}}),d},{requires:["node","base"]}),KISSY.add("gallery/uploader/1.5/plugins/proBars/proBars",function(a,b,c,d){function e(a){var b=this;e.superclass.constructor.call(b,a)}var f=b.all,g="J_ProgressBar_";return a.mix(e,{event:{RENDER:"render"}}),a.extend(e,c,{pluginInitializer:function(a){if(!a)return!1;var b=this;a.on("start",function(a){b.add(a.file.id)}),a.on("progress",b._uploaderProgressHandler,b),a.on("success",b._uploaderSuccessHandler,b),b.fire(e.event.RENDER)},_uploaderProgressHandler:function(a){var b=this,c=a.file,d=c.id,e=a.loaded,f=a.total,g=Math.ceil(e/f*100),h=b.get("bars")[d];h&&h.set("value",g)},_uploaderSuccessHandler:function(b){var c=this,d=b.file,e=d.id,h=c.get("bars")[e],i=c.get("isHide");h&&h.set("value",100),i&&a.later(function(){var a=f("."+g+b.file.id);a.hide()},500)},add:function(b){if(!a.isString(b))return!1;var c=this,e=f("."+g+b),h=f(".J_ProgressCount_"+b),i=c.get("speed"),j=new d(e,{width:c.get("width"),speed:i});h.length&&j.on("change",function(a){h.text(a.value+"%")}),j.render();var k=c.get("bars");return k[b]=j}},{ATTRS:{pluginId:{value:"proBars"},bars:{value:{}},width:{value:"auto"},isHide:{value:!0},speed:{value:.2}}}),e},{requires:["node","base","./progressBar"]}),KISSY.add("gallery/uploader/1.5/plugins/tagConfig/tagConfig",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a)}var e="",f=(b.all,["autoUpload","postData","action","multiple","multipleLen","uploadType","disabled"]),g=["max","maxSize","allowRepeat","allowExts","required","widthHeight"];return a.extend(d,c,{pluginInitializer:function(a){if(!a)return!1;var b=this,c=a.get("_oldInput");return c?(b.set("uploader",a),b.set("input",c),b.cover(),void 0):!1},cover:function(){var a=this;return a._setUploaderConfig(),a._setAuthConfig(),a},_setUploaderConfig:function(){var b,c=this,d=c.get("input"),e=c.get("uploader");a.each(f,function(c){if(b=d.attr(c)){switch(c){case"postData":c="data",b=a.JSON.parse(b),a.isEmptyObject(b)||(b=a.merge(e.get("data"),b));break;case"uploadType":c="type";break;case"autoUpload":b="true"==b}e.set(c,b)}})},_setAuthConfig:function(){var b=this,c=b.get("input"),d=b.get("uploader"),e=d.getPlugin("auth");if(!e)return!1;var f,h;a.each(g,function(a){if(f=c.attr(a)){switch(a){case"allowRepeat":f="true"==f;break;case"maxSize":f=Number(f)}e.set(a,f)}h=c.attr(a+"-msg"),h&&e.msg(a,h)})}},{ATTRS:{pluginId:{value:"tagConfig"},input:{value:e}}}),d},{requires:["node","base"]}),KISSY.add("gallery/uploader/1.5/plugins/urlsInput/urlsInput",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a)}var e="",f=b.all,g="[uploader-urlsInput]:";return a.extend(d,c,{pluginInitializer:function(a){var b=this;if(!a)return!1;b.set("uploader",a),a.on("success",b._uploadSuccessHandler,b);var c=a.get("queue");c.on("remove",b._fileRemoveHandler,b)},_uploadSuccessHandler:function(b){var c=this,d=b.result;if(!a.isObject(d))return!1;var e=d.url;return c.get("useName")&&(e=d.name),c.add(e),c},_fileRemoveHandler:function(a){var b=this,c=a.file,d=c.result;if(!d)return!0;var e=d.url;b.get("useName")&&(e=d.name),b.remove(e)},add:function(b){if(!a.isString(b))return a.log(g+"add()\u7684url\u53c2\u6570\u4e0d\u5408\u6cd5\uff01"),!1;var c=this,d=c.get("urls"),f=c.isExist(b);return d[0]==e&&(d=[]),f?(a.log(g+"add()\uff0c\u6587\u4ef6\u8def\u5f84\u5df2\u7ecf\u5b58\u5728\uff01"),c):(d.push(b),c.set("urls",d),c._val(),c)},remove:function(b){if(!b)return!1;var c=this,d=c.get("urls"),e=c.isExist(b),f=new RegExp(b);return e?(d=a.filter(d,function(a){return!f.test(a)}),c.set("urls",d),c._val(),d):(a.log(g+"remove()\uff0c\u4e0d\u5b58\u5728\u8be5\u6587\u4ef6\u8def\u5f84\uff01"),!1)},parse:function(){var b=this,c=b.get("target");if(c){var d,h=f(c).val(),i=b.get("split");return h==e?[]:(d=h.split(i),b.set("urls",d),d)}return a.log(g+"cannot find urls input."),[]},_val:function(){var a=this,b=a.get("urls"),c=a.get("target"),d=a.get("split"),e=b.join(d);return c.val(e),e},isExist:function(b){var c=this,d=!1,e=c.get("urls"),f=new RegExp(b);return e.length?(a.each(e,function(a){return f.test(a)?d=!0:void 0}),d):!1}},{ATTRS:{pluginId:{value:"urlsInput"},uploader:{value:e},urls:{value:[]},split:{value:",",setter:function(a){var b=this;return b._val(),a}},target:{value:e,getter:function(a){return f(a)}},useName:{value:!1}}}),d},{requires:["node","base"]}),KISSY.add("gallery/uploader/1.5/plugins/paste/paste",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a)}var e=b.all;return a.extend(d,c,{pluginInitializer:function(b){if(!b)return!1;var c=this,d=c.get("target");return d.length?(d.on("paste",function(c){var d=c.originalEvent&&c.originalEvent.clipboardData&&c.originalEvent.clipboardData.items;if(d&&d.length){var e=b.get("queue");a.each(d,function(c){var d=c.getAsFile&&c.getAsFile();if(a.isObject(d)){d.name="file-"+a.guid()+".png";var d={name:d.name,type:d.type,size:d.size,data:d};d=e.add(d);var f=e.getFileIndex(d.id);b.upload(f)}})}}),void 0):!1}},{ATTRS:{pluginId:{value:"paste"},target:{value:e(document)}}}),d},{requires:["node","base"]}),KISSY.add("gallery/uploader/1.5/token",function(a,b){function c(){var a=arguments[1]||location.hostname,b=a.split("."),c=b.length,d=arguments[0]||(3>c?0:1);return(d>=c||2>c-d)&&(d=c-2),b.slice(d).join(".")}function d(){var a=c(-1);return"net"==a}function e(a,c){if(!a)return!1;var e=d()&&f||g;b.jsonp(e,function(b){var d=b.value;if(d){var b=a.get("data");b._tb_token_=d}c&&c(b)})}var f="http://aop.widgets.daily.taobao.net/block/getReqParam.htm",g="http://aop.widgets.taobao.com/block/getReqParam.htm";return e},{requires:["ajax"]}),KISSY.add("gallery/uploader/1.5/plugins/miniLogin/miniLogin",function(a,b,c,d,e){function f(a){var b=this;f.superclass.constructor.call(b,a)}b.all;return a.extend(f,c,{pluginInitializer:function(a){return a?(a.on("select",function(){var b=e.check();if(!b){var c=a.get("autoUpload"),f=!1;c&&(a.set("autoUpload",!1),f=!0),e.show({},function(){d(a,function(){a.uploadFiles()}),f&&a.set("autoUpload",!0)})}}),void 0):!1}},{ATTRS:{pluginId:{value:"miniLogin"}}}),f},{requires:["node","base","../../token","tbc/mini-login/1.4.0/"]}),KISSY.add("gallery/uploader/1.5/plugins/plugins",function(a,b,c,d,e,f,g,h,i,j,k){return{Auth:b,Filedrop:c,ImageZoom:d,Imgcrop:e,Preview:f,ProBars:g,TagConfig:h,UrlsInput:i,Paste:j,MiniLogin:k}},{requires:["./auth/auth","./filedrop/filedrop","./imageZoom/imageZoom","./imgcrop/imgcrop","./preview/preview","./proBars/proBars","./tagConfig/tagConfig","./urlsInput/urlsInput","./paste/paste","./miniLogin/miniLogin"]});