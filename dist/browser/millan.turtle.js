!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("turtle",[],n):"object"==typeof exports?exports.turtle=n():(e.millan=e.millan||{},e.millan.turtle=n())}("undefined"!=typeof self?self:this,function(){return function(e){function n(n){for(var r,o,T=n[0],R=n[1],A=n[2],c=0,S=[];c<T.length;c++)o=T[c],a[o]&&S.push(a[o][0]),a[o]=0;for(r in R)Object.prototype.hasOwnProperty.call(R,r)&&(e[r]=R[r]);for(L&&L(n);S.length;)S.shift()();return E.push.apply(E,A||[]),t()}function t(){for(var e,n=0;n<E.length;n++){for(var t=E[n],r=!0,T=1;T<t.length;T++){var R=t[T];0!==a[R]&&(r=!1)}r&&(E.splice(n--,1),e=o(o.s=t[0]))}return e}var r={},a={8:0},E=[];function o(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=e,o.c=r,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="";var T=("undefined"!=typeof self?self:this).webpackJsonp=("undefined"!=typeof self?self:this).webpackJsonp||[],R=T.push.bind(T);T.push=n,T=T.slice();for(var A=0;A<T.length;A++)n(T[A]);var L=R;return E.push([63,0]),t()}({1:function(e,n,t){"use strict";t.r(n);var r=t(0),a=function(){return(a=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var a in n=arguments[t])Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a]);return e}).apply(this,arguments)},E=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)n.indexOf(r[a])<0&&(t[r[a]]=e[r[a]])}return t};t.d(n,"createKeyword",function(){return R}),t.d(n,"keywords",function(){return L});var o=function(){return(o=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var a in n=arguments[t])Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a]);return e}).apply(this,arguments)},T=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)n.indexOf(r[a])<0&&(t[r[a]]=e[r[a]])}return t},R=function(e){var n=e.longer_alt,t=void 0===n?A:n,R=T(e,["longer_alt"]);return function(e){var n=e.name,t=e.pattern,o=E(e,["name","pattern"]);return Object(r.createToken)(a({name:n,pattern:t||new RegExp(n,"i")},o))}(o({longer_alt:t},R))},A=Object(r.createToken)({name:"UNKNOWN",pattern:/\w+/i}),L={SELECT:R({name:"SELECT"}),CONSTRUCT:R({name:"CONSTRUCT"}),DISTINCT:R({name:"DISTINCT"}),START:R({name:"START"}),END:R({name:"END"}),VIA:R({name:"VIA"}),PATHS:R({name:"PATHS"}),PATHS_ALL:R({name:"PATHS_ALL",pattern:/PATHS ALL/i}),PATHS_SHORTEST:R({name:"PATHS_SHORTEST",pattern:/PATHS SHORTEST/i}),CYCLIC:R({name:"CYCLIC"}),AS:R({name:"AS"}),WHERE:R({name:"WHERE"}),A:R({name:"A",pattern:/a/}),GROUP_BY:R({name:"GROUP_BY",pattern:/GROUP BY/i}),ORDER_BY:R({name:"ORDER_BY",pattern:/ORDER BY/i}),BY:R({name:"BY"}),BASE:R({name:"BASE"}),PREFIX:R({name:"PREFIX"}),DESCRIBE:R({name:"DESCRIBE"}),ASK:R({name:"ASK"}),FROM:R({name:"FROM"}),REDUCED:R({name:"REDUCED"}),NAMED:R({name:"NAMED"}),HAVING:R({name:"HAVING"}),ASC:R({name:"ASC"}),DESC:R({name:"DESC"}),OFFSET:R({name:"OFFSET"}),LIMIT:R({name:"LIMIT"}),VALUES:R({name:"VALUES"}),LOAD:R({name:"LOAD"}),SILENT:R({name:"SILENT"}),INTO:R({name:"INTO"}),CLEAR:R({name:"CLEAR"}),DROP:R({name:"DROP"}),CREATE:R({name:"CREATE"}),ADD:R({name:"ADD"}),TO:R({name:"TO"}),MOVE:R({name:"MOVE"}),COPY:R({name:"COPY"}),INSERT_DATA:R({name:"INSERT_DATA",pattern:/INSERT +DATA/i}),DELETE_DATA:R({name:"DELETE_DATA",pattern:/DELETE +DATA/i}),DELETE_WHERE:R({name:"DELETE_WHERE",pattern:/DELETE +WHERE/i}),WITH:R({name:"WITH"}),DELETE:R({name:"DELETE"}),INSERT:R({name:"INSERT"}),USING:R({name:"USING"}),DEFAULT:R({name:"DEFAULT"}),GRAPH:R({name:"GRAPH"}),ALL:R({name:"ALL"}),OPTIONAL:R({name:"OPTIONAL"}),SERVICE:R({name:"SERVICE"}),BIND:R({name:"BIND"}),UNNEST:R({name:"UNNEST"}),UNDEF:R({name:"UNDEF"}),MINUS:R({name:"MINUS"}),UNION:R({name:"UNION"}),FILTER:R({name:"FILTER"}),STR:R({name:"STR"}),LANG:R({name:"LANG"}),LANGMATCHES:R({name:"LANGMATCHES"}),DATATYPE:R({name:"DATATYPE"}),BOUND:R({name:"BOUND"}),IRI:R({name:"IRI"}),URI:R({name:"URI"}),BNODE:R({name:"BNODE"}),RAND:R({name:"RAND"}),ABS:R({name:"ABS"}),CEIL:R({name:"CEIL"}),FLOOR:R({name:"FLOOR"}),ROUND:R({name:"ROUND"}),CONCAT:R({name:"CONCAT"}),STRLEN:R({name:"STRLEN"}),UCASE:R({name:"UCASE"}),LCASE:R({name:"LCASE"}),ENCODE_FOR_URI:R({name:"ENCODE_FOR_URI"}),CONTAINS:R({name:"CONTAINS"}),STRSTARTS:R({name:"STRSTARTS"}),STRENDS:R({name:"STRENDS"}),STRBEFORE:R({name:"STRBEFORE"}),STRAFTER:R({name:"STRAFTER"}),YEAR:R({name:"YEAR"}),MONTH:R({name:"MONTH"}),DAY:R({name:"DAY"}),HOURS:R({name:"HOURS"}),MINUTES:R({name:"MINUTES"}),SECONDS:R({name:"SECONDS"}),TIMEZONE:R({name:"TIMEZONE"}),TZ:R({name:"TZ"}),NOW:R({name:"NOW"}),UUID:R({name:"UUID"}),STRUUID:R({name:"STRUUID"}),MD5:R({name:"MD5"}),SHA1:R({name:"SHA1"}),SHA256:R({name:"SHA256"}),SHA384:R({name:"SHA384"}),SHA512:R({name:"SHA512"}),COALESCE:R({name:"COALESCE"}),IF:R({name:"IF"}),STRLANG:R({name:"STRLANG"}),STRDT:R({name:"STRDT"}),sameTerm:R({name:"sameTerm"}),isIRI:R({name:"isIRI"}),isURI:R({name:"isURI"}),isBLANK:R({name:"isBLANK"}),isLITERAL:R({name:"isLITERAL"}),isNUMERIC:R({name:"isNUMERIC"}),REGEX:R({name:"REGEX"}),SUBSTR:R({name:"SUBSTR"}),REPLACE:R({name:"REPLACE"}),EXISTS:R({name:"EXISTS"}),NOT_EXISTS:R({name:"NOT_EXISTS",pattern:/NOT EXISTS/i}),COUNT:R({name:"COUNT"}),SUM:R({name:"SUM"}),MIN:R({name:"MIN"}),AVG:R({name:"AVG"}),SAMPLE:R({name:"SAMPLE"}),GROUP_CONCAT:R({name:"GROUP_CONCAT"}),SEPARATOR:R({name:"SEPARATOR"}),TRUE:R({name:"TRUE"}),FALSE:R({name:"FALSE"}),IN:R({name:"IN"}),NOT_IN:R({name:"NOT_IN",pattern:/NOT IN/i}),MAX_LENGTH:R({name:"MAX_LENGTH",pattern:/MAX LENGTH/i}),MAX:R({name:"MAX"}),UNKNOWN:A}},14:function(e,n,t){"use strict";t.d(n,"a",function(){return TurtleParser});var r,a=t(0),E=(r=function(e,n){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])})(e,n)},function(e,n){function t(){this.constructor=e}r(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}),o=function(){return(o=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var a in n=arguments[t])Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a]);return e}).apply(this,arguments)},T=t(9),R=T.turtleTokenTypes,A=T.turtleTokenMap,TurtleParser=function(e){function TurtleParser(n,t,r,E){void 0===n&&(n={}),void 0===t&&(t=R),void 0===r&&(r=t),void 0===E&&(E=!0);var T=e.call(this,t,o({outputCst:!0,recoveryEnabled:!0},n))||this;return T.namespacesMap={},T.semanticErrors=[],T.resetManagedState=function(){T.namespacesMap={},T.semanticErrors=[]},T.tokenize=function(e){return T.lexer.tokenize(e).tokens},T.parse=function(e,n){void 0===n&&(n="standard"),T.input=T.lexer.tokenize(e).tokens;var t=T.turtleDoc(0,[n]),r=T.errors.slice(),a=T.semanticErrors.slice();return T.resetManagedState(),{errors:r,semanticErrors:a,cst:t}},T.turtleDoc=T.RULE("turtleDoc",function(e){var n="stardog"===e;T.MANY(function(){return T.SUBRULE(T.statement,{ARGS:[n]})})}),T.statement=T.RULE("statement",function(e){T.OR([{ALT:function(){return T.SUBRULE(T.directive)}},{ALT:function(){T.SUBRULE(T.triples,{ARGS:[e]}),T.CONSUME(A.Period)}}])}),T.directive=T.RULE("directive",function(){T.OR([{ALT:function(){return T.SUBRULE(T.prefixID)}},{ALT:function(){return T.SUBRULE(T.base)}},{ALT:function(){return T.SUBRULE(T.sparqlPrefix)}},{ALT:function(){return T.SUBRULE(T.sparqlBase)}}])}),T.prefixID=T.RULE("prefixID",function(){T.CONSUME(A.TTL_PREFIX);var e=T.CONSUME(A.PNAME_NS),n=T.CONSUME(A.IRIREF),t=e.image.slice(0,-1),r=n.image;T.namespacesMap[t]=r,T.CONSUME(A.Period)}),T.base=T.RULE("base",function(){T.CONSUME(A.TTL_BASE),T.CONSUME(A.IRIREF),T.CONSUME(A.Period)}),T.sparqlBase=T.RULE("sparqlBase",function(){T.CONSUME(A.BASE),T.CONSUME(A.IRIREF)}),T.sparqlPrefix=T.RULE("sparqlPrefix",function(){T.CONSUME(A.PREFIX);var e=T.CONSUME(A.PNAME_NS),n=T.CONSUME(A.IRIREF),t=e.image.slice(0,-1),r=n.image;T.namespacesMap[t]=r}),T.triples=T.RULE("triples",function(e){T.OR([{ALT:function(){T.SUBRULE(T.subject),T.SUBRULE1(T.predicateObjectList,{ARGS:[e]})}},{GATE:function(){return Boolean(e)},ALT:function(){T.SUBRULE(T.EmbeddedTriplePattern),T.SUBRULE(T.predicateObjectList)}},{ALT:function(){T.SUBRULE(T.blankNodePropertyList,{ARGS:[e]}),T.OPTION(function(){return T.SUBRULE2(T.predicateObjectList,{ARGS:[e]})})}}])}),T.EmbeddedTriplePattern=T.RULE("EmbeddedTriplePattern",function(){T.CONSUME(A.LEmbed),T.SUBRULE(T.triples),T.CONSUME(A.REmbed)}),T.predicateObjectList=T.RULE("predicateObjectList",function(e){T.SUBRULE(T.verb),T.OR([{ALT:function(){return T.SUBRULE(T.objectList,{ARGS:[e]})}},{GATE:function(){return Boolean(e)},ALT:function(){T.SUBRULE(T.EmbeddedPredicateObjectList),T.SUBRULE(T.object,{ARGS:[e]})}}]),T.MANY(function(){T.CONSUME(A.Semicolon),T.OPTION(function(){T.SUBRULE1(T.verb),T.OR1([{ALT:function(){return T.SUBRULE1(T.objectList,{ARGS:[e]})}},{GATE:function(){return Boolean(e)},ALT:function(){T.SUBRULE1(T.EmbeddedPredicateObjectList),T.SUBRULE1(T.object,{ARGS:[e]})}}])})})}),T.EmbeddedPredicateObjectList=T.RULE("EmbeddedPredicateObjectList",function(){T.CONSUME(A.LCurly),T.SUBRULE(T.predicateObjectList),T.CONSUME(A.RCurly)}),T.subject=T.RULE("subject",function(){T.OR([{ALT:function(){return T.SUBRULE(T.iri)}},{ALT:function(){return T.SUBRULE(T.BlankNode)}},{ALT:function(){return T.SUBRULE(T.collection)}}])}),T.predicate=T.RULE("predicate",function(){T.SUBRULE(T.iri)}),T.objectList=T.RULE("objectList",function(e){T.SUBRULE(T.object,{ARGS:[e]}),T.MANY(function(){T.CONSUME(A.Comma),T.SUBRULE1(T.object,{ARGS:[e]})})}),T.verb=T.RULE("verb",function(){T.OR([{ALT:function(){return T.SUBRULE(T.predicate)}},{ALT:function(){return T.CONSUME(A.A)}}])}),T.literal=T.RULE("literal",function(){T.OR([{ALT:function(){return T.SUBRULE(T.RDFLiteral)}},{ALT:function(){return T.SUBRULE(T.NumericLiteral)}},{ALT:function(){return T.SUBRULE(T.BooleanLiteral)}}])}),T.blankNodePropertyList=T.RULE("blankNodePropertyList",function(e){T.CONSUME(A.LBracket),T.SUBRULE(T.predicateObjectList,{ARGS:[e]}),T.CONSUME(A.RBracket)}),T.object=T.RULE("object",function(e){T.OR([{ALT:function(){return T.SUBRULE(T.iri)}},{ALT:function(){return T.SUBRULE(T.BlankNode)}},{ALT:function(){return T.SUBRULE(T.collection)}},{ALT:function(){return T.SUBRULE(T.blankNodePropertyList,{ARGS:[e]})}},{ALT:function(){return T.SUBRULE(T.literal)}}])}),T.collection=T.RULE("collection",function(){T.CONSUME(A.LParen),T.MANY(function(){return T.SUBRULE(T.object)}),T.CONSUME(A.RParen)}),T.NumericLiteral=T.RULE("NumericLiteral",function(){T.OR([{ALT:function(){return T.CONSUME(A.INTEGER)}},{ALT:function(){return T.CONSUME(A.DECIMAL)}},{ALT:function(){return T.CONSUME(A.DOUBLE)}}])}),T.RDFLiteral=T.RULE("RDFLiteral",function(){T.SUBRULE(T.String),T.OPTION(function(){T.OR([{ALT:function(){return T.CONSUME(A.LANGTAG)}},{ALT:function(){T.CONSUME(A.DoubleCaret),T.SUBRULE(T.iri)}}])})}),T.BooleanLiteral=T.RULE("BooleanLiteral",function(){T.OR([{ALT:function(){return T.CONSUME(A.TRUE)}},{ALT:function(){return T.CONSUME(A.FALSE)}}])}),T.String=T.RULE("String",function(){T.OR([{ALT:function(){return T.CONSUME(A.STRING_LITERAL_QUOTE)}},{ALT:function(){return T.CONSUME(A.STRING_LITERAL_SINGLE_QUOTE)}},{ALT:function(){return T.CONSUME(A.STRING_LITERAL_LONG_SINGLE_QUOTE)}},{ALT:function(){return T.CONSUME(A.STRING_LITERAL_LONG_QUOTE)}}])}),T.iri=T.RULE("iri",function(){T.OR([{ALT:function(){return T.CONSUME(A.IRIREF)}},{ALT:function(){return T.SUBRULE(T.PrefixedName)}}])}),T.PrefixedName=T.RULE("PrefixedName",function(){var e=T.OR([{ALT:function(){return T.CONSUME(A.PNAME_LN)}},{ALT:function(){return T.CONSUME(A.PNAME_NS)}}]);e.image.slice(0,e.image.indexOf(":"))in T.namespacesMap||T.semanticErrors.push({name:"NoNamespacePrefixError",message:"A prefix was used for which there was no namespace defined.",token:e,context:{ruleStack:T.getHumanReadableRuleStack(),ruleOccurrenceStack:T.RULE_OCCURRENCE_STACK.slice()},resyncedTokens:[]})}),T.BlankNode=T.RULE("BlankNode",function(){T.OR([{ALT:function(){return T.CONSUME(A.BLANK_NODE_LABEL)}},{ALT:function(){return T.CONSUME(A.ANON)}}])}),T.lexer=new a.Lexer(r),E&&a.Parser.performSelfAnalysis(T),T}return E(TurtleParser,e),TurtleParser}(a.Parser)},2:function(e,n,t){"use strict";t.d(n,"a",function(){return r});var r={or:function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return new RegExp(e.map(function(e){return"("+e.source+")"}).join("|"))},and:function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return new RegExp(e.map(function(e){return"("+e.source+")"}).join(""))},option:function(e){return new RegExp("("+e.source+")?")},many:function(e){return new RegExp("("+e.source+")*")}}},3:function(e,n,t){"use strict";t.d(n,"c",function(){return a}),t.d(n,"p",function(){return E}),t.d(n,"x",function(){return o}),t.d(n,"q",function(){return T}),t.d(n,"m",function(){return R}),t.d(n,"d",function(){return A}),t.d(n,"k",function(){return L}),t.d(n,"j",function(){return c}),t.d(n,"l",function(){return N}),t.d(n,"A",function(){return u}),t.d(n,"y",function(){return i}),t.d(n,"w",function(){return O}),t.d(n,"B",function(){return s}),t.d(n,"s",function(){return I}),t.d(n,"t",function(){return d}),t.d(n,"z",function(){return m}),t.d(n,"a",function(){return l}),t.d(n,"r",function(){return C}),t.d(n,"C",function(){return f}),t.d(n,"D",function(){return _}),t.d(n,"E",function(){return p}),t.d(n,"F",function(){return k}),t.d(n,"g",function(){return D}),t.d(n,"o",function(){return P}),t.d(n,"f",function(){return y}),t.d(n,"i",function(){return b}),t.d(n,"n",function(){return G}),t.d(n,"e",function(){return B}),t.d(n,"h",function(){return M}),t.d(n,"G",function(){return w}),t.d(n,"H",function(){return F}),t.d(n,"b",function(){return j}),t.d(n,"v",function(){return H}),t.d(n,"u",function(){return v});var r=t(2),a=/[\s\S]+/,E=/<[^<>\\{}|\^`\u0000-\u0020]*>/,o=/[A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDBFF][\uDC00-\uDFFF]/,T=/@[a-zA-Z]+(-[a-zA-Z0-9]+)*/,R=/\d+/,A=/(\d*\.\d+)|(\d+\.\d*)/,L=/[eE][+-]?\d+/,c=/\\[tbnrf"'\\]/,S=/[\u0020\u0009\u000d\u000a]/,N=/[0-9A-Fa-f]/,u=/\\[_~.\-!\$&'()*+,=\/?#@%;]/,i=r.a.or(o,/_/),O=r.a.or(i,/-/,/\d/,/\u00b7/,/[\u0300-\u036f]/,/[\u203f-\u2040]/),s=r.a.and(o,r.a.option(r.a.and(r.a.many(r.a.or(O,/\./)),O))),I=r.a.and(/%/,N,N),d=r.a.or(I,u),m=r.a.and(r.a.or(i,/:/,/\d/,d),r.a.option(r.a.and(r.a.many(r.a.or(O,/\./,/:/,d)),r.a.or(O,/:/,d)))),U=r.a.and(r.a.or(i,/\d/),r.a.many(r.a.or(i,/\d/,/\u00b7/,/[\u0300-\u036f]/,/[\u203f-\u2040]/))),l=r.a.and(/\[/,r.a.many(S),/\]/),C=r.a.and(/\(/,r.a.many(S),/\)/),f=r.a.and(/'/,r.a.many(r.a.or(/[^\u0027\u005C\u000A\u000D]/,c)),/'/),_=r.a.and(/"/,r.a.many(r.a.or(/[^\u0022\u005C\u000A\u000D]/,c)),/"/),p=r.a.and(/'''/,r.a.many(r.a.and(r.a.option(r.a.or(/'/,/''/)),r.a.or(/[^'\\]/,c))),/'''/),k=r.a.and(/"""/,r.a.many(r.a.and(r.a.option(r.a.or(/"/,/""/)),r.a.or(/[^"\\]/,c))),/"""/),D=r.a.or(r.a.and(/\d+\.\d*/,L),r.a.and(/\.\d+/,L),r.a.and(/\d+/,L)),P=r.a.and(/\+/,R),y=r.a.and(/\+/,A),b=r.a.and(/\+/,D),G=r.a.and(/-/,R),B=r.a.and(/-/,A),M=r.a.and(/-/,D),w=r.a.and(/\?/,U),F=r.a.and(/\$/,U),j=r.a.and(/_:/,r.a.or(i,/\d/),r.a.option(r.a.and(r.a.many(r.a.or(O,/\./)),O))),H=r.a.and(r.a.option(s),/:/),v=r.a.and(H,m)},4:function(e,n,t){"use strict";t.r(n),t.d(n,"terminals",function(){return R});var r=t(0),a=t(3),E=Object(r.createToken)({name:"STRING_LITERAL_LONG1",pattern:a.E}),o=Object(r.createToken)({name:"STRING_LITERAL_LONG2",pattern:a.F}),T=Object(r.createToken)({name:"PNAME_LN",pattern:a.u}),R={IRIREF:Object(r.createToken)({name:"IRIREF",pattern:a.p,label:"<http://example.com>"}),LANGTAG:Object(r.createToken)({name:"LANGTAG",pattern:a.q}),INTEGER:Object(r.createToken)({name:"INTEGER",pattern:a.m}),DECIMAL:Object(r.createToken)({name:"DECIMAL",pattern:a.d}),DOUBLE:Object(r.createToken)({name:"DOUBLE",pattern:a.g}),INTEGER_POSITIVE:Object(r.createToken)({name:"INTEGER_POSITIVE",pattern:a.o}),DECIMAL_POSITIVE:Object(r.createToken)({name:"DECIMAL_POSITIVE",pattern:a.f}),DOUBLE_POSITIVE:Object(r.createToken)({name:"DOUBLE_POSITIVE",pattern:a.i}),INTEGER_NEGATIVE:Object(r.createToken)({name:"INTEGER_NEGATIVE",pattern:a.n}),DECIMAL_NEGATIVE:Object(r.createToken)({name:"DECIMAL_NEGATIVE",pattern:a.e}),DOUBLE_NEGATIVE:Object(r.createToken)({name:"DOUBLE_NEGATIVE",pattern:a.h}),STRING_LITERAL_LONG1:E,STRING_LITERAL_LONG2:o,STRING_LITERAL1:Object(r.createToken)({name:"STRING_LITERAL1",pattern:a.C,longer_alt:E}),STRING_LITERAL2:Object(r.createToken)({name:"STRING_LITERAL2",pattern:a.D,longer_alt:o}),NIL:Object(r.createToken)({name:"NIL",pattern:a.r,label:"()"}),ANON:Object(r.createToken)({name:"ANON",pattern:a.a,label:"[]"}),PNAME_LN:T,PNAME_NS:Object(r.createToken)({name:"PNAME_NS",pattern:a.v,longer_alt:T}),BLANK_NODE_LABEL:Object(r.createToken)({name:"BLANK_NODE_LABEL",pattern:a.b}),VAR1:Object(r.createToken)({name:"VAR1",pattern:a.G,label:"?foo"}),VAR2:Object(r.createToken)({name:"VAR2",pattern:a.H,label:"?bar"}),PERCENT:Object(r.createToken)({name:"PERCENT",pattern:a.s})}},5:function(e,n,t){"use strict";t.r(n),t.d(n,"sparqlTokenMap",function(){return o}),t.d(n,"baseTokens",function(){return T}),t.d(n,"pathsTokens",function(){return R}),t.d(n,"nonStandardTokens",function(){return A}),t.d(n,"stardogSparqlTokens",function(){return c}),t.d(n,"sparqlTokenTypes",function(){return S});var r=t(0),a=t(4),E=t(1),o={IRIREF:a.terminals.IRIREF,LANGTAG:a.terminals.LANGTAG,INTEGER:a.terminals.INTEGER,DECIMAL:a.terminals.DECIMAL,DOUBLE:a.terminals.DOUBLE,INTEGER_POSITIVE:a.terminals.INTEGER_POSITIVE,DECIMAL_POSITIVE:a.terminals.DECIMAL_POSITIVE,DOUBLE_POSITIVE:a.terminals.DOUBLE_POSITIVE,INTEGER_NEGATIVE:a.terminals.INTEGER_NEGATIVE,DECIMAL_NEGATIVE:a.terminals.DECIMAL_NEGATIVE,DOUBLE_NEGATIVE:a.terminals.DOUBLE_NEGATIVE,STRING_LITERAL1:a.terminals.STRING_LITERAL1,STRING_LITERAL2:a.terminals.STRING_LITERAL2,STRING_LITERAL_LONG1:a.terminals.STRING_LITERAL_LONG1,STRING_LITERAL_LONG2:a.terminals.STRING_LITERAL_LONG2,NIL:a.terminals.NIL,ANON:a.terminals.ANON,PNAME_NS:a.terminals.PNAME_NS,PNAME_LN:a.terminals.PNAME_LN,BLANK_NODE_LABEL:a.terminals.BLANK_NODE_LABEL,VAR1:a.terminals.VAR1,VAR2:a.terminals.VAR2,PERCENT:a.terminals.PERCENT,Comment:Object(r.createToken)({name:"Comment",pattern:/#[^\n]*/,group:"comments"}),LCurly:Object(r.createToken)({name:"LCurly",pattern:"{"}),RCurly:Object(r.createToken)({name:"RCurly",pattern:"}"}),LParen:Object(r.createToken)({name:"LParen",pattern:"("}),RParen:Object(r.createToken)({name:"RParen",pattern:")"}),WhiteSpace:Object(r.createToken)({name:"WhiteSpace",pattern:/\s+/,group:r.Lexer.SKIPPED,line_breaks:!0}),Star:Object(r.createToken)({name:"Star",pattern:"*"}),UNKNOWN:E.keywords.UNKNOWN,Period:Object(r.createToken)({name:"Period",pattern:"."}),QuestionMark:Object(r.createToken)({name:"QuestionMark",pattern:"?"}),Plus:Object(r.createToken)({name:"Plus",pattern:"+"}),Minus:Object(r.createToken)({name:"Minus",pattern:"-"}),LBracket:Object(r.createToken)({name:"LBracket",pattern:"["}),RBracket:Object(r.createToken)({name:"RBracket",pattern:"]"}),Semicolon:Object(r.createToken)({name:"Semicolon",pattern:";"}),Comma:Object(r.createToken)({name:"Comma",pattern:","}),Pipe:Object(r.createToken)({name:"Pipe",pattern:"|"}),ForwardSlash:Object(r.createToken)({name:"ForwardSlash",pattern:"/"}),Caret:Object(r.createToken)({name:"Caret",pattern:"^"}),DoubleCaret:Object(r.createToken)({name:"DoubleCaret",pattern:"^^"}),Bang:Object(r.createToken)({name:"Bang",pattern:"!"}),LogicalOr:Object(r.createToken)({name:"LogicalOr",pattern:"||"}),LogicalAnd:Object(r.createToken)({name:"LogicalAnd",pattern:"&&"}),Equals:Object(r.createToken)({name:"Equals",pattern:"="}),NotEquals:Object(r.createToken)({name:"NotEquals",pattern:"!="}),LessThan:Object(r.createToken)({name:"LessThan",pattern:"<"}),GreaterThan:Object(r.createToken)({name:"GreaterThan",pattern:">"}),LessThanEquals:Object(r.createToken)({name:"LessThanEquals",pattern:"<="}),GreaterThanEquals:Object(r.createToken)({name:"GreaterThanEquals",pattern:">="}),LEmbed:Object(r.createToken)({name:"LEmbed",pattern:"<<"}),REmbed:Object(r.createToken)({name:"REmbed",pattern:">>"}),SELECT:E.keywords.SELECT,CONSTRUCT:E.keywords.CONSTRUCT,DISTINCT:E.keywords.DISTINCT,START:E.keywords.START,END:E.keywords.END,VIA:E.keywords.VIA,CYCLIC:E.keywords.CYCLIC,PATHS_SHORTEST:E.keywords.PATHS_SHORTEST,PATHS_ALL:E.keywords.PATHS_ALL,PATHS:E.keywords.PATHS,AS:E.keywords.AS,WHERE:E.keywords.WHERE,A:E.keywords.A,GROUP_BY:E.keywords.GROUP_BY,ORDER_BY:E.keywords.ORDER_BY,BY:E.keywords.BY,BASE:E.keywords.BASE,PREFIX:E.keywords.PREFIX,DESCRIBE:E.keywords.DESCRIBE,ASK:E.keywords.ASK,FROM:E.keywords.FROM,REDUCED:E.keywords.REDUCED,NAMED:E.keywords.NAMED,HAVING:E.keywords.HAVING,ASC:E.keywords.ASC,DESC:E.keywords.DESC,OFFSET:E.keywords.OFFSET,LIMIT:E.keywords.LIMIT,VALUES:E.keywords.VALUES,LOAD:E.keywords.LOAD,SILENT:E.keywords.SILENT,INTO:E.keywords.INTO,CLEAR:E.keywords.CLEAR,DROP:E.keywords.DROP,CREATE:E.keywords.CREATE,ADD:E.keywords.ADD,TO:E.keywords.TO,MOVE:E.keywords.MOVE,COPY:E.keywords.COPY,INSERT_DATA:E.keywords.INSERT_DATA,DELETE_DATA:E.keywords.DELETE_DATA,DELETE_WHERE:E.keywords.DELETE_WHERE,WITH:E.keywords.WITH,DELETE:E.keywords.DELETE,INSERT:E.keywords.INSERT,USING:E.keywords.USING,DEFAULT:E.keywords.DEFAULT,GRAPH:E.keywords.GRAPH,ALL:E.keywords.ALL,OPTIONAL:E.keywords.OPTIONAL,SERVICE:E.keywords.SERVICE,BIND:E.keywords.BIND,UNNEST:E.keywords.UNNEST,UNDEF:E.keywords.UNDEF,MINUS:E.keywords.MINUS,UNION:E.keywords.UNION,FILTER:E.keywords.FILTER,STR:E.keywords.STR,LANG:E.keywords.LANG,LANGMATCHES:E.keywords.LANGMATCHES,DATATYPE:E.keywords.DATATYPE,BOUND:E.keywords.BOUND,IRI:E.keywords.IRI,URI:E.keywords.URI,BNODE:E.keywords.BNODE,RAND:E.keywords.RAND,ABS:E.keywords.ABS,CEIL:E.keywords.CEIL,FLOOR:E.keywords.FLOOR,ROUND:E.keywords.ROUND,CONCAT:E.keywords.CONCAT,STRLEN:E.keywords.STRLEN,UCASE:E.keywords.UCASE,LCASE:E.keywords.LCASE,ENCODE_FOR_URI:E.keywords.ENCODE_FOR_URI,CONTAINS:E.keywords.CONTAINS,STRSTARTS:E.keywords.STRSTARTS,STRENDS:E.keywords.STRENDS,STRBEFORE:E.keywords.STRBEFORE,STRAFTER:E.keywords.STRAFTER,YEAR:E.keywords.YEAR,MONTH:E.keywords.MONTH,DAY:E.keywords.DAY,HOURS:E.keywords.HOURS,MINUTES:E.keywords.MINUTES,SECONDS:E.keywords.SECONDS,TIMEZONE:E.keywords.TIMEZONE,TZ:E.keywords.TZ,NOW:E.keywords.NOW,UUID:E.keywords.UUID,STRUUID:E.keywords.STRUUID,MD5:E.keywords.MD5,SHA1:E.keywords.SHA1,SHA256:E.keywords.SHA256,SHA384:E.keywords.SHA384,SHA512:E.keywords.SHA512,COALESCE:E.keywords.COALESCE,IF:E.keywords.IF,STRLANG:E.keywords.STRLANG,STRDT:E.keywords.STRDT,sameTerm:E.keywords.sameTerm,isIRI:E.keywords.isIRI,isURI:E.keywords.isURI,isBLANK:E.keywords.isBLANK,isLITERAL:E.keywords.isLITERAL,isNUMERIC:E.keywords.isNUMERIC,REGEX:E.keywords.REGEX,SUBSTR:E.keywords.SUBSTR,REPLACE:E.keywords.REPLACE,EXISTS:E.keywords.EXISTS,NOT_EXISTS:E.keywords.NOT_EXISTS,COUNT:E.keywords.COUNT,SUM:E.keywords.SUM,MIN:E.keywords.MIN,AVG:E.keywords.AVG,SAMPLE:E.keywords.SAMPLE,GROUP_CONCAT:E.keywords.GROUP_CONCAT,SEPARATOR:E.keywords.SEPARATOR,TRUE:E.keywords.TRUE,FALSE:E.keywords.FALSE,IN:E.keywords.IN,NOT_IN:E.keywords.NOT_IN,MAX_LENGTH:E.keywords.MAX_LENGTH,MAX:E.keywords.MAX},T=[o.NIL,o.ANON,o.LCurly,o.RCurly,o.LParen,o.RParen,o.WhiteSpace,o.IRIREF,o.LANGTAG,o.DOUBLE,o.DECIMAL,o.INTEGER,o.DOUBLE_POSITIVE,o.DECIMAL_POSITIVE,o.INTEGER_POSITIVE,o.DOUBLE_NEGATIVE,o.DECIMAL_NEGATIVE,o.INTEGER_NEGATIVE,o.STRING_LITERAL1,o.STRING_LITERAL2,o.STRING_LITERAL_LONG1,o.STRING_LITERAL_LONG2,o.PNAME_NS,o.PNAME_LN,o.BLANK_NODE_LABEL,o.VAR1,o.VAR2,o.Comment,o.SELECT,o.CONSTRUCT,o.DISTINCT,o.Star,o.WHERE,o.GROUP_BY,o.ORDER_BY,o.BY,o.Period,o.QuestionMark,o.Plus,o.Minus,o.LBracket,o.RBracket,o.PERCENT,o.BASE,o.PREFIX,o.DESCRIBE,o.ASK,o.FROM,o.REDUCED,o.NAMED,o.HAVING,o.ASC,o.DESC,o.OFFSET,o.LIMIT,o.VALUES,o.LOAD,o.SILENT,o.INTO,o.AS,o.CLEAR,o.DROP,o.CREATE,o.ADD,o.TO,o.MOVE,o.COPY,o.INSERT_DATA,o.DELETE_DATA,o.DELETE_WHERE,o.WITH,o.DELETE,o.INSERT,o.USING,o.DEFAULT,o.GRAPH,o.ALL,o.OPTIONAL,o.SERVICE,o.BIND,o.UNDEF,o.MINUS,o.UNION,o.FILTER,o.LANGMATCHES,o.LANG,o.DATATYPE,o.BOUND,o.IRI,o.URI,o.BNODE,o.RAND,o.ABS,o.CEIL,o.FLOOR,o.ROUND,o.CONCAT,o.STRLEN,o.UCASE,o.LCASE,o.ENCODE_FOR_URI,o.CONTAINS,o.STRSTARTS,o.STRENDS,o.STRBEFORE,o.STRAFTER,o.YEAR,o.MONTH,o.DAY,o.HOURS,o.MINUTES,o.SECONDS,o.TIMEZONE,o.TZ,o.NOW,o.UUID,o.STRUUID,o.MD5,o.SHA1,o.SHA256,o.SHA384,o.SHA512,o.COALESCE,o.IF,o.STRLANG,o.STRDT,o.STR,o.sameTerm,o.isIRI,o.isURI,o.isBLANK,o.isLITERAL,o.isNUMERIC,o.REGEX,o.SUBSTR,o.REPLACE,o.EXISTS,o.NOT_EXISTS,o.COUNT,o.SUM,o.MIN,o.MAX_LENGTH,o.MAX,o.AVG,o.SAMPLE,o.GROUP_CONCAT,o.SEPARATOR,o.TRUE,o.FALSE,o.Semicolon,o.Comma,o.ForwardSlash,o.DoubleCaret,o.Caret,o.LogicalOr,o.Pipe,o.LogicalAnd,o.NotEquals,o.Bang,o.Equals,o.LessThanEquals,o.GreaterThanEquals,o.LEmbed,o.REmbed,o.LessThan,o.GreaterThan,o.IN,o.NOT_IN,o.A,o.UNKNOWN],R=[o.START,o.END,o.VIA,o.CYCLIC,o.PATHS_SHORTEST,o.PATHS_ALL,o.PATHS],A=R.concat([o.UNNEST]),L=T.indexOf(o.SELECT),c=T.slice(0,L).concat(A,T.slice(L)),S=T.concat(A)},63:function(e,n,t){"use strict";t.r(n),t.d(n,"turtleTokens",function(){return a});var r=t(14);t.d(n,"TurtleParser",function(){return r.a});var a=t(9)},9:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t(2),E=t(3),o=/\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\[uU]|\\(.)/g,T={"\\":"\\","'":"'",'"':'"',n:"\n",r:"\r",t:"\t",f:"\f",b:"\b",_:"_","~":"~",".":".","-":"-","!":"!",$:"$","&":"&","(":"(",")":")","*":"*","+":"+",",":",",";":";","=":"=","/":"/","?":"?","#":"#","@":"@","%":"%"},R=/^"([^"\\\r\n]+)"/,A=/^'([^'\\\r\n]+)'/,L=/^"((?:[^"\\\r\n]|\\.)*)"(?=[^"])/,c=/^'((?:[^'\\\r\n]|\\.)*)'(?=[^'])/,S=/^"""([^"\\]*(?:(?:\\.|"(?!""))[^"\\]*)*)"""/,N=/^'''([^'\\]*(?:(?:\\.|'(?!''))[^'\\]*)*)'''/,u=/[\x00-\x20<>\\"\{\}\|\^\`]/,i=/^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/,O=/^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/,s=function(e){try{return e.replace(o,function(e,n,t,r){if(n)return String.fromCharCode(parseInt(n,16));if(t){var a=parseInt(t,16);return a<=65535?String.fromCharCode(a):String.fromCharCode(55296+(a-=65536)/1024,56320+(1023&a))}var E=T[r];if(!E)throw new Error;return E})}catch(e){return null}};t.d(n,"turtleTokenMap",function(){return m}),t.d(n,"turtleTokenTypes",function(){return U});var I=t(5).sparqlTokenMap,d=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,m={Comment:Object(r.createToken)({name:"Comment",pattern:/#[^\n]*/,group:"comments"}),LBracket:I.LBracket,RBracket:I.RBracket,LCurly:I.LCurly,RCurly:I.RCurly,LParen:I.LParen,RParen:I.RParen,Period:I.Period,WhiteSpace:I.WhiteSpace,TRUE:Object(r.createToken)({name:"TRUE",pattern:/true/}),FALSE:Object(r.createToken)({name:"FALSE",pattern:/false/}),DoubleCaret:I.DoubleCaret,LEmbed:I.LEmbed,REmbed:I.REmbed,Comma:I.Comma,Semicolon:I.Semicolon,A:I.A,PREFIX:I.PREFIX,BASE:I.BASE,PNAME_NS:I.PNAME_NS,PNAME_LN:I.PNAME_LN,BLANK_NODE_LABEL:I.BLANK_NODE_LABEL,TTL_BASE:Object(r.createToken)({name:"TTL_BASE",pattern:/@base/}),TTL_PREFIX:Object(r.createToken)({name:"TTL_PREFIX",pattern:/@prefix/}),LANGTAG:I.LANGTAG,INTEGER:Object(r.createToken)({name:"INTEGER",pattern:a.a.and(a.a.option(/[+-]/),/\d+/)}),DECIMAL:Object(r.createToken)({name:"DECIMAL",pattern:a.a.and(a.a.option(/[+-]/),/(\d*\.\d+)/)}),DOUBLE:Object(r.createToken)({name:"DOUBLE",pattern:a.a.and(a.a.option(/[+-]/),a.a.or(a.a.and(/\d+\.\d*/,E.k),a.a.and(/\.\d+/,E.k),a.a.and(/\d+/,E.k)))}),EXPONENT:Object(r.createToken)({name:"EXPONENT",pattern:E.k}),ECHAR:Object(r.createToken)({name:"ECHAR",pattern:E.j}),ANON:I.ANON,PLX:Object(r.createToken)({name:"PLX",pattern:E.t}),PERCENT:I.PERCENT,HEX:Object(r.createToken)({name:"HEX",pattern:E.l}),STRING_LITERAL_LONG_SINGLE_QUOTE:Object(r.createToken)({name:"STRING_LITERAL_LONG_SINGLE_QUOTE",pattern:function(e,n){void 0===n&&(n=0);var t=N.exec(e.slice(n));return t&&null!==s(t[1])?t:null},line_breaks:!0}),STRING_LITERAL_LONG_QUOTE:Object(r.createToken)({name:"STRING_LITERAL_LONG_QUOTE",pattern:function(e,n){void 0===n&&(n=0);var t=S.exec(e.slice(n));return t&&null!==s(t[1])?t:null},line_breaks:!0}),STRING_LITERAL_QUOTE:Object(r.createToken)({name:"STRING_LITERAL_QUOTE",pattern:function(e,n){void 0===n&&(n=0);var t=e.slice(n),r=R.exec(t);return r||((r=L.exec(t))?null===s(r[1])?null:r:null)},line_breaks:!1}),STRING_LITERAL_SINGLE_QUOTE:Object(r.createToken)({name:"STRING_LITERAL_SINGLE_QUOTE",pattern:function(e,n){void 0===n&&(n=0);var t=e.slice(n),r=A.exec(t);return r||((r=c.exec(t))?null===s(r[1])?null:r:null)},line_breaks:!1}),UCHAR:Object(r.createToken)({name:"UCHAR",pattern:function(e,n){return void 0===n&&(n=0),d.exec(e.slice(n))},line_breaks:!1}),IRIREF:Object(r.createToken)({name:"IRIREF",pattern:function(e,n){void 0===n&&(n=0);var t=e.slice(n),r=O.exec(t);if(r)return r;if(!(r=i.exec(t)))return null;var a=s(r[1]);return null===a||u.test(a)?null:r},line_breaks:!1}),PN_CHARS_BASE:Object(r.createToken)({name:"PN_CHARS_BASE",pattern:E.x}),PN_CHARS_U:Object(r.createToken)({name:"PN_CHARS_U",pattern:E.y}),PN_CHARS:Object(r.createToken)({name:"PN_CHARS",pattern:E.w}),PN_PREFIX:Object(r.createToken)({name:"PN_PREFIX",pattern:E.B}),PN_LOCAL:Object(r.createToken)({name:"PN_LOCAL",pattern:E.z}),PN_LOCAL_ESC:Object(r.createToken)({name:"PN_LOCAL_ESC",pattern:E.A}),UNKNOWN:I.UNKNOWN},U=[m.Comment,I.ANON,I.LBracket,I.RBracket,I.LCurly,I.RCurly,I.LParen,I.RParen,I.WhiteSpace,m.TRUE,m.FALSE,I.Comma,I.Semicolon,I.PNAME_NS,I.A,I.PREFIX,I.BASE,I.PNAME_LN,I.BLANK_NODE_LABEL,m.TTL_BASE,m.TTL_PREFIX,I.LANGTAG,m.DOUBLE,m.DECIMAL,I.Period,I.DoubleCaret,m.LEmbed,m.REmbed,m.IRIREF,m.STRING_LITERAL_LONG_SINGLE_QUOTE,m.STRING_LITERAL_LONG_QUOTE,m.STRING_LITERAL_QUOTE,m.STRING_LITERAL_SINGLE_QUOTE,m.INTEGER,m.EXPONENT,m.PLX,I.PERCENT,m.HEX,m.PN_CHARS_BASE,m.PN_CHARS_U,m.PN_CHARS,m.PN_PREFIX,m.PN_LOCAL,m.PN_LOCAL_ESC,m.ECHAR,m.UCHAR,m.UNKNOWN]}})});
//# sourceMappingURL=millan.turtle.js.map