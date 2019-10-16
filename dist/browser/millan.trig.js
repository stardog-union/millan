!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("trig",[],n):"object"==typeof exports?exports.trig=n():(e.millan=e.millan||{},e.millan.trig=n())}("undefined"!=typeof self?self:this,function(){return function(e){function n(n){for(var r,c,a=n[0],u=n[1],L=n[2],l=0,f=[];l<a.length;l++)c=a[l],o[c]&&f.push(o[c][0]),o[c]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(E&&E(n);f.length;)f.shift()();return i.push.apply(i,L||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],r=!0,a=1;a<t.length;a++){var u=t[a];0!==o[u]&&(r=!1)}r&&(i.splice(n--,1),e=c(c.s=t[0]))}return e}var r={},o={7:0},i=[];function c(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.m=e,c.c=r,c.d=function(e,n,t){c.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,n){if(1&n&&(e=c(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(c.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)c.d(t,r,function(n){return e[n]}.bind(null,r));return t},c.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(n,"a",n),n},c.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},c.p="";var a=("undefined"!=typeof self?self:this).webpackJsonp=("undefined"!=typeof self?self:this).webpackJsonp||[],u=a.push.bind(a);a.push=n,a=a.slice();for(var L=0;L<a.length;L++)n(a[L]);var E=u;return i.push([69,0,1]),t()}({13:function(e,n,t){"use strict";t.d(n,"a",function(){return TurtleParser});var r,o=t(0),i=(r=function(e,n){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])})(e,n)},function(e,n){function t(){this.constructor=e}r(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}),c=function(){return(c=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e}).apply(this,arguments)},a=t(7),u=a.turtleTokenTypes,L=a.turtleTokenMap,TurtleParser=function(e){function TurtleParser(n,t,r,i){void 0===t&&(t=u),void 0===r&&(r=t),void 0===i&&(i=!0);var a=e.call(this,t,c({outputCst:!0,recoveryEnabled:!0},n))||this;return a.namespacesMap={},a.semanticErrors=[],a.resetManagedState=function(){a.namespacesMap={},a.semanticErrors=[]},a.tokenize=function(e){return a.lexer.tokenize(e).tokens},a.parse=function(e){a.input=a.lexer.tokenize(e).tokens;var n=a.turtleDoc(),t=a.errors.slice(),r=a.semanticErrors.slice();return a.resetManagedState(),{errors:t,semanticErrors:r,cst:n}},a.turtleDoc=a.RULE("turtleDoc",function(){a.MANY(function(){return a.SUBRULE(a.statement)})}),a.statement=a.RULE("statement",function(){a.OR([{ALT:function(){return a.SUBRULE(a.directive)}},{ALT:function(){a.SUBRULE(a.triples),a.CONSUME(L.Period)}}])}),a.directive=a.RULE("directive",function(){a.OR([{ALT:function(){return a.SUBRULE(a.prefixID)}},{ALT:function(){return a.SUBRULE(a.base)}},{ALT:function(){return a.SUBRULE(a.sparqlPrefix)}},{ALT:function(){return a.SUBRULE(a.sparqlBase)}}])}),a.prefixID=a.RULE("prefixID",function(){a.CONSUME(L.TTL_PREFIX);var e=a.CONSUME(L.PNAME_NS),n=a.CONSUME(L.IRIREF),t=e.image.slice(0,-1),r=n.image;a.namespacesMap[t]=r,a.CONSUME(L.Period)}),a.base=a.RULE("base",function(){a.CONSUME(L.TTL_BASE),a.CONSUME(L.IRIREF),a.CONSUME(L.Period)}),a.sparqlBase=a.RULE("sparqlBase",function(){a.CONSUME(L.BASE),a.CONSUME(L.IRIREF)}),a.sparqlPrefix=a.RULE("sparqlPrefix",function(){a.CONSUME(L.PREFIX);var e=a.CONSUME(L.PNAME_NS),n=a.CONSUME(L.IRIREF),t=e.image.slice(0,-1),r=n.image;a.namespacesMap[t]=r}),a.triples=a.RULE("triples",function(){a.OR([{ALT:function(){a.SUBRULE(a.subject),a.SUBRULE(a.predicateObjectList)}},{ALT:function(){a.SUBRULE(a.blankNodePropertyList),a.OPTION(function(){return a.SUBRULE1(a.predicateObjectList)})}}])}),a.predicateObjectList=a.RULE("predicateObjectList",function(){a.SUBRULE(a.verb),a.SUBRULE(a.objectList),a.MANY(function(){a.CONSUME(L.Semicolon),a.OPTION(function(){a.SUBRULE1(a.verb),a.SUBRULE1(a.objectList)})})}),a.subject=a.RULE("subject",function(){a.OR([{ALT:function(){return a.SUBRULE(a.iri)}},{ALT:function(){return a.SUBRULE(a.BlankNode)}},{ALT:function(){return a.SUBRULE(a.collection)}}])}),a.predicate=a.RULE("predicate",function(){a.SUBRULE(a.iri)}),a.objectList=a.RULE("objectList",function(){a.SUBRULE(a.object),a.MANY(function(){a.CONSUME(L.Comma),a.SUBRULE1(a.object)})}),a.verb=a.RULE("verb",function(){a.OR([{ALT:function(){return a.SUBRULE(a.predicate)}},{ALT:function(){return a.CONSUME(L.A)}}])}),a.literal=a.RULE("literal",function(){a.OR([{ALT:function(){return a.SUBRULE(a.RDFLiteral)}},{ALT:function(){return a.SUBRULE(a.NumericLiteral)}},{ALT:function(){return a.SUBRULE(a.BooleanLiteral)}}])}),a.blankNodePropertyList=a.RULE("blankNodePropertyList",function(){a.CONSUME(L.LBracket),a.SUBRULE(a.predicateObjectList),a.CONSUME(L.RBracket)}),a.object=a.RULE("object",function(){a.OR([{ALT:function(){return a.SUBRULE(a.iri)}},{ALT:function(){return a.SUBRULE(a.BlankNode)}},{ALT:function(){return a.SUBRULE(a.collection)}},{ALT:function(){return a.SUBRULE(a.blankNodePropertyList)}},{ALT:function(){return a.SUBRULE(a.literal)}}])}),a.collection=a.RULE("collection",function(){a.CONSUME(L.LParen),a.MANY(function(){return a.SUBRULE(a.object)}),a.CONSUME(L.RParen)}),a.NumericLiteral=a.RULE("NumericLiteral",function(){a.OR([{ALT:function(){return a.CONSUME(L.INTEGER)}},{ALT:function(){return a.CONSUME(L.DECIMAL)}},{ALT:function(){return a.CONSUME(L.DOUBLE)}}])}),a.RDFLiteral=a.RULE("RDFLiteral",function(){a.SUBRULE(a.String),a.OPTION(function(){a.OR([{ALT:function(){return a.CONSUME(L.LANGTAG)}},{ALT:function(){a.CONSUME(L.DoubleCaret),a.SUBRULE(a.iri)}}])})}),a.BooleanLiteral=a.RULE("BooleanLiteral",function(){a.OR([{ALT:function(){return a.CONSUME(L.TRUE)}},{ALT:function(){return a.CONSUME(L.FALSE)}}])}),a.String=a.RULE("String",function(){a.OR([{ALT:function(){return a.CONSUME(L.STRING_LITERAL_QUOTE)}},{ALT:function(){return a.CONSUME(L.STRING_LITERAL_SINGLE_QUOTE)}},{ALT:function(){return a.CONSUME(L.STRING_LITERAL_LONG_SINGLE_QUOTE)}},{ALT:function(){return a.CONSUME(L.STRING_LITERAL_LONG_QUOTE)}}])}),a.iri=a.RULE("iri",function(){a.OR([{ALT:function(){return a.CONSUME(L.IRIREF)}},{ALT:function(){return a.SUBRULE(a.PrefixedName)}}])}),a.PrefixedName=a.RULE("PrefixedName",function(){var e=a.OR([{ALT:function(){return a.CONSUME(L.PNAME_LN)}},{ALT:function(){return a.CONSUME(L.PNAME_NS)}}]);e.image.slice(0,e.image.indexOf(":"))in a.namespacesMap||a.semanticErrors.push({name:"NoNamespacePrefixError",message:"A prefix was used for which there was no namespace defined.",token:e,context:{ruleStack:a.getHumanReadableRuleStack(),ruleOccurrenceStack:a.RULE_OCCURRENCE_STACK.slice()},resyncedTokens:[]})}),a.BlankNode=a.RULE("BlankNode",function(){a.OR([{ALT:function(){return a.CONSUME(L.BLANK_NODE_LABEL)}},{ALT:function(){return a.CONSUME(L.ANON)}}])}),a.lexer=new o.Lexer(r),i&&o.Parser.performSelfAnalysis(a),a}return i(TurtleParser,e),TurtleParser}(o.Parser)},42:function(e,n,t){"use strict";t.r(n),t.d(n,"trigTokenMap",function(){return a}),t.d(n,"trigTokenTypes",function(){return L});var r=t(7),o=t(5),i=function(){return(i=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e}).apply(this,arguments)},c=t(7).turtleTokenTypes,a=i({LCurly:o.sparqlTokenMap.LCurly,RCurly:o.sparqlTokenMap.RCurly,GRAPH:o.sparqlTokenMap.GRAPH},r.turtleTokenMap),u=c.indexOf(r.turtleTokenMap.PN_CHARS_BASE),L=[o.sparqlTokenMap.LCurly,o.sparqlTokenMap.RCurly].concat(c.slice(0,u),[o.sparqlTokenMap.GRAPH],c.slice(u))},69:function(e,n,t){"use strict";t.r(n);var r,o=t(0),TurtleParser=t(13),i=(r=function(e,n){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])})(e,n)},function(e,n){function t(){this.constructor=e}r(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}),c=t(42),a=c.trigTokenMap,u=c.trigTokenTypes,L=function(e){function TrigParser(n){var t=e.call(this,n,u,u,!1)||this;return t.parse=function(e){t.input=t.lexer.tokenize(e).tokens;var n=t.trigDoc(),r=t.errors.slice(),o=t.semanticErrors.slice();return t.resetManagedState(),{errors:r,semanticErrors:o,cst:n}},t.trigDoc=t.RULE("trigDoc",function(){t.MANY(function(){t.OR([{ALT:function(){return t.SUBRULE(t.directive)}},{ALT:function(){return t.SUBRULE(t.block)}}])})}),t.block=t.RULE("block",function(){t.OR([{ALT:function(){return t.SUBRULE(t.triplesOrGraph)}},{ALT:function(){return t.SUBRULE(t.wrappedGraph)}},{ALT:function(){return t.SUBRULE(t.triples2)}},{ALT:function(){t.CONSUME(a.GRAPH),t.SUBRULE(t.labelOrSubject),t.SUBRULE1(t.wrappedGraph)}}])}),t.triplesOrGraph=t.RULE("triplesOrGraph",function(){t.SUBRULE(t.labelOrSubject),t.OR([{ALT:function(){return t.SUBRULE(t.wrappedGraph)}},{ALT:function(){t.SUBRULE(t.predicateObjectList),t.CONSUME(a.Period)}}])}),t.triples2=t.RULE("triples2",function(){t.OR([{ALT:function(){t.SUBRULE(t.blankNodePropertyList),t.OPTION(function(){return t.SUBRULE(t.predicateObjectList)}),t.CONSUME(a.Period)}},{ALT:function(){t.SUBRULE(t.collection),t.SUBRULE1(t.predicateObjectList),t.CONSUME1(a.Period)}}])}),t.wrappedGraph=t.RULE("wrappedGraph",function(){t.CONSUME(a.LCurly),t.OPTION(function(){return t.SUBRULE(t.triplesBlock)}),t.CONSUME(a.RCurly)}),t.triplesBlock=t.RULE("triplesBlock",function(){t.SUBRULE(t.triples),t.OPTION(function(){t.CONSUME(a.Period),t.OPTION1(function(){return t.SUBRULE(t.triplesBlock)})})}),t.labelOrSubject=t.RULE("labelOrSubject",function(){t.OR([{ALT:function(){return t.SUBRULE(t.iri)}},{ALT:function(){return t.SUBRULE(t.BlankNode)}}])}),o.Parser.performSelfAnalysis(t),t}return i(TrigParser,e),TrigParser}(TurtleParser.a);t.d(n,"trigTokens",function(){return E}),t.d(n,"TrigParser",function(){return L});var E=t(42)},7:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t(2),i=t(3),c=/\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\[uU]|\\(.)/g,a={"\\":"\\","'":"'",'"':'"',n:"\n",r:"\r",t:"\t",f:"\f",b:"\b",_:"_","~":"~",".":".","-":"-","!":"!",$:"$","&":"&","(":"(",")":")","*":"*","+":"+",",":",",";":";","=":"=","/":"/","?":"?","#":"#","@":"@","%":"%"},u=/^"([^"\\\r\n]+)"/,L=/^'([^'\\\r\n]+)'/,E=/^"((?:[^"\\\r\n]|\\.)*)"(?=[^"])/,l=/^'((?:[^'\\\r\n]|\\.)*)'(?=[^'])/,f=/^"""([^"\\]*(?:(?:\\.|"(?!""))[^"\\]*)*)"""/,U=/^'''([^'\\]*(?:(?:\\.|'(?!''))[^'\\]*)*)'''/,R=/[\x00-\x20<>\\"\{\}\|\^\`]/,s=/^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/,p=/^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/,T=function(e){try{return e.replace(c,function(e,n,t,r){if(n)return String.fromCharCode(parseInt(n,16));if(t){var o=parseInt(t,16);return o<=65535?String.fromCharCode(o):String.fromCharCode(55296+(o-=65536)/1024,56320+(1023&o))}var i=a[r];if(!i)throw new Error;return i})}catch(e){return null}};t.d(n,"turtleTokenMap",function(){return N}),t.d(n,"turtleTokenTypes",function(){return A});var O=t(5).sparqlTokenMap,S=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,N={Comment:Object(r.createToken)({name:"Comment",pattern:/#[^\n]*/,group:"comments"}),LBracket:O.LBracket,RBracket:O.RBracket,LParen:O.LParen,RParen:O.RParen,Period:O.Period,WhiteSpace:O.WhiteSpace,TRUE:Object(r.createToken)({name:"TRUE",pattern:/true/}),FALSE:Object(r.createToken)({name:"FALSE",pattern:/false/}),DoubleCaret:O.DoubleCaret,Comma:O.Comma,Semicolon:O.Semicolon,A:O.A,PREFIX:O.PREFIX,BASE:O.BASE,PNAME_NS:O.PNAME_NS,PNAME_LN:O.PNAME_LN,BLANK_NODE_LABEL:O.BLANK_NODE_LABEL,TTL_BASE:Object(r.createToken)({name:"TTL_BASE",pattern:/@base/}),TTL_PREFIX:Object(r.createToken)({name:"TTL_PREFIX",pattern:/@prefix/}),LANGTAG:O.LANGTAG,INTEGER:Object(r.createToken)({name:"INTEGER",pattern:o.a.and(o.a.option(/[+-]/),/\d+/)}),DECIMAL:Object(r.createToken)({name:"DECIMAL",pattern:o.a.and(o.a.option(/[+-]/),/(\d*\.\d+)/)}),DOUBLE:Object(r.createToken)({name:"DOUBLE",pattern:o.a.and(o.a.option(/[+-]/),o.a.or(o.a.and(/\d+\.\d*/,i.k),o.a.and(/\.\d+/,i.k),o.a.and(/\d+/,i.k)))}),EXPONENT:Object(r.createToken)({name:"EXPONENT",pattern:i.k}),ECHAR:Object(r.createToken)({name:"ECHAR",pattern:i.j}),ANON:O.ANON,PLX:Object(r.createToken)({name:"PLX",pattern:i.t}),PERCENT:O.PERCENT,HEX:Object(r.createToken)({name:"HEX",pattern:i.l}),STRING_LITERAL_LONG_SINGLE_QUOTE:Object(r.createToken)({name:"STRING_LITERAL_LONG_SINGLE_QUOTE",pattern:function(e,n){void 0===n&&(n=0);var t=U.exec(e.slice(n));return t&&null!==T(t[1])?t:null},line_breaks:!0}),STRING_LITERAL_LONG_QUOTE:Object(r.createToken)({name:"STRING_LITERAL_LONG_QUOTE",pattern:function(e,n){void 0===n&&(n=0);var t=f.exec(e.slice(n));return t&&null!==T(t[1])?t:null},line_breaks:!0}),STRING_LITERAL_QUOTE:Object(r.createToken)({name:"STRING_LITERAL_QUOTE",pattern:function(e,n){void 0===n&&(n=0);var t=e.slice(n),r=u.exec(t);return r||((r=E.exec(t))?null===T(r[1])?null:r:null)},line_breaks:!1}),STRING_LITERAL_SINGLE_QUOTE:Object(r.createToken)({name:"STRING_LITERAL_SINGLE_QUOTE",pattern:function(e,n){void 0===n&&(n=0);var t=e.slice(n),r=L.exec(t);return r||((r=l.exec(t))?null===T(r[1])?null:r:null)},line_breaks:!1}),UCHAR:Object(r.createToken)({name:"UCHAR",pattern:function(e,n){return void 0===n&&(n=0),S.exec(e.slice(n))},line_breaks:!1}),IRIREF:Object(r.createToken)({name:"IRIREF",pattern:function(e,n){void 0===n&&(n=0);var t=e.slice(n),r=p.exec(t);if(r)return r;if(!(r=s.exec(t)))return null;var o=T(r[1]);return null===o||R.test(o)?null:r},line_breaks:!1}),PN_CHARS_BASE:Object(r.createToken)({name:"PN_CHARS_BASE",pattern:i.x}),PN_CHARS_U:Object(r.createToken)({name:"PN_CHARS_U",pattern:i.y}),PN_CHARS:Object(r.createToken)({name:"PN_CHARS",pattern:i.w}),PN_PREFIX:Object(r.createToken)({name:"PN_PREFIX",pattern:i.B}),PN_LOCAL:Object(r.createToken)({name:"PN_LOCAL",pattern:i.z}),PN_LOCAL_ESC:Object(r.createToken)({name:"PN_LOCAL_ESC",pattern:i.A}),Unknown:Object(r.createToken)({name:"Unknown",pattern:/\w+/})},A=[N.Comment,O.ANON,O.LBracket,O.RBracket,O.LParen,O.RParen,O.WhiteSpace,N.TRUE,N.FALSE,O.Comma,O.Semicolon,O.PNAME_NS,O.A,O.PREFIX,O.BASE,O.PNAME_LN,O.BLANK_NODE_LABEL,N.TTL_BASE,N.TTL_PREFIX,O.LANGTAG,N.DOUBLE,N.DECIMAL,O.Period,O.DoubleCaret,N.IRIREF,N.STRING_LITERAL_LONG_SINGLE_QUOTE,N.STRING_LITERAL_LONG_QUOTE,N.STRING_LITERAL_QUOTE,N.STRING_LITERAL_SINGLE_QUOTE,N.INTEGER,N.EXPONENT,N.PLX,O.PERCENT,N.HEX,N.PN_CHARS_BASE,N.PN_CHARS_U,N.PN_CHARS,N.PN_PREFIX,N.PN_LOCAL,N.PN_LOCAL_ESC,N.ECHAR,N.UCHAR,N.Unknown]}})});
//# sourceMappingURL=millan.trig.js.map