/*
Copyright 2014, KISSY v1.50
MIT Licensed
build time: Mar 13 17:58
*/
KISSY.add("editor/plugin/video",["editor","./flash-common/utils","./flash-common/base-class","./fake-objects","./button"],function(l,d){function f(c){this.config=c}var m=d("editor"),j=d("./flash-common/utils"),n=d("./flash-common/base-class"),o=d("./fake-objects");d("./button");l.augment(f,{pluginRenderUI:function(c){function d(b){for(var a=0;a<h.length;a++){var e=h[a];if(e.reg.test(b))return e}}o.init(c);var g=c.htmlDataProcessor,f=g&&g.dataFilter,h=[],i=this.config;i.providers&&h.push.apply(h,i.providers);
i.getProvider=d;f&&f.addRules({tags:{object:function(b){var a=b.getAttribute("classid"),e=b.childNodes;if(!a){for(a=0;a<e.length;a++)if("embed"===e[a].nodeName){if(!j.isFlashEmbed(e[a]))break;if(d(e[a].getAttribute("src")))return g.createFakeParserElement(b,"ke_video","video",!0)}return null}for(a=0;a<e.length;a++){var c=e[a];if("param"===c.nodeName&&"movie"===c.getAttribute("name").toLowerCase()&&d(c.getAttribute("value")||c.getAttribute("VALUE")))return g.createFakeParserElement(b,"ke_video","video",
!0)}},embed:function(b){if(!j.isFlashEmbed(b))return null;if(d(b.getAttribute("src")))return g.createFakeParserElement(b,"ke_video","video",!0)}}},4);var k=new n({editor:c,cls:"ke_video",type:"video",pluginConfig:this.config,bubbleId:"video",contextMenuId:"video",contextMenuHandlers:{"\u89c6\u9891\u5c5e\u6027":function(){var b=this.get("editorSelectedEl");b&&k.show(b)}}});c.addButton("video",{tooltip:"\u63d2\u5165\u89c6\u9891",listeners:{click:function(){k.show()}},mode:m.Mode.WYSIWYG_MODE})}});return f});
