/*
Copyright 2014, KISSY v1.50
MIT Licensed
build time: Mar 13 17:48
*/
KISSY.add("component/control/process",["base"],function(e,d){var n=d("base"),j=n.prototype.__getHook,l=e.noop,c=n.extend({bindInternal:l,syncInternal:l,renderUI:l,syncUI:l,bindUI:l,create:function(){this.get("created")||(this.fire("beforeCreateDom"),this.createDom(),this.__callPluginsMethod("pluginCreateDom"),this.fire("afterCreateDom"),this.setInternal("created",!0));return this},render:function(){this.get("rendered")||(this.create(),this.fire("beforeRenderUI"),this.renderUI(),this.__callPluginsMethod("pluginRenderUI"),
this.fire("afterRenderUI"),this.fire("beforeBindUI"),c.superclass.bindInternal.call(this),this.bindUI(),this.__callPluginsMethod("pluginBindUI"),this.fire("afterBindUI"),this.fire("beforeSyncUI"),c.superclass.syncInternal.call(this),this.syncUI(),this.__callPluginsMethod("pluginSyncUI"),this.fire("afterSyncUI"),this.setInternal("rendered",!0));return this},plug:function(c){var e=this.get("plugins");this.callSuper(c);c=e[e.length-1];this.get("rendered")?(c.pluginCreateDom&&c.pluginCreateDom(this),
c.pluginRenderUI&&c.pluginCreateDom(this),c.pluginBindUI&&c.pluginBindUI(this),c.pluginSyncUI&&c.pluginSyncUI(this)):this.get("created")&&c.pluginCreateDom&&c.pluginCreateDom(this);return this}},{__hooks__:{createDom:j("__createDom"),renderUI:j("__renderUI"),bindUI:j("__bindUI"),syncUI:j("__syncUI")},name:"ControlProcess",ATTRS:{rendered:{value:!1},created:{value:!1}}});return c});
KISSY.add("component/control/render-xtpl",[],function(e,d,n,j){e=function(e,c,d,h){var g=c.escapeHtml,f=this.utils.callCommand,a=this.nativeCommands.each,c='<div id="',b=e.resolve(["id"]),c=c+g(b),c=c+'"\n class="',h=f(this,e,h,"getBaseCssClasses",2),c=c+g(h),c=c+"\n",h={},f=[],b=e.resolve(["elCls"]);f.push(b);h.params=f;h.fn=function(a){var b;b="\n ";a=a.resolve(["this"]);b+=g(a);return b+"\n"};c+=a.call(this,e,h,d);c+='\n"\n\n';h={};f=[];b=e.resolve(["elAttrs"]);f.push(b);h.params=f;h.fn=function(a){var b;
b="\n ";var c=a.resolve(["xindex"]);b+=g(c);b+='="';a=a.resolve(["this"]);b+=g(a);return b+'"\n'};c+=a.call(this,e,h,d);c+='\n\nstyle="\n';h={};f=[];b=e.resolve(["elStyle"]);f.push(b);h.params=f;h.fn=function(a){var b;b="\n ";var c=a.resolve(["xindex"]);b+=g(c);b+=":";a=a.resolve(["this"]);b+=g(a);return b+";\n"};c+=a.call(this,e,h,d);return c+'\n">'};e.TPL_NAME=j.name;return e});
KISSY.add("component/control/render",["base","node","xtemplate/runtime","./render-xtpl","component/manager"],function(e,d){function n(k){"number"===typeof k&&(k+="px");return k}function j(k){k||(k=[""]);"string"===typeof k&&(k=k.split(/\s+/));return k}function l(k,a,b){for(var c="",e=0,f=b.length,a=k+a;e<f;e++)k=(k=b[e])?"-"+k:k,c+=" "+a+k;return c}function c(a){var i;a.target===this.control&&(i=this[o+a.type.slice(5).slice(0,-6)],i.call(this,a.newVal,a))}function m(a,i){return this.config.view.getBaseCssClasses(i&&
i.params[0])}function h(a,i){return this.config.view.getBaseCssClass(i.params[0])}var g=d("base"),f=g.prototype.__getHook,a=e.noop,b=d("node"),q=d("xtemplate/runtime"),r=d("./render-xtpl"),s=d("component/manager"),o="_onSet",p=e.trim,t=b.all,u=e.UA,v=e.Env.host.document;return g.extend({bindInternal:a,syncInternal:a,isRender:!0,create:function(){var a=this.control.get("srcNode");a?this.decorateDom(a):this.createDom()},beforeCreateDom:function(a){var i=this.control,b,c,e,f=i.get("elAttrs"),h=i.get("elCls"),
d;b=i.getAttrs();d=i.get("elStyle");var g=i.get("elCls");for(c in b)e=b[c],e.view&&(a[c]=i.get(c));b=a.width;c=a.height;e=a.visible;a=a.zIndex;b&&(d.width=n(b));c&&(d.height=n(c));a&&(d["z-index"]=a);e||g.push(this.getBaseCssClasses("hidden"));if(d=i.get("disabled"))h.push(this.getBaseCssClasses("disabled")),f["aria-disabled"]="true";i.get("highlighted")&&h.push(this.getBaseCssClasses("hover"));i.get("focusable")&&(9>u.ieMode&&(f.hideFocus="true"),f.tabindex=d?"-1":"0")},createDom:function(){this.beforeCreateDom(this.renderData=
{},this.childrenElSelectors={},this.renderCommands={getBaseCssClasses:m,getBaseCssClass:h});var a=this.control,b;b=this.renderTpl(r)+this.renderTpl(this.get("contentTpl"))+"</div>";a.setInternal("el",this.$el=t(b));this.el=this.$el[0];this.fillChildrenElsBySelectors()},decorateDom:function(a){var b=this.control;a.attr("id")||a.attr("id",b.get("id"));var c=this.constructor.HTML_PARSER,f,d;for(f in c)d=c[f],"function"===typeof d?(d=d.call(this,a),void 0!==d&&b.setInternal(f,d)):"string"===typeof d?
b.setInternal(f,a.one(d)):e.isArray(d)&&d[0]&&b.setInternal(f,a.all(d[0]));b.setInternal("el",this.$el=a);this.el=a[0]},renderUI:function(){var a=this.control,b=this.$el;if(!a.get("srcNode")){var c=a.get("render");(a=a.get("elBefore"))?b.insertBefore(a,void 0):c?b.appendTo(c,void 0):b.appendTo(v.body,void 0)}},bindUI:function(){var a=this.control,b=a.getAttrs(),d,f;for(d in b){f=b[d];var h=e.ucfirst(d),g=this[o+h];if(f.view&&g)a.on("after"+h+"Change",c,this)}},syncUI:a,destructor:function(){this.$el&&
this.$el.remove()},$:function(a){return this.$el.all(a)},fillChildrenElsBySelectors:function(a){var b=this.$el,c=this.control,d,f,a=a||this.childrenElSelectors;for(d in a)f=a[d],"function"===typeof f?c.setInternal(d,f(b)):c.setInternal(d,this.$(e.substitute(f,this.renderData))),delete a[d]},renderTpl:function(a,b,c){b=b||this.renderData;c=c||this.renderCommands;return(new (this.get("xtemplate"))(a,{control:this.control,view:this,commands:c})).render(b)},getComponentConstructorByNode:function(a,b){var c=
b[0].className;return c?(c=c.replace(RegExp("\\b"+a,"ig"),""),s.getConstructorByXClass(c)):null},getComponentCssClasses:function(){if(this.componentCssClasses)return this.componentCssClasses;for(var a=this.control.constructor,b,c=[];a&&!a.prototype.hasOwnProperty("isControl");)(b=a.xclass)&&c.push(b),a=a.superclass&&a.superclass.constructor;return this.componentCssClasses=c},getBaseCssClasses:function(a){for(var a=j(a),b=this.getComponentCssClasses(),c=0,d=this.get("control"),e="",f=b.length,d=d.get("prefixCls");c<
f;c++)e+=l(d,b[c],a);return p(e)},getBaseCssClass:function(a){return p(l(this.control.get("prefixCls"),this.getComponentCssClasses()[0],j(a)))},getKeyEventTarget:function(){return this.$el},_onSetWidth:function(a){this.$el.width(a)},_onSetHeight:function(a){this.$el.height(a)},_onSetContent:function(a){var b=this.$el;b.html(a);this.get("allowTextSelection")||b.unselectable()},_onSetVisible:function(a){var b=this.$el,c=this.getBaseCssClasses("hidden");a?b.removeClass(c):b.addClass(c)},_onSetHighlighted:function(a){var b=
this.getBaseCssClasses("hover");this.$el[a?"addClass":"removeClass"](b)},_onSetDisabled:function(a){var b=this.control,c=this.getBaseCssClasses("disabled");this.$el[a?"addClass":"removeClass"](c).attr("aria-disabled",a);b.get("focusable")&&this.getKeyEventTarget().attr("tabindex",a?-1:0)},_onSetActive:function(a){var b=this.getBaseCssClasses("active");this.$el[a?"addClass":"removeClass"](b).attr("aria-pressed",!!a)},_onSetFocused:function(a){var b=this.$el,c=this.getBaseCssClasses("focused");b[a?
"addClass":"removeClass"](c)},_onSetZIndex:function(a){this.$el.css("z-index",a)}},{__hooks__:{createDom:f("__createDom"),renderUI:f("__renderUI"),bindUI:f("__bindUI"),syncUI:f("__syncUI"),decorateDom:f("__decorateDom"),beforeCreateDom:f("__beforeCreateDom")},extend:function i(a,b,c){var d,f={};d=g.extend.apply(this,arguments);d.HTML_PARSER=d.HTML_PARSER||{};e.isArray(a)&&(e.each(a.concat(d),function(a){a&&e.each(a.HTML_PARSER,function(a,b){f[b]=a})}),d.HTML_PARSER=f);e.mix(d.HTML_PARSER,this.HTML_PARSER,
!1);d.extend=i;return d},ATTRS:{control:{setter:function(a){this.control=a}},xtemplate:{value:q},contentTpl:{value:function(a){return a.get("content")||""}}},HTML_PARSER:{id:function(a){return(a=a[0].id)?a:void 0},content:function(a){return a.html()},disabled:function(a){return a.hasClass(this.getBaseCssClass("disabled"))}},name:"render"})});
KISSY.add("component/control",["node","./control/process","component/manager","./control/render"],function(e,d){function n(){var a,b=this;do a=b.ATTRS,b=b.superclass;while(!a||!a.xrender);return a.xrender.value}var j=d("node"),l=d("./control/process"),c=d("component/manager"),m=d("./control/render"),h=e.UA.ieMode,g=j.Gesture,f=e.Feature.isTouchGestureSupported(),m=l.extend({isControl:!0,createDom:function(){var a=this.get("xrender"),b=this.get("view"),d=this.get("id");b?b.set("control",this):this.set("view",
this.view=b=new a({control:this}));b.create();a=b.getKeyEventTarget();this.get("allowTextSelection")||a.unselectable();c.addComponent(d,this)},renderUI:function(){this.view.renderUI();this.view.bindUI()},bindUI:function(){var a=this.view.getKeyEventTarget();if(this.get("focusable"))a.on("focus",this.handleFocus,this).on("blur",this.handleBlur,this).on("keydown",this.handleKeydown,this);if(this.get("handleGestureEvents")){a=this.$el;a.on("mouseenter",this.handleMouseEnter,this).on("mouseleave",this.handleMouseLeave,
this).on("contextmenu",this.handleContextMenu,this);a.on(g.start,this.handleMouseDown,this).on(g.end,this.handleMouseUp,this).on(g.tap,this.handleClick,this);if(g.cancel)a.on(g.cancel,this.handleMouseUp,this);if(9>h)a.on("dblclick",this.handleDblClick,this)}},syncUI:function(){this.view.syncUI()},destructor:function(){c.removeComponent(this.get("id"));this.view?this.view.destroy():this.get("srcNode")&&this.get("srcNode").remove()},createComponent:function(a,b){return c.createComponent(a,b||this)},
_onSetFocused:function(a){var b=this.view.getKeyEventTarget()[0];if(a)try{b.focus()}catch(c){}else b.ownerDocument.activeElement===b&&b.ownerDocument.body.focus()},_onSetX:function(a){this.$el.offset({left:a})},_onSetY:function(a){this.$el.offset({top:a})},_onSetVisible:function(a){this.fire(a?"show":"hide")},show:function(){this.render();this.set("visible",!0);return this},hide:function(){this.set("visible",!1);return this},focus:function(){this.get("focusable")&&this.set("focused",!0)},blur:function(){this.get("focusable")&&
this.set("focused",!1)},move:function(a,b){this.set({x:a,y:b})},handleDblClick:function(a){this.get("disabled")||this.handleDblClickInternal(a)},handleDblClickInternal:function(a){this.handleClickInternal(a)},handleMouseEnter:function(a){this.get("disabled")||this.handleMouseEnterInternal(a)},handleMouseEnterInternal:function(a){this.set("highlighted",!!a)},handleMouseLeave:function(a){this.get("disabled")||this.handleMouseLeaveInternal(a)},handleMouseLeaveInternal:function(a){this.set("active",!1);
this.set("highlighted",!a)},handleMouseDown:function(a){this.get("disabled")||this.handleMouseDownInternal(a)},handleMouseDownInternal:function(a){var b;if(1===a.which||f)this.get("activeable")&&this.set("active",!0),this.get("focusable")&&this.focus(),!this.get("allowTextSelection")&&"mouse"===a.gestureType&&(b=(b=a.target.nodeName)&&b.toLowerCase(),"input"!==b&&"textarea"!==b&&"button"!==b&&a.preventDefault())},handleMouseUp:function(a){this.get("disabled")||this.handleMouseUpInternal(a)},handleMouseUpInternal:function(a){this.get("active")&&
(1===a.which||f)&&this.set("active",!1)},handleContextMenu:function(a){this.get("disabled")||this.handleContextMenuInternal(a)},handleContextMenuInternal:function(){},handleFocus:function(){this.get("disabled")||this.handleFocusInternal()},handleFocusInternal:function(){this.focus();this.fire("focus")},handleBlur:function(){this.get("disabled")||this.handleBlurInternal()},handleBlurInternal:function(){this.blur();this.fire("blur")},handleKeydown:function(a){if(!this.get("disabled")&&this.handleKeyDownInternal(a))return a.halt(),
!0},handleKeyDownInternal:function(a){if(a.keyCode===j.KeyCode.ENTER)return this.handleClickInternal(a)},handleClick:function(a){this.get("disabled")||this.handleClickInternal(a)},handleClickInternal:function(){this.get("focusable")&&this.focus()}},{name:"control",ATTRS:{id:{view:1,valueFn:function(){return e.guid("ks-component")}},content:{view:1,value:""},width:{view:1},height:{view:1},elCls:{view:1,value:[],setter:function(a){"string"===typeof a&&(a=a.split(/\s+/));return a||[]}},elStyle:{view:1,
value:{}},elAttrs:{view:1,value:{}},elBefore:{},el:{setter:function(a){this.$el=a;this.el=a[0]}},x:{},y:{},xy:{setter:function(a){var b=e.makeArray(a);b.length&&(void 0!==b[0]&&this.set("x",b[0]),void 0!==b[1]&&this.set("y",b[1]));return a},getter:function(){return[this.get("x"),this.get("y")]}},zIndex:{view:1},render:{},visible:{sync:0,value:!0,view:1},srcNode:{setter:function(a){return j.all(a)}},handleGestureEvents:{value:!0},focusable:{value:!0,view:1},allowTextSelection:{value:!1},activeable:{value:!0},
focused:{view:1},active:{view:1,value:!1},highlighted:{view:1,value:!1},prefixCls:{view:1,value:e.config("component/prefixCls")||"ks-"},prefixXClass:{},parent:{setter:function(a,b){(b=this.get("parent"))&&this.removeTarget(b);a&&this.addTarget(a)}},disabled:{view:1,value:!1},xrender:{value:m},view:{setter:function(a){this.view=a}}}});m.getDefaultRender=n;m.extend=function b(d,f,h){var g=e.makeArray(arguments),j,m=g[g.length-1];if(m&&(j=m.xclass))m.name=j;g=l.extend.apply(this,g);j&&c.setConstructorByXClass(j,
g);g.extend=b;g.getDefaultRender=n;return g};return m});
