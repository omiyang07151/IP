/*
Copyright 2014, KISSY v1.50
MIT Licensed
build time: Mar 14 15:43
*/
KISSY.add("dd/plugin/proxy",["node","dd","base"],function(g,e){var h=e("node"),i=e("dd"),j=e("base"),k=i.DDM,f=".-ks-proxy"+g.now();return j.extend({pluginId:"dd/plugin/proxy",pluginInitializer:function(b){var c=this;b.on("dragstart"+f,function(){var a=c.get("node"),d=b.get("node");c.get("proxyNode")?a=c.get("proxyNode"):"function"===typeof a&&(a=a(b),a.addClass("ks-dd-proxy"),c.set("proxyNode",a));a.show();d.parent().append(a);k.cacheWH(a);a.offset(d.offset());b.setInternal("dragNode",d);b.setInternal("node",
a)}).on("dragend"+f,function(){var a=c.get("proxyNode"),d=b.get("dragNode");c.get("moveOnEnd")&&d.offset(a.offset());c.get("destroyOnEnd")?(a.remove(),c.set("proxyNode",0)):a.hide();b.setInternal("node",d)})},pluginDestructor:function(b){b.detach(f)}},{ATTRS:{node:{value:function(b){return new h(b.get("node").clone(!0))}},destroyOnEnd:{value:!1},moveOnEnd:{value:!0},proxyNode:{}}})});
