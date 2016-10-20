/*
Copyright 2014, KISSY v1.50
MIT Licensed
build time: Mar 17 21:36
*/
KISSY.add("xtemplate/compiler/parser",[],function(b,a){var d={},e=KISSY,g=function(a){this.rules=[];e.mix(this,a);this.resetInput(this.input)};g.prototype={constructor:function(a){this.rules=[];e.mix(this,a);this.resetInput(this.input)},resetInput:function(a,c){e.mix(this,{input:a,filename:c,matched:"",stateStack:[g.STATIC.INITIAL],match:"",text:"",firstLine:1,lineNumber:1,lastLine:1,firstColumn:1,lastColumn:1})},genShortId:function(a){a+="__gen";a in this||(this[a]=-1);var a=this[a]+=1,c="";do c=
String.fromCharCode(97+a%26)+c,a=Math.floor(a/26)-1;while(0<=a);return c},getCurrentRules:function(){var a=this.stateStack[this.stateStack.length-1],c=[],a=this.mapState(a);e.each(this.rules,function(d){var b=d.state||d[3];b?e.inArray(a,b)&&c.push(d):a===g.STATIC.INITIAL&&c.push(d)});return c},pushState:function(a){this.stateStack.push(a)},popState:function(){return this.stateStack.pop()},getStateStack:function(){return this.stateStack},showDebugInfo:function(){var a=g.STATIC.DEBUG_CONTEXT_LIMIT,
c=this.matched,d=this.match,b=this.input,c=c.slice(0,c.length-d.length),c=(c.length>a?"...":"")+c.slice(-a).replace(/\n/," "),d=d+b,d=d.slice(0,a)+(d.length>a?"...":"");return c+d+"\n"+Array(c.length+1).join("-")+"^"},mapSymbol:function(a){var c=this.symbolMap;return!c?a:c[a]||(c[a]=this.genShortId("symbol"))},mapReverseSymbol:function(a){var c=this.symbolMap,d,b=this.reverseSymbolMap;if(!b&&c)for(d in b=this.reverseSymbolMap={},c)b[c[d]]=d;return b?b[a]:a},mapState:function(a){var c=this.stateMap;
return!c?a:c[a]||(c[a]=this.genShortId("state"))},lex:function(){var d=this.input,c,b,m,h=this.getCurrentRules();this.match=this.text="";if(!d)return this.mapSymbol(g.STATIC.END_TAG);for(c=0;c<h.length;c++){b=h[c];var i=b.token||b[0];m=b.action||b[2]||a;if(b=d.match(b.regexp||b[1])){if(c=b[0].match(/\n.*/g))this.lineNumber+=c.length;e.mix(this,{firstLine:this.lastLine,lastLine:this.lineNumber+1,firstColumn:this.lastColumn,lastColumn:c?c[c.length-1].length-1:this.lastColumn+b[0].length});c=this.match=
b[0];this.matches=b;this.text=c;this.matched+=c;m=m&&m.call(this);m=m===a?i:this.mapSymbol(m);this.input=d=d.slice(c.length);return m?m:this.lex()}}return a}};g.STATIC={INITIAL:"I",DEBUG_CONTEXT_LIMIT:20,END_TAG:"$EOF"};var f=new g({rules:[[0,/^[\s\S]*?(?={{)/,function(){var a=this.text,b,d=0;if(b=a.match(/\\+$/))d=b[0].length;d%2?(this.pushState("et"),a=a.slice(0,-1)):this.pushState("t");d&&(a=a.replace(/\\+$/g,function(a){return Array(a.length/2+1).join("\\")}));this.text=a;return"CONTENT"}],["b",
/^[\s\S]+/,0],["b",/^[\s\S]{2,}?(?:(?={{)|$)/,function(){this.popState()},["et"]],["c",/^{{(?:#|@|\^)/,0,["t"]],["d",/^{{\//,0,["t"]],["e",/^{{\s*else\s*}}/,function(){this.popState()},["t"]],[0,/^{{![\s\S]*?}}/,function(){this.popState()},["t"]],["b",/^{{%([\s\S]*?)%}}/,function(){this.text=this.matches[1]||"";this.popState()},["t"]],["f",/^{{{?/,0,["t"]],[0,/^\s+/,0,["t"]],["g",/^,/,0,["t"]],["h",/^}}}?/,function(){this.popState()},["t"]],["i",/^\(/,0,["t"]],["j",/^\)/,0,["t"]],["k",/^\|\|/,0,["t"]],
["l",/^&&/,0,["t"]],["m",/^===/,0,["t"]],["n",/^!==/,0,["t"]],["o",/^>=/,0,["t"]],["p",/^<=/,0,["t"]],["q",/^>/,0,["t"]],["r",/^</,0,["t"]],["s",/^\+/,0,["t"]],["t",/^-/,0,["t"]],["u",/^\*/,0,["t"]],["v",/^\//,0,["t"]],["w",/^%/,0,["t"]],["x",/^!/,0,["t"]],["y",/^"(\\[\s\S]|[^\\"])*"/,function(){this.text=this.text.slice(1,-1).replace(/\\"/g,'"')},["t"]],["y",/^'(\\[\s\S]|[^\\'])*'/,function(){this.text=this.text.slice(1,-1).replace(/\\'/g,"'")},["t"]],["z",/^true/,0,["t"]],["z",/^false/,0,["t"]],
["aa",/^\d+(?:\.\d+)?(?:e-?\d+)?/i,0,["t"]],["ab",/^=/,0,["t"]],["ac",/^\.\./,function(){this.pushState("ws")},["t"]],["ad",/^\//,function(){this.popState()},["ws"]],["ad",/^\./,0,["t"]],["ae",/^\[/,0,["t"]],["af",/^\]/,0,["t"]],["ac",/^[a-zA-Z0-9_$]+/,0,["t"]],["ag",/^./,0,["t"]]]});d.lexer=f;f.symbolMap={$EOF:"a",CONTENT:"b",OPEN_BLOCK:"c",OPEN_CLOSE_BLOCK:"d",INVERSE:"e",OPEN_TPL:"f",COMMA:"g",CLOSE:"h",LPAREN:"i",RPAREN:"j",OR:"k",AND:"l",LOGIC_EQUALS:"m",LOGIC_NOT_EQUALS:"n",GE:"o",LE:"p",GT:"q",
LT:"r",PLUS:"s",MINUS:"t",MULTIPLY:"u",DIVIDE:"v",MODULUS:"w",NOT:"x",STRING:"y",BOOLEAN:"z",NUMBER:"aa",EQUALS:"ab",ID:"ac",SEP:"ad",REF_START:"ae",REF_END:"af",INVALID:"ag",$START:"ah",program:"ai",statements:"aj",statement:"ak",command:"al",id:"am",expression:"an",params:"ao",hash:"ap",param:"aq",ConditionalOrExpression:"ar",ConditionalAndExpression:"as",EqualityExpression:"at",RelationalExpression:"au",AdditiveExpression:"av",MultiplicativeExpression:"aw",UnaryExpression:"ax",PrimaryExpression:"ay",
hashSegment:"az",idSegments:"ba"};d.productions=[["ah",["ai"]],["ai",["aj","e","aj"],function(){return new this.yy.ProgramNode(this.lexer.lineNumber,this.$1,this.$3)}],["ai",["aj"],function(){return new this.yy.ProgramNode(this.lexer.lineNumber,this.$1)}],["aj",["ak"],function(){return[this.$1]}],["aj",["aj","ak"],function(){this.$1.push(this.$2)}],["ak","c,al,h,ai,d,am,h".split(","),function(){return new this.yy.BlockStatement(this.lexer.lineNumber,this.$2,this.$4,this.$6)}],["ak",["f","an","h"],
function(){return new this.yy.ExpressionStatement(this.lexer.lineNumber,this.$2,3!==this.$1.length)}],["ak",["b"],function(){return new this.yy.ContentStatement(this.lexer.lineNumber,this.$1)}],["al","am,i,ao,g,ap,j".split(","),function(){return new this.yy.Command(this.lexer.lineNumber,this.$1,this.$3,this.$5)}],["al",["am","i","ao","j"],function(){return new this.yy.Command(this.lexer.lineNumber,this.$1,this.$3)}],["al",["am","i","ap","j"],function(){return new this.yy.Command(this.lexer.lineNumber,
this.$1,null,this.$3)}],["al",["am","i","j"],function(){return new this.yy.Command(this.lexer.lineNumber,this.$1)}],["ao",["ao","g","aq"],function(){this.$1.push(this.$3)}],["ao",["aq"],function(){return[this.$1]}],["aq",["an"]],["an",["ar"]],["ar",["as"]],["ar",["ar","k","as"],function(){return new this.yy.ConditionalOrExpression(this.$1,this.$3)}],["as",["at"]],["as",["as","l","at"],function(){return new this.yy.ConditionalAndExpression(this.$1,this.$3)}],["at",["au"]],["at",["at","m","au"],function(){return new this.yy.EqualityExpression(this.$1,
"===",this.$3)}],["at",["at","n","au"],function(){return new this.yy.EqualityExpression(this.$1,"!==",this.$3)}],["au",["av"]],["au",["au","r","av"],function(){return new this.yy.RelationalExpression(this.$1,"<",this.$3)}],["au",["au","q","av"],function(){return new this.yy.RelationalExpression(this.$1,">",this.$3)}],["au",["au","p","av"],function(){return new this.yy.RelationalExpression(this.$1,"<=",this.$3)}],["au",["au","o","av"],function(){return new this.yy.RelationalExpression(this.$1,">=",
this.$3)}],["av",["aw"]],["av",["av","s","aw"],function(){return new this.yy.AdditiveExpression(this.$1,"+",this.$3)}],["av",["av","t","aw"],function(){return new this.yy.AdditiveExpression(this.$1,"-",this.$3)}],["aw",["ax"]],["aw",["aw","u","ax"],function(){return new this.yy.MultiplicativeExpression(this.$1,"*",this.$3)}],["aw",["aw","v","ax"],function(){return new this.yy.MultiplicativeExpression(this.$1,"/",this.$3)}],["aw",["aw","w","ax"],function(){return new this.yy.MultiplicativeExpression(this.$1,
"%",this.$3)}],["ax",["x","ax"],function(){return new this.yy.UnaryExpression(this.$1,this.$2)}],["ax",["t","ax"],function(){return new this.yy.UnaryExpression(this.$1,this.$2)}],["ax",["ay"]],["ay",["al"]],["ay",["y"],function(){return new this.yy.String(this.lexer.lineNumber,this.$1)}],["ay",["aa"],function(){return new this.yy.Number(this.lexer.lineNumber,this.$1)}],["ay",["z"],function(){return new this.yy.Boolean(this.lexer.lineNumber,this.$1)}],["ay",["am"]],["ay",["i","an","j"],function(){return this.$2}],
["ap",["ap","g","az"],function(){var a=this.$3;this.$1.value[a[0]]=a[1]}],["ap",["az"],function(){var a=new this.yy.Hash(this.lexer.lineNumber),d=this.$1;a.value[d[0]]=d[1];return a}],["az",["ac","ab","an"],function(){return[this.$1,this.$3]}],["am",["ba"],function(){return new this.yy.Id(this.lexer.lineNumber,this.$1)}],["ba",["ba","ad","ac"],function(){this.$1.push(this.$3)}],["ba",["ba","ae","an","af"],function(){this.$1.push(this.$3)}],["ba",["ba","ad","aa"],function(){this.$1.push(this.$3)}],
["ba",["ac"],function(){return[this.$1]}]];d.table={gotos:{"0":{ai:4,aj:5,ak:6},2:{al:8,am:9,ba:10},3:{al:17,an:18,ar:19,as:20,at:21,au:22,av:23,aw:24,ax:25,ay:26,am:27,ba:10},5:{ak:29},11:{al:17,an:34,ar:19,as:20,at:21,au:22,av:23,aw:24,ax:25,ay:26,am:27,ba:10},12:{al:17,ax:35,ay:26,am:27,ba:10},13:{al:17,ax:36,ay:26,am:27,ba:10},28:{aj:51,ak:6},30:{ai:52,aj:5,ak:6},31:{al:17,ao:55,aq:56,an:57,ar:19,as:20,at:21,au:22,av:23,aw:24,ax:25,ay:26,ap:58,az:59,am:27,ba:10},33:{al:17,an:62,ar:19,as:20,at:21,
au:22,av:23,aw:24,ax:25,ay:26,am:27,ba:10},38:{al:17,as:64,at:21,au:22,av:23,aw:24,ax:25,ay:26,am:27,ba:10},39:{al:17,at:65,au:22,av:23,aw:24,ax:25,ay:26,am:27,ba:10},40:{al:17,au:66,av:23,aw:24,ax:25,ay:26,am:27,ba:10},41:{al:17,au:67,av:23,aw:24,ax:25,ay:26,am:27,ba:10},42:{al:17,av:68,aw:24,ax:25,ay:26,am:27,ba:10},43:{al:17,av:69,aw:24,ax:25,ay:26,am:27,ba:10},44:{al:17,av:70,aw:24,ax:25,ay:26,am:27,ba:10},45:{al:17,av:71,aw:24,ax:25,ay:26,am:27,ba:10},46:{al:17,aw:72,ax:25,ay:26,am:27,ba:10},
47:{al:17,aw:73,ax:25,ay:26,am:27,ba:10},48:{al:17,ax:74,ay:26,am:27,ba:10},49:{al:17,ax:75,ay:26,am:27,ba:10},50:{al:17,ax:76,ay:26,am:27,ba:10},51:{ak:29},77:{am:84,ba:10},78:{al:17,an:85,ar:19,as:20,at:21,au:22,av:23,aw:24,ax:25,ay:26,am:27,ba:10},79:{al:17,aq:86,an:57,ar:19,as:20,at:21,au:22,av:23,aw:24,ax:25,ay:26,ap:87,az:59,am:27,ba:10},81:{az:89}},action:{"0":{b:[1,a,1],c:[1,a,2],f:[1,a,3]},1:{a:[2,7],e:[2,7],c:[2,7],f:[2,7],b:[2,7],d:[2,7]},2:{ac:[1,a,7]},3:{i:[1,a,11],t:[1,a,12],x:[1,a,
13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},4:{a:[0]},5:{a:[2,2],d:[2,2],b:[1,a,1],c:[1,a,2],e:[1,a,28],f:[1,a,3]},6:{a:[2,3],e:[2,3],c:[2,3],f:[2,3],b:[2,3],d:[2,3]},7:{i:[2,51],ad:[2,51],ae:[2,51],h:[2,51],k:[2,51],l:[2,51],m:[2,51],n:[2,51],o:[2,51],p:[2,51],q:[2,51],r:[2,51],s:[2,51],t:[2,51],u:[2,51],v:[2,51],w:[2,51],j:[2,51],af:[2,51],g:[2,51]},8:{h:[1,a,30]},9:{i:[1,a,31]},10:{i:[2,47],h:[2,47],k:[2,47],l:[2,47],m:[2,47],n:[2,47],o:[2,47],p:[2,47],q:[2,47],r:[2,47],s:[2,47],t:[2,47],
u:[2,47],v:[2,47],w:[2,47],j:[2,47],g:[2,47],af:[2,47],ad:[1,a,32],ae:[1,a,33]},11:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},12:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},13:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},14:{h:[2,39],k:[2,39],l:[2,39],m:[2,39],n:[2,39],o:[2,39],p:[2,39],q:[2,39],r:[2,39],s:[2,39],t:[2,39],u:[2,39],v:[2,39],w:[2,39],j:[2,39],g:[2,39],af:[2,39]},15:{h:[2,41],
k:[2,41],l:[2,41],m:[2,41],n:[2,41],o:[2,41],p:[2,41],q:[2,41],r:[2,41],s:[2,41],t:[2,41],u:[2,41],v:[2,41],w:[2,41],j:[2,41],g:[2,41],af:[2,41]},16:{h:[2,40],k:[2,40],l:[2,40],m:[2,40],n:[2,40],o:[2,40],p:[2,40],q:[2,40],r:[2,40],s:[2,40],t:[2,40],u:[2,40],v:[2,40],w:[2,40],j:[2,40],g:[2,40],af:[2,40]},17:{h:[2,38],k:[2,38],l:[2,38],m:[2,38],n:[2,38],o:[2,38],p:[2,38],q:[2,38],r:[2,38],s:[2,38],t:[2,38],u:[2,38],v:[2,38],w:[2,38],j:[2,38],g:[2,38],af:[2,38]},18:{h:[1,a,37]},19:{h:[2,15],j:[2,15],
g:[2,15],af:[2,15],k:[1,a,38]},20:{h:[2,16],k:[2,16],j:[2,16],g:[2,16],af:[2,16],l:[1,a,39]},21:{h:[2,18],k:[2,18],l:[2,18],j:[2,18],g:[2,18],af:[2,18],m:[1,a,40],n:[1,a,41]},22:{h:[2,20],k:[2,20],l:[2,20],m:[2,20],n:[2,20],j:[2,20],g:[2,20],af:[2,20],o:[1,a,42],p:[1,a,43],q:[1,a,44],r:[1,a,45]},23:{h:[2,23],k:[2,23],l:[2,23],m:[2,23],n:[2,23],o:[2,23],p:[2,23],q:[2,23],r:[2,23],j:[2,23],g:[2,23],af:[2,23],s:[1,a,46],t:[1,a,47]},24:{h:[2,28],k:[2,28],l:[2,28],m:[2,28],n:[2,28],o:[2,28],p:[2,28],q:[2,
28],r:[2,28],s:[2,28],t:[2,28],j:[2,28],g:[2,28],af:[2,28],u:[1,a,48],v:[1,a,49],w:[1,a,50]},25:{h:[2,31],k:[2,31],l:[2,31],m:[2,31],n:[2,31],o:[2,31],p:[2,31],q:[2,31],r:[2,31],s:[2,31],t:[2,31],u:[2,31],v:[2,31],w:[2,31],j:[2,31],g:[2,31],af:[2,31]},26:{h:[2,37],k:[2,37],l:[2,37],m:[2,37],n:[2,37],o:[2,37],p:[2,37],q:[2,37],r:[2,37],s:[2,37],t:[2,37],u:[2,37],v:[2,37],w:[2,37],j:[2,37],g:[2,37],af:[2,37]},27:{h:[2,42],k:[2,42],l:[2,42],m:[2,42],n:[2,42],o:[2,42],p:[2,42],q:[2,42],r:[2,42],s:[2,
42],t:[2,42],u:[2,42],v:[2,42],w:[2,42],j:[2,42],g:[2,42],af:[2,42],i:[1,a,31]},28:{b:[1,a,1],c:[1,a,2],f:[1,a,3]},29:{a:[2,4],e:[2,4],c:[2,4],f:[2,4],b:[2,4],d:[2,4]},30:{b:[1,a,1],c:[1,a,2],f:[1,a,3]},31:{i:[1,a,11],j:[1,a,53],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,54]},32:{aa:[1,a,60],ac:[1,a,61]},33:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},34:{j:[1,a,63]},35:{h:[2,36],k:[2,36],l:[2,36],m:[2,36],n:[2,36],o:[2,36],p:[2,36],q:[2,36],
r:[2,36],s:[2,36],t:[2,36],u:[2,36],v:[2,36],w:[2,36],j:[2,36],g:[2,36],af:[2,36]},36:{h:[2,35],k:[2,35],l:[2,35],m:[2,35],n:[2,35],o:[2,35],p:[2,35],q:[2,35],r:[2,35],s:[2,35],t:[2,35],u:[2,35],v:[2,35],w:[2,35],j:[2,35],g:[2,35],af:[2,35]},37:{a:[2,6],e:[2,6],c:[2,6],f:[2,6],b:[2,6],d:[2,6]},38:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},39:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},40:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,
a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},41:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},42:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},43:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},44:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},45:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},46:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],
z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},47:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},48:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},49:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},50:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},51:{a:[2,1],d:[2,1],b:[1,a,1],c:[1,a,2],f:[1,a,3]},52:{d:[1,a,77]},53:{h:[2,11],k:[2,11],l:[2,11],m:[2,11],n:[2,11],o:[2,11],p:[2,11],
q:[2,11],r:[2,11],s:[2,11],t:[2,11],u:[2,11],v:[2,11],w:[2,11],j:[2,11],g:[2,11],af:[2,11]},54:{g:[2,51],i:[2,51],j:[2,51],k:[2,51],l:[2,51],m:[2,51],n:[2,51],o:[2,51],p:[2,51],q:[2,51],r:[2,51],s:[2,51],t:[2,51],u:[2,51],v:[2,51],w:[2,51],ad:[2,51],ae:[2,51],ab:[1,a,78]},55:{g:[1,a,79],j:[1,a,80]},56:{g:[2,13],j:[2,13]},57:{g:[2,14],j:[2,14]},58:{g:[1,a,81],j:[1,a,82]},59:{j:[2,45],g:[2,45]},60:{i:[2,50],ad:[2,50],ae:[2,50],h:[2,50],k:[2,50],l:[2,50],m:[2,50],n:[2,50],o:[2,50],p:[2,50],q:[2,50],
r:[2,50],s:[2,50],t:[2,50],u:[2,50],v:[2,50],w:[2,50],j:[2,50],g:[2,50],af:[2,50]},61:{i:[2,48],ad:[2,48],ae:[2,48],h:[2,48],k:[2,48],l:[2,48],m:[2,48],n:[2,48],o:[2,48],p:[2,48],q:[2,48],r:[2,48],s:[2,48],t:[2,48],u:[2,48],v:[2,48],w:[2,48],j:[2,48],g:[2,48],af:[2,48]},62:{af:[1,a,83]},63:{h:[2,43],k:[2,43],l:[2,43],m:[2,43],n:[2,43],o:[2,43],p:[2,43],q:[2,43],r:[2,43],s:[2,43],t:[2,43],u:[2,43],v:[2,43],w:[2,43],j:[2,43],g:[2,43],af:[2,43]},64:{h:[2,17],k:[2,17],j:[2,17],g:[2,17],af:[2,17],l:[1,
a,39]},65:{h:[2,19],k:[2,19],l:[2,19],j:[2,19],g:[2,19],af:[2,19],m:[1,a,40],n:[1,a,41]},66:{h:[2,21],k:[2,21],l:[2,21],m:[2,21],n:[2,21],j:[2,21],g:[2,21],af:[2,21],o:[1,a,42],p:[1,a,43],q:[1,a,44],r:[1,a,45]},67:{h:[2,22],k:[2,22],l:[2,22],m:[2,22],n:[2,22],j:[2,22],g:[2,22],af:[2,22],o:[1,a,42],p:[1,a,43],q:[1,a,44],r:[1,a,45]},68:{h:[2,27],k:[2,27],l:[2,27],m:[2,27],n:[2,27],o:[2,27],p:[2,27],q:[2,27],r:[2,27],j:[2,27],g:[2,27],af:[2,27],s:[1,a,46],t:[1,a,47]},69:{h:[2,26],k:[2,26],l:[2,26],m:[2,
26],n:[2,26],o:[2,26],p:[2,26],q:[2,26],r:[2,26],j:[2,26],g:[2,26],af:[2,26],s:[1,a,46],t:[1,a,47]},70:{h:[2,25],k:[2,25],l:[2,25],m:[2,25],n:[2,25],o:[2,25],p:[2,25],q:[2,25],r:[2,25],j:[2,25],g:[2,25],af:[2,25],s:[1,a,46],t:[1,a,47]},71:{h:[2,24],k:[2,24],l:[2,24],m:[2,24],n:[2,24],o:[2,24],p:[2,24],q:[2,24],r:[2,24],j:[2,24],g:[2,24],af:[2,24],s:[1,a,46],t:[1,a,47]},72:{h:[2,29],k:[2,29],l:[2,29],m:[2,29],n:[2,29],o:[2,29],p:[2,29],q:[2,29],r:[2,29],s:[2,29],t:[2,29],j:[2,29],g:[2,29],af:[2,29],
u:[1,a,48],v:[1,a,49],w:[1,a,50]},73:{h:[2,30],k:[2,30],l:[2,30],m:[2,30],n:[2,30],o:[2,30],p:[2,30],q:[2,30],r:[2,30],s:[2,30],t:[2,30],j:[2,30],g:[2,30],af:[2,30],u:[1,a,48],v:[1,a,49],w:[1,a,50]},74:{h:[2,32],k:[2,32],l:[2,32],m:[2,32],n:[2,32],o:[2,32],p:[2,32],q:[2,32],r:[2,32],s:[2,32],t:[2,32],u:[2,32],v:[2,32],w:[2,32],j:[2,32],g:[2,32],af:[2,32]},75:{h:[2,33],k:[2,33],l:[2,33],m:[2,33],n:[2,33],o:[2,33],p:[2,33],q:[2,33],r:[2,33],s:[2,33],t:[2,33],u:[2,33],v:[2,33],w:[2,33],j:[2,33],g:[2,
33],af:[2,33]},76:{h:[2,34],k:[2,34],l:[2,34],m:[2,34],n:[2,34],o:[2,34],p:[2,34],q:[2,34],r:[2,34],s:[2,34],t:[2,34],u:[2,34],v:[2,34],w:[2,34],j:[2,34],g:[2,34],af:[2,34]},77:{ac:[1,a,7]},78:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,7]},79:{i:[1,a,11],t:[1,a,12],x:[1,a,13],y:[1,a,14],z:[1,a,15],aa:[1,a,16],ac:[1,a,54]},80:{h:[2,9],k:[2,9],l:[2,9],m:[2,9],n:[2,9],o:[2,9],p:[2,9],q:[2,9],r:[2,9],s:[2,9],t:[2,9],u:[2,9],v:[2,9],w:[2,9],j:[2,9],g:[2,9],af:[2,9]},81:{ac:[1,
a,88]},82:{h:[2,10],k:[2,10],l:[2,10],m:[2,10],n:[2,10],o:[2,10],p:[2,10],q:[2,10],r:[2,10],s:[2,10],t:[2,10],u:[2,10],v:[2,10],w:[2,10],j:[2,10],g:[2,10],af:[2,10]},83:{i:[2,49],ad:[2,49],ae:[2,49],h:[2,49],k:[2,49],l:[2,49],m:[2,49],n:[2,49],o:[2,49],p:[2,49],q:[2,49],r:[2,49],s:[2,49],t:[2,49],u:[2,49],v:[2,49],w:[2,49],j:[2,49],g:[2,49],af:[2,49]},84:{h:[1,a,90]},85:{j:[2,46],g:[2,46]},86:{g:[2,12],j:[2,12]},87:{g:[1,a,81],j:[1,a,91]},88:{ab:[1,a,78]},89:{j:[2,44],g:[2,44]},90:{a:[2,5],e:[2,5],
c:[2,5],f:[2,5],b:[2,5],d:[2,5]},91:{h:[2,8],k:[2,8],l:[2,8],m:[2,8],n:[2,8],o:[2,8],p:[2,8],q:[2,8],r:[2,8],s:[2,8],t:[2,8],u:[2,8],v:[2,8],w:[2,8],j:[2,8],g:[2,8],af:[2,8]}}};d.parse=function(d,b){var e=this.lexer,g,h,i,f=this.table,t=f.gotos,f=f.action,v=this.productions,n=[null],j=[0];for(e.resetInput(d,b);;){g=j[j.length-1];h||(h=e.lex());if(!h)return!1;i=f[g]&&f[g][h];if(!i){h=[];if(f[g])for(var o in f[g])h.push(this.lexer.mapReverseSymbol(o));e.showDebugInfo();h.join(", ");return!1}switch(i[0]){case 1:j.push(h);
n.push(e.text);j.push(i[2]);h=null;break;case 2:var l=v[i[1]];g=l.symbol||l[0];i=l.action||l[2];var k=(l.rhs||l[1]).length,p=0,s,l=n[n.length-k];s=a;for(this.$$=l;p<k;p++)this["$"+(k-p)]=n[n.length-1-p];i&&(s=i.call(this));l=s!==a?s:this.$$;k&&(j=j.slice(0,-2*k),n=n.slice(0,-1*k));j.push(g);n.push(l);j.push(t[j[j.length-2]][j[j.length-1]]);break;case 0:return l}}return a};return d});
KISSY.add("xtemplate/compiler/ast",[],function(){var b={ProgramNode:function(a,d,b){this.lineNumber=a;this.statements=d;this.inverse=b}};b.ProgramNode.prototype.type="program";b.BlockStatement=function(a,d,b,g){g=g.parts;a:{var f=d.id.parts,r=f.length;if(r===g.length)for(var c=0;c<r;c++)if(f[c]!==g[c])break a}this.lineNumber=a;this.command=d;this.program=b};b.BlockStatement.prototype.type="blockStatement";b.InlineCommandStatement=function(a,b,e){this.lineNumber=a;this.command=b;this.escape=e};b.InlineCommandStatement.prototype.type=
"inlineCommandStatement";b.ExpressionStatement=function(a,b,e){this.lineNumber=a;this.value=b;this.escape=e};b.ExpressionStatement.prototype.type="expressionStatement";b.ContentStatement=function(a,b){this.lineNumber=a;this.value=b};b.ContentStatement.prototype.type="contentStatement";b.UnaryExpression=function(a,b){this.value=b;this.unaryType=a};b.Command=function(a,b,e,g){this.lineNumber=a;this.id=b;this.params=e;this.hash=g};b.Command.prototype.type="command";b.UnaryExpression.prototype.type="unaryExpression";
b.MultiplicativeExpression=function(a,b,e){this.op1=a;this.opType=b;this.op2=e};b.MultiplicativeExpression.prototype.type="multiplicativeExpression";b.AdditiveExpression=function(a,b,e){this.op1=a;this.opType=b;this.op2=e};b.AdditiveExpression.prototype.type="additiveExpression";b.RelationalExpression=function(a,b,e){this.op1=a;this.opType=b;this.op2=e};b.RelationalExpression.prototype.type="relationalExpression";b.EqualityExpression=function(a,b,e){this.op1=a;this.opType=b;this.op2=e};b.EqualityExpression.prototype.type=
"equalityExpression";b.ConditionalAndExpression=function(a,b){this.op1=a;this.op2=b;this.opType="&&"};b.ConditionalAndExpression.prototype.type="conditionalAndExpression";b.ConditionalOrExpression=function(a,b){this.op1=a;this.op2=b;this.opType="||"};b.ConditionalOrExpression.prototype.type="conditionalOrExpression";b.String=function(a,b){this.lineNumber=a;this.value=b};b.String.prototype.type="string";b.Number=function(a,b){this.lineNumber=a;this.value=b};b.Number.prototype.type="number";b.Boolean=
function(a,b){this.lineNumber=a;this.value=b};b.Boolean.prototype.type="boolean";b.Hash=function(a){this.lineNumber=a;this.value={}};b.Hash.prototype.type="hash";b.Id=function(a,b){var e=[],g=0;this.lineNumber=a;for(var f=0,r=b.length;f<r;f++){var c=b[f];".."===c?g++:e.push(c)}this.parts=e;this.string=e.join(".");this.depth=g};b.Id.prototype.type="id";return b});
KISSY.add("xtemplate/compiler",["xtemplate/runtime","./compiler/parser","./compiler/ast"],function(b,a){function d(a,b){return a.replace(b?v:n,function(a){a.length%2&&(a="\\"+a);return a})}function e(a,b){a=b?d(a,0):a.replace(/\\/g,"\\\\").replace(/'/g,"\\'");return a=a.replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function g(a,b){j.apply(a,b)}function f(a){var b=[],c=a.opType,d,q,e;q=k[a.op1.type](a.op1);e=k[a.op2.type](a.op2);a=q.exp;d=e.exp;q=q.source;e=e.source;g(b,q);"&&"===
c||"||"===c?(b.push("if("+("&&"===c?"":"!")+"("+a+")){"),g(b,e),b.push("}")):g(b,e);return{exp:"("+a+")"+c+"("+d+")",source:b}}function r(a){var b=[];b.push("function(scope) {");b.push('var buffer = "";');if(a)for(var c=0,d=a.length;c<d;c++)g(b,k[a[c].type](a[c]).source);b.push("return buffer;");b.push("}");return b}function c(a){var c=[],d,e;d=a.params;e=a.hash;if(d||e)a="option"+o++,c.push("var "+a+" = {};");else return null;if(d){var q="params"+o++;c.push("var "+q+" = [];");b.each(d,function(a){a=
k[a.type](a);g(c,a.source);c.push(q+".push("+a.exp+");")});c.push(a+".params="+q+";")}if(e){var f="hash"+o++;c.push("var "+f+" = {};");b.each(e.value,function(a,b){var s=k[a.type](a);g(c,s.source);c.push(f+'["'+b+'"] = '+s.exp+";")});c.push(a+".hash="+f+";")}return{exp:a,source:c}}var u=a("xtemplate/runtime"),m=a("./compiler/parser");m.yy=a("./compiler/ast");var h="",i,w=["if","with","debugger"],t=u.nativeCommands,u=u.utils;for(i in u)h+=i+"Util = utils."+i+",";for(i in t)h+=i+(-1<b.indexOf(i,w)?
'Command = nativeCommands["'+i+'"]':"Command = nativeCommands."+i)+",";var h=h.slice(0,-1),v=/\\*"/g,n=/\\*'/g,j=[].push,o=0,l=0,k={conditionalOrExpression:f,conditionalAndExpression:f,relationalExpression:f,equalityExpression:f,additiveExpression:f,multiplicativeExpression:f,unaryExpression:function(a){var b=k[a.value.type](a.value);return{exp:a.unaryType+"("+b.exp+")",source:b.source}},string:function(a){return{exp:"'"+e(a.value,!0)+"'",source:[]}},number:function(a){return{exp:a.value,source:[]}},
"boolean":function(a){return{exp:a.value,source:[]}},id:function(a){var b=[],c=a.depth,a=a.parts,d="id"+o++,e;if(1===a.length)e=null;else{var f,h,i,j=0;e=0;for(f=a.length;e<f;e++)if(a[e].type){j=1;break}if(j){j=[];e=0;for(f=a.length;e<f;e++)h=a[e],(i=h.type)?(h=k[i](h),g(b,h.source),j.push(h.exp)):j.push('"'+h+'"');e=j}else e=null}c=c?","+c:"";e?b.push("var "+d+" = scope.resolve(["+e.join(",")+"]"+c+");"):b.push("var "+d+' = scope.resolve(["'+a.join('","')+'"]'+c+");");return{exp:d,source:b}},command:function(a){var b=
[],e=a.id,d,f=e.string,h,i="id"+o++;if(h=c(a))d=h.exp,g(b,h.source);("include"===f||"extend"===f)&&b.push('if(moduleWrap) {require("'+a.params[0].value+'");'+d+".params[0] = moduleWrap.resolveByName("+d+".params[0]);}");f in t?b.push("var "+i+" = "+f+"Command.call(engine,scope,"+d+",payload);"):b.push("var "+i+" = callCommandUtil(engine,scope,"+d+',"'+f+'",'+e.lineNumber+");");return{exp:i,source:b}},blockStatement:function(a){var b=a.program,d=[],e=a.command,f,a=e.id,h=a.string;(f=c(e))?(e=f.exp,
g(d,f.source)):(e="option"+o++,d.push("var "+e+" = {};"));d.push(e+".fn="+r(b.statements).join("\n")+";");b.inverse&&(b=r(b.inverse).join("\n"),d.push(e+".inverse="+b+";"));h in t?d.push("buffer += "+h+"Command.call(engine, scope, "+e+",payload);"):d.push("buffer += callCommandUtil(engine, scope, "+e+', "'+h+'", '+a.lineNumber+");");return{exp:"",source:d}},expressionStatement:function(a){var b=[],c=a.escape,a=a.value,a=k[a.type](a);g(b,a.source);a=a.exp;c?b.push("buffer += escapeHtml("+a+");"):b.push("buffer += normalizeOutputUtil("+
a+");");return{exp:"",source:b}},contentStatement:function(a){return{exp:"",source:["buffer += '"+e(a.value,0)+"';"]}}},p;return p={parse:function(a,b){return m.parse(b,a)},compileToStr:function(a,b){var c=p.compile(a,b);return"function("+c.params.join(",")+"){\n"+c.source.join("\n")+"}"},compile:function(a,b){var c=p.parse(b,a);o=0;var c=c.statements,d=[];d.push('var buffer = "",engine = this,moduleWrap,escapeHtml = S.escapeHtml,nativeCommands = engine.nativeCommands,utils = engine.utils;');d.push('if (typeof module !== "undefined" && module.kissy) {moduleWrap = module;}');
d.push("var "+h+";");if(c)for(var e=0,f=c.length;e<f;e++)g(d,k[c[e].type](c[e]).source);d.push("return buffer;");return{params:["scope","S","payload","undefined"],source:d}},compileToFn:function(a,b){var b=b||"xtemplate"+l++,c=p.compile(a,b),d="sourceURL="+b+".js";return Function.apply(null,[].concat(c.params).concat(c.source.join("\n")+"\n//@ "+d+"\n//# "+d))}}});