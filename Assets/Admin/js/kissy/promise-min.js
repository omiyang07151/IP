/*
Copyright 2014, KISSY v1.50
MIT Licensed
build time: Mar 13 18:02
*/
KISSY.add("promise",[],function(k){function n(a){"undefined"!==typeof console&&console.error&&console.error(a)}function o(a,b,d){if(a instanceof e)p(function(){d.call(a,a[h])});else{var l=a[h],c=a[j];void 0===c&&(c=a[j]=[]);c?c.push([b,d]):q(l)?o(l,b,d):b&&p(function(){b.call(a,l)})}}function f(a){if(!(this instanceof f))return new f(a);this.promise=a||new c;this.promise.defer=this}function q(a){return a&&a instanceof c}function u(a,b){return function(){return a.apply(b,arguments)}}function c(a){if("function"===
typeof a){var b=new f(this),d=u(b.resolve,b),b=u(b.reject,b);try{a(d,b)}catch(c){n(c.stack||c),b(c)}}}function e(a){if(a instanceof e)return a;this[h]=a;this[j]=!1;this[m]=!1;return this}function g(a,b,d){function l(a){try{return b?b.call(this,a):a}catch(d){return n(d.stack||d),new e(d)}}function g(a){try{return d?d.call(this,a):new e(a)}catch(b){return n(b.stack||b),new e(b)}}function v(a){i||a instanceof c||(i=1,r.resolve(l.call(this,a)))}var r=new f,i=0;a instanceof c?o(a,v,function(a){i||(i=1,
r.resolve(g.call(this,a)))}):v(a);return r.promise}function s(a){return a&&!t(a)&&!1===a[j]&&(!q(a[h])||s(a[h]))}function t(a){return a&&(a instanceof e||a[h]instanceof e)}var h="__promise_value",p=k.setImmediate,m="__promise_progress_listeners",j="__promise_pendings";f.prototype={constructor:f,resolve:function(a){var b=this.promise,d;if(!1===(d=b[j]))return null;b[h]=a;d=d?[].concat(d):[];b[j]=!1;b[m]=!1;k.each(d,function(a){o(b,a[0],a[1])});return a},reject:function(a){return this.resolve(new e(a))},
notify:function(a){k.each(this.promise[m],function(b){p(function(){b(a)})})}};c.prototype={constructor:c,then:function(a,b,d){d&&this.progress(d);return g(this,a,b)},progress:function(a){var b=this[m];if(!1===b)return this;b||(b=this[m]=[]);b.push(a);return this},fail:function(a){return g(this,0,a)},fin:function(a){return g(this,function(b){return a(b,!0)},function(b){return a(b,!1)})},done:function(a,b){(a||b?this.then(a,b):this).fail(function(a){setTimeout(function(){throw a;},0)})},isResolved:function(){return s(this)},
isRejected:function(){return t(this)}};c.prototype["catch"]=c.prototype.fail;k.extend(e,c);KISSY.Defer=f;KISSY.Promise=c;c.Defer=f;k.mix(c,{when:g,cast:function(a){return a instanceof c?a:g(a)},resolve:function(a){return g(a)},reject:function(a){return new e(a)},isPromise:q,isResolved:s,isRejected:t,all:function(a){var b=a.length;if(!b)return null;for(var d=new f,c=0;c<a.length;c++)(function(c,e){g(c,function(c){a[e]=c;0===--b&&d.resolve(a)},function(a){d.reject(a)})})(a[c],c);return d.promise},async:function(a){return function(){function b(a,
b){var i;try{i=h[a](b)}catch(j){return new e(j)}return i.done?i.value:g(i.value,c,f)}function c(a){return b("next",a)}function f(a){return b("throw",a)}var h=a.apply(this,arguments);return c()}}});return c});