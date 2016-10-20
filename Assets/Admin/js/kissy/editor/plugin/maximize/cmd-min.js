/*
Copyright 2014, KISSY v1.50
MIT Licensed
build time: Mar 13 17:55
*/
KISSY.add("editor/plugin/maximize/cmd",["editor","event"],function(d,m){function n(a){this.editor=a}var k=m("editor"),f=m("event"),g=d.UA,l=g.ie,h=document,o=d.Node,i=d.DOM,j;d.augment(n,{restoreWindow:function(){var a=this,b=a.editor;!1!==b.fire("beforeRestoreWindow")&&a._resize&&(f.remove(window,"resize",a._resize),a._resize.stop(),a._resize=0,a._saveEditorStatus(),a._restoreState(),setTimeout(function(){a._restoreEditorStatus();b.notifySelectionChange();b.fire("afterRestoreWindow")},30))},_restoreState:function(){var a=
this.editor,b=a.get("textarea"),c=this._savedParents;if(c){for(var e=0;e<c.length;e++){var d=c[e];d.el.css("position",d.position)}this._savedParents=null}b.parent().css({height:this.iframeHeight});b.css({height:this.iframeHeight});i.css(h.body,{width:"",height:"",overflow:""});h.documentElement.style.overflow="";b=a.get("el")[0].style;b.position="static";b.width=this.editorElWidth;j.css({left:"-99999px",top:"-99999px"});window.scrollTo(this.scrollLeft,this.scrollTop);8>l&&a.get("toolBarEl").removeClass(a.get("prefixCls")+
"editor-toolbar-padding",void 0)},_saveSate:function(){var a=this.editor,b=[],c=a.get("el");this.iframeHeight=a.get("textarea").parent().style("height");this.editorElWidth=c.style("width");this.scrollLeft=i.scrollLeft();this.scrollTop=i.scrollTop();window.scrollTo(0,0);for(c=c.parent();c;){var e=c.css("position");"static"!==e&&(b.push({el:c,position:e}),c.css("position","static"));c=c.parent()}this._savedParents=b;8>l&&a.get("toolBarEl").addClass(a.get("prefixCls")+"editor-toolbar-padding",void 0)},
_saveEditorStatus:function(){var a=this.editor;this.savedRanges=null;g.gecko&&a.__iframeFocus&&(this.savedRanges=(a=a.getSelection())&&a.getRanges())},_restoreEditorStatus:function(){var a=this.editor,b=a.getSelection(),c=this.savedRanges;g.gecko&&a.activateGecko();c&&b&&b.selectRanges(c);a.__iframeFocus&&b&&(a=b.getStartElement())&&a.scrollIntoView(void 0,{alignWithTop:!1,allowHorizontalScroll:!0,onlyScrollIfNeeded:!0})},_maximize:function(a){var b=this.editor,c=b.get("el"),e=i.viewportHeight(),
d=i.viewportWidth(),f=b.get("textarea"),g=b.get("statusBarEl")?b.get("statusBarEl")[0].offsetHeight:0,b=b.get("toolBarEl")[0].offsetHeight;l?h.body.style.overflow="hidden":i.css(h.body,{width:0,height:0,overflow:"hidden"});h.documentElement.style.overflow="hidden";c.css({position:"absolute",zIndex:k.baseZIndex(k.ZIndexManager.MAXIMIZE),width:d+"px"});j.css({zIndex:k.baseZIndex(k.ZIndexManager.MAXIMIZE-5),height:e+"px",width:d+"px"});c.offset({left:0,top:0});j.css({left:0,top:0});f.parent().css({height:e-
g-b+"px"});f.css({height:e-g-b+"px"});!0!==a&&arguments.callee.call(this,!0)},_real:function(){var a=this,b=a.editor;a._resize||(a._saveEditorStatus(),a._saveSate(),a._maximize(),a._resize||(a._resize=d.buffer(function(){a._maximize();b.fire("afterMaximizeWindow")},100)),f.on(window,"resize",a._resize),setTimeout(function(){a._restoreEditorStatus();b.notifySelectionChange();b.fire("afterMaximizeWindow")},30))},maximizeWindow:function(){!1!==this.editor.fire("beforeMaximizeWindow")&&(j||(j=(new o('<iframe  style="position:absolute;top:-9999px;left:-9999px;" frameborder="0">')).prependTo(h.body,
void 0)),this._real())},destroy:function(){this._resize&&(f.remove(window,"resize",this._resize),this._resize.stop(),this._resize=0)}});return{init:function(a){if(!a.hasCommand("maximizeWindow")){var b=new n(a);a.addCommand("maximizeWindow",{exec:function(){b.maximizeWindow()}});a.addCommand("restoreWindow",{exec:function(){b.restoreWindow()}})}}}});
