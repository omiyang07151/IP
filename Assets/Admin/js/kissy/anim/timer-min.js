/*
Copyright 2014, KISSY v1.50
MIT Licensed
build time: Mar 14 15:39
*/
KISSY.add("anim/timer/easing",[],function(){function j(a){return a}function e(a,b,f,k){var h=3*a-3*f+1,c=3*f-6*a,d=3*a,g=3*b-3*k+1,i=3*k-6*b,j=3*b;return function(a){a:{for(var b=a,l,f,k=0;8>k;k++){f=((h*b+c)*b+d)*b-a;if(m(f)<o){a=b;break a}l=(3*h*b+2*c)*b+d;if(m(l)<o)break;b-=f/l}l=1;k=0;for(b=a;l>k;){f=((h*b+c)*b+d)*b-a;if(m(f)<o)break;0<f?l=b:k=b;b=(l+k)/2}a=b}return((g*a+i)*a+j)*a}}var g=Math.PI,i=Math.pow,b=Math.sin,c=parseFloat,d=/^cubic-bezier\(([^,]+),([^,]+),([^,]+),([^,]+)\)$/i,n={swing:function(a){return-Math.cos(a*
g)/2+0.5},easeNone:j,linear:j,easeIn:function(a){return a*a},ease:e(0.25,0.1,0.25,1),"ease-in":e(0.42,0,1,1),"ease-out":e(0,0,0.58,1),"ease-in-out":e(0.42,0,0.58,1),"ease-out-in":e(0,0.42,1,0.58),toFn:function(a){var b;return(b=a.match(d))?e(c(b[1]),c(b[2]),c(b[3]),c(b[4])):n[a]||j},easeOut:function(a){return(2-a)*a},easeBoth:function(a){return 1>(a*=2)?0.5*a*a:0.5*(1- --a*(a-2))},easeInStrong:function(a){return a*a*a*a},easeOutStrong:function(a){return 1- --a*a*a*a},easeBothStrong:function(a){return 1>
(a*=2)?0.5*a*a*a*a:0.5*(2-(a-=2)*a*a*a)},elasticIn:function(a){return 0===a||1===a?a:-(i(2,10*(a-=1))*b(2*(a-0.075)*g/0.3))},elasticOut:function(a){return 0===a||1===a?a:i(2,-10*a)*b(2*(a-0.075)*g/0.3)+1},elasticBoth:function(a){return 0===a||2===(a*=2)?a:1>a?-0.5*i(2,10*(a-=1))*b(2*(a-0.1125)*g/0.45):0.5*i(2,-10*(a-=1))*b(2*(a-0.1125)*g/0.45)+1},backIn:function(a){1===a&&(a-=0.001);return a*a*(2.70158*a-1.70158)},backOut:function(a){return(a-=1)*a*(2.70158*a+1.70158)+1},backBoth:function(a){var b,
f=(b=2.5949095)+1;return 1>(a*=2)?0.5*a*a*(f*a-b):0.5*((a-=2)*a*(f*a+b)+2)},bounceIn:function(a){return 1-n.bounceOut(1-a)},bounceOut:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375},bounceBoth:function(a){return 0.5>a?0.5*n.bounceIn(2*a):0.5*n.bounceOut(2*a-1)+0.5}},o=1.0E-6,m=Math.abs;return n});
KISSY.add("anim/timer/manager",[],function(j){var e=j.stamp,g,i;g=function(b){return setTimeout(b,15)};i=function(b){clearTimeout(b)};return{runnings:{},timer:null,start:function(b){var c=e(b);this.runnings[c]||(this.runnings[c]=b,this.startTimer())},stop:function(b){this.notRun(b)},notRun:function(b){delete this.runnings[e(b)];j.isEmptyObject(this.runnings)&&this.stopTimer()},pause:function(b){this.notRun(b)},resume:function(b){this.start(b)},startTimer:function(){var b=this;b.timer||(b.timer=g(function d(){b.runFrames()?
b.stopTimer():b.timer=g(d)}))},stopTimer:function(){var b=this.timer;b&&(i(b),this.timer=0)},runFrames:function(){var b,c,d=this.runnings;for(b in d)d[b].frame();for(b in d){c=0;break}return void 0===c}}});
KISSY.add("anim/timer/fx",["dom"],function(j,e){function g(b){j.mix(this,b);this.pos=0;this.unit=this.unit||""}var i=e("dom");g.prototype={isCustomFx:0,constructor:g,load:function(b){j.mix(this,b);this.pos=0;this.unit=this.unit||""},frame:function(b){if(1!==this.pos){var c=this.anim,d=this.prop,g=c.node,e=this.from,m=this.propData,a=this.to;if(void 0===b)var l=j.now(),b=m.duration,l=l-c.startTime-m.delay,b=0>=l?0:l>=b?1:m.easing(l/b);this.pos=b;e===a||0===b||(this.val=e=this.interpolate(e,a,this.pos),
m.frame?m.frame.call(this,c,this):this.isCustomFx||(void 0===e?(this.pos=1,e=a):e+=this.unit,this.val=e,"attr"===this.type?i.attr(g,d,e,!0):i.css(g,d,e)))}},interpolate:function(b,c,d){if("number"===typeof b&&"number"===typeof c)return Math.round(1E5*(b+(c-b)*d))/1E5},cur:function(){var b=this.prop,c,d,g=this.anim.node;if(this.isCustomFx)return g[b]||0;if(!(c=this.type))c=this.type=(!g.style||null==g.style[b])&&null!=i.attr(g,b,void 0,1)?"attr":"css";b="attr"===c?i.attr(g,b,void 0,1):i.css(g,b);return isNaN(d=
parseFloat(b))?!b||"auto"===b?0:b:d}};g.Factories={};g.FxTypes={};g.getFx=function(b){var c=g,d,e;if(d=b.fxType)c=g.FxTypes[d];else if(!b.isCustomFx&&(e=g.Factories[b.prop]))c=e;return new c(b)};return g});
KISSY.add("anim/timer/color",["./fx"],function(j,e){function g(b){var b=b+"",f;if(f=b.match(o))return[parseInt(f[1],10),parseInt(f[2],10),parseInt(f[3],10)];if(f=b.match(m))return[parseInt(f[1],10),parseInt(f[2],10),parseInt(f[3],10),parseInt(f[4],10)];if(f=b.match(a)){for(b=1;b<f.length;b++)2>f[b].length&&(f[b]+=f[b]);return[parseInt(f[1],c),parseInt(f[2],c),parseInt(f[3],c)]}return n[b=b.toLowerCase()]?n[b]:[255,255,255]}function i(){i.superclass.constructor.apply(this,arguments)}var b=e("./fx"),
c=16,d=Math.floor,n={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]},o=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,m=/^rgba\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+),\s*([0-9]+)\)$/i,a=/^#?([0-9A-F]{1,2})([0-9A-F]{1,2})([0-9A-F]{1,2})$/i;j.extend(i,b,{load:function(){i.superclass.load.apply(this,
arguments);this.from&&(this.from=g(this.from));this.to&&(this.to=g(this.to))},interpolate:function(a,b,k){var h=i.superclass.interpolate;if(3===a.length&&3===b.length)return"rgb("+[d(h(a[0],b[0],k)),d(h(a[1],b[1],k)),d(h(a[2],b[2],k))].join(", ")+")";if(4===a.length||4===b.length)return"rgba("+[d(h(a[0],b[0],k)),d(h(a[1],b[1],k)),d(h(a[2],b[2],k)),d(h(a[3]||1,b[3]||1,k))].join(", ")+")"}});j.each("backgroundColor,borderBottomColor,borderLeftColor,borderRightColor,borderTopColor,color,outlineColor".split(","),
function(a){b.Factories[a]=i});return b.FxTypes.color=i});
KISSY.add("anim/timer/transform",["dom","./fx"],function(j,e){function g(a){a=a.split(/,/);return a=j.map(a,function(a){return b(a)})}function i(){return{translateX:0,translateY:0,rotate:0,skewX:0,skewY:0,scaleX:1,scaleY:1}}function b(a){return Math.round(1E5*parseFloat(a))/1E5}function c(a){for(var a=a.split(")"),l=j.trim,f=-1,k=a.length-1,h,c,d=i();++f<k;)switch(h=a[f].split("("),c=l(h[0]),h=h[1],c){case "translateX":case "translateY":case "scaleX":case "scaleY":d[c]=b(h);break;case "rotate":case "skewX":case "skewY":var e=
b(h);j.endsWith(h,"deg")||(e=180*e/Math.PI);d[c]=e;break;case "translate":case "translate3d":h=h.split(",");d.translateX=b(h[0]);d.translateY=b(h[1]||0);break;case "scale":h=h.split(",");d.scaleX=b(h[0]);d.scaleY=b(h[1]||h[0]);break;case "matrix":return a=h,a=g(a),k=f=l=void 0,c=a[0],d=a[1],h=a[2],e=a[3],c*e-d*h?(l=Math.sqrt(c*c+d*d),k=(c*h+d*e)/(c*e-h*d),f=(c*e-d*h)/l,c*e<d*h&&(k=-k,l=-l)):l=f=k=0,{translateX:b(a[4]),translateY:b(a[5]),rotate:b(180*Math.atan2(d,c)/Math.PI),skewX:b(180*Math.atan(k)/
Math.PI),skewY:0,scaleX:b(l),scaleY:b(f)}}return d}function d(){d.superclass.constructor.apply(this,arguments)}var n=e("dom"),o=e("./fx"),m=j.Feature.isTransform3dSupported()?"translate3d({translateX}px,{translateY}px,0)":"translate({translateX}px,{translateY}px)";j.extend(d,o,{load:function(){d.superclass.load.apply(this,arguments);this.from=(this.from=n.style(this.anim.node,"transform")||this.from)&&"none"!==this.from?c(this.from):i();this.to=this.to?c(this.to):i()},interpolate:function(a,b,f){var c=
d.superclass.interpolate,h={};h.translateX=c(a.translateX,b.translateX,f);h.translateY=c(a.translateY,b.translateY,f);h.rotate=c(a.rotate,b.rotate,f);h.skewX=c(a.skewX,b.skewX,f);h.skewY=c(a.skewY,b.skewY,f);h.scaleX=c(a.scaleX,b.scaleX,f);h.scaleY=c(a.scaleY,b.scaleY,f);return j.substitute(m+" rotate({rotate}deg) skewX({skewX}deg) skewY({skewY}deg) scale({scaleX},{scaleY})",h)}});return o.Factories.transform=d});
KISSY.add("anim/timer","dom,./base,./timer/easing,./timer/manager,./timer/fx,./timer/color,./timer/transform".split(","),function(j,e){function g(b,a,c,f,d){if(!(this instanceof g))return new g(b,a,c,f,d);g.superclass.constructor.apply(this,arguments)}var i=e("dom"),b=e("./base"),c=e("./timer/easing"),d=e("./timer/manager"),n=e("./timer/fx");e("./timer/color");e("./timer/transform");var o=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i;j.extend(g,b,{prepareFx:function(){var b=this.node,a=this._propsData;j.each(a,
function(a){a.duration=a.duration*1E3;a.delay=a.delay*1E3;if(typeof a.easing==="string")a.easing=c.toFn(a.easing)});var d,f,e,h,g,p,r,u=0,q;j.isPlainObject(b)&&(u=1);for(d in a){f=a[d];e=f.value;p={isCustomFx:u,prop:d,anim:this,fxType:f.fxType,type:f.type,propData:f};r=n.getFx(p);h=e;g=r.cur();e=e+"";q="";if(e=e.match(o)){h=parseFloat(e[2]);if((q=e[3])&&q!=="px"&&g){var s=0,t=h;do{++t;i.css(b,d,t+q);s=r.cur()}while(s===0);g=t/s*g;i.css(b,d,g+q)}e[1]&&(h=(e[1]==="-="?-1:1)*h+g)}p.from=g;p.to=h;p.unit=
q;r.load(p);f.fx=r}},frame:function(){var b,a=1,d,c=this._propsData;for(b in c){d=c[b];d=d.fx;d.frame();if(this.isRejected()||this.isResolved())return;a=a&d.pos===1}c=j.now();b=this.config.duration*1E3;c=Math.max(0,this.startTime+b-c);this.defer.notify([this,1-(c/b||0),c]);a&&this.stop(a)},doStop:function(b){var a,c=this._propsData;d.stop(this);if(b)for(a in c){b=c[a];(b=b.fx)&&b.frame(1)}},doStart:function(){d.start(this)}});g.Easing=c;g.Fx=n;j.mix(g,b.Statics);return g});
