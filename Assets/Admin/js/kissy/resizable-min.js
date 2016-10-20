/*
Copyright 2014, KISSY v1.50
MIT Licensed
build time: Mar 13 18:02
*/
KISSY.add("resizable",["node","base","dd"],function(q,p){function u(a){var b=a.dds,k=a.get("node"),h=a.get("handlers"),m,n=a.get("dragConfig"),e=a.get("prefixCls")+v;for(d=0;d<h.length;d++){var c=h[d],i=r('<div class="'+e+" "+e+"-"+c+'"></div>').prependTo(k,void 0),i=b[c]=new w(q.mix({node:i,cursor:null,groups:!1},n));(function(b,c){c.on("drag",function(c){var k=c.target,e=a._width,h=a._height,i=a.get("minWidth"),j=a.get("maxWidth"),n=a.get("minHeight"),g=a.get("maxHeight"),f={},c=l[b](i,j,n,g,a._top,
a._left,e,h,c.deltaY,c.deltaX,m);for(d=0;d<s.length;d++)c[d]&&(f[s[d]]=c[d]);a.fire("beforeResize",{handler:b,dd:k,region:f})});c.on("dragstart",function(){m=a.get("preserveRatio");a._width=k.width();a._top=parseInt(k.css("top"),10);a._left=parseInt(k.css("left"),10);a._height=k.height();a.fire("resizeStart",{handler:b,dd:c})});c.on("dragend",function(){a.fire("resizeEnd",{handler:b,dd:c})})})(c,i)}}var g=p("node"),f=p("base"),o=p("dd"),r=g.all,d,w=o.Draggable,v="resizable-handler",o=["l","r"],t=
["t","b"],s=["width","height","top","left"],l={t:function(a,b,d,h,m,n,e,c,i,g,j){a=Math.min(Math.max(d,c-i),h);b=0;j&&(b=a/c*e);return[b,a,m+c-a,0]},b:function(a,b,d,h,m,g,e,c,i,f,j){a=Math.min(Math.max(d,c+i),h);b=0;j&&(b=a/c*e);return[b,a,0,0]},r:function(a,b,d,h,m,g,e,c,i,f,j){a=Math.min(Math.max(a,e+f),b);b=0;j&&(b=a/e*c);return[a,b,0,0]},l:function(a,b,d,h,g,f,e,c,i,l,j){a=Math.min(Math.max(a,e-l),b);b=0;j&&(b=a/e*c);return[a,b,0,f+e-a]}};for(d=0;d<o.length;d++)for(g=0;g<t.length;g++)(function(a,
b){l[a+b]=l[b+a]=function(){var f=l[a].apply(this,arguments),h=l[b].apply(this,arguments),g=[];for(d=0;d<f.length;d++)g[d]=f[d]||h[d];return g}})(o[d],t[g]);f=f.extend({initializer:function(){this.dds={};this.publish("beforeResize",{defaultFn:this._onBeforeResize,defaultTargetOnly:!0})},_onBeforeResize:function(a){this.get("node").css(a.region);this.fire("resize",{handler:a.hc,dd:a.dd,region:a.region})},_onSetNode:function(){u(this)},_onSetDisabled:function(a){q.each(this.dds,function(b){b.set("disabled",
a)})},destructor:function(){var a,b=this.dds;for(a in b)b[a].destroy(),b[a].get("node").remove(),delete b[a]}},{name:"Resizable",ATTRS:{node:{setter:function(a){return r(a)}},dragConfig:{},prefixCls:{value:"ks-"},disabled:{},minWidth:{value:0},minHeight:{value:0},maxWidth:{value:Number.MAX_VALUE},maxHeight:{value:Number.MAX_VALUE},preserveRatio:{value:!1},handlers:{value:[]}}});f.Handler={B:"b",T:"t",L:"l",R:"r",BL:"bl",TL:"tl",BR:"br",TR:"tr"};return f});