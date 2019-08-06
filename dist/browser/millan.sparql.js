!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("sparql",[],t):"object"==typeof exports?exports.sparql=t():(n.millan=n.millan||{},n.millan.sparql=t())}("undefined"!=typeof self?self:this,function(){return function(n){function t(t){for(var u,o,l=t[0],U=t[1],a=t[2],c=0,f=[];c<l.length;c++)o=l[c],e[o]&&f.push(e[o][0]),e[o]=0;for(u in U)Object.prototype.hasOwnProperty.call(U,u)&&(n[u]=U[u]);for(L&&L(t);f.length;)f.shift()();return i.push.apply(i,a||[]),r()}function r(){for(var n,t=0;t<i.length;t++){for(var r=i[t],u=!0,l=1;l<r.length;l++){var U=r[l];0!==e[U]&&(u=!1)}u&&(i.splice(t--,1),n=o(o.s=r[0]))}return n}var u={},e={5:0},i=[];function o(t){if(u[t])return u[t].exports;var r=u[t]={i:t,l:!1,exports:{}};return n[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=n,o.c=u,o.d=function(n,t,r){o.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},o.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},o.t=function(n,t){if(1&t&&(n=o(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var u in n)o.d(r,u,function(t){return n[t]}.bind(null,u));return r},o.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return o.d(t,"a",t),t},o.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},o.p="";var l=("undefined"!=typeof self?self:this).webpackJsonp=("undefined"!=typeof self?self:this).webpackJsonp||[],U=l.push.bind(l);l.push=t,l=l.slice();for(var a=0;a<l.length;a++)t(l[a]);var L=U;return i.push([63,0,1]),r()}({17:function(n,t,r){"use strict";r.d(t,"a",function(){return StardogSparqlParser});var u,e=r(13),i=r(0),o=(u=function(n,t){return(u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}u(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),l=r(5),U=l.sparqlTokenMap,a=l.stardogSparqlTokens,StardogSparqlParser=function(n){function StardogSparqlParser(t){var r=n.call(this,t,a)||this;return r.Query=r.OVERRIDE_RULE("Query",function(){r.OR([{ALT:function(){return r.SUBRULE(r.SelectQuery)}},{ALT:function(){return r.SUBRULE(r.ConstructQuery)}},{ALT:function(){return r.SUBRULE(r.DescribeQuery)}},{ALT:function(){return r.SUBRULE(r.AskQuery)}},{ALT:function(){return r.SUBRULE(r.PathQuery)}}]),r.SUBRULE(r.ValuesClause)}),r.PathQuery=r.RULE("PathQuery",function(){r.SUBRULE(r.PathSpec),r.MANY(function(){return r.SUBRULE(r.DatasetClause)}),r.CONSUME(U.START),r.SUBRULE(r.PathTerminal),r.CONSUME(U.END),r.SUBRULE1(r.PathTerminal),r.SUBRULE(r.Via),r.OPTION(function(){return r.SUBRULE(r.MaxLength)}),r.SUBRULE(r.SolutionModifier)}),r.Via=r.RULE("Via",function(){r.CONSUME(U.VIA),r.OR([{ALT:function(){return r.SUBRULE(r.GroupGraphPattern)}},{ALT:function(){return r.SUBRULE(r.Var)}},{ALT:function(){return r.SUBRULE(r.Path)}}])}),r.PathTerminal=r.RULE("PathTerminal",function(){r.SUBRULE(r.Var),r.OPTION(function(){r.OR([{ALT:function(){r.CONSUME(U.Equals),r.SUBRULE(r.iri)}},{ALT:function(){return r.SUBRULE(r.GroupGraphPattern)}}])})}),r.PathSpec=r.RULE("PathSpec",function(){r.OR([{ALT:function(){return r.CONSUME(U.PATHS)}},{ALT:function(){return r.CONSUME(U.PATHS_SHORTEST)}},{ALT:function(){return r.CONSUME(U.PATHS_ALL)}}]),r.OPTION1(function(){return r.CONSUME(U.CYCLIC)})}),r.GraphPatternNotTriples=r.OVERRIDE_RULE("GraphPatternNotTriples",function(){r.OR([{ALT:function(){return r.SUBRULE(r.GroupOrUnionGraphPattern)}},{ALT:function(){return r.SUBRULE(r.OptionalGraphPattern)}},{ALT:function(){return r.SUBRULE(r.MinusGraphPattern)}},{ALT:function(){return r.SUBRULE(r.GraphGraphPattern)}},{ALT:function(){return r.SUBRULE(r.ServiceGraphPattern)}},{ALT:function(){return r.SUBRULE(r.Filter)}},{ALT:function(){return r.SUBRULE(r.Bind)}},{ALT:function(){return r.SUBRULE(r.Unnest)}},{ALT:function(){return r.SUBRULE(r.InlineData)}}])}),r.Unnest=r.RULE("Unnest",function(){r.CONSUME(U.UNNEST),r.CONSUME(U.LParen),r.SUBRULE(r.Expression),r.CONSUME(U.AS),r.SUBRULE(r.Var),r.CONSUME(U.RParen)}),r.BuiltInCall=r.OVERRIDE_RULE("BuiltInCall",function(){r.OR([{ALT:function(){return r.SUBRULE(r.Aggregate)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_STR)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_LANG)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_LANGMATCHES)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_DATATYPE)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_BOUND)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_IRI)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_URI)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_BNODE)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_RAND)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_ABS)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_CEIL)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_FLOOR)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_ROUND)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_CONCAT)}},{ALT:function(){return r.SUBRULE(r.SubstringExpression)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_STRLEN)}},{ALT:function(){return r.SUBRULE(r.StrReplaceExpression)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_UCASE)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_LCASE)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_ENCODE_FOR_URI)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_CONTAINS)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_STRSTARTS)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_STRENDS)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_STRBEFORE)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_STRAFTER)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_YEAR)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_MONTH)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_DAY)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_HOURS)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_MINUTES)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_SECONDS)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_TIMEZONE)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_TZ)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_NOW)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_UUID)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_STRUUID)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_MD5)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_SHA1)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_SHA256)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_SHA384)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_SHA512)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_COALESCE)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_IF)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_STRLANG)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_STRDT)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_sameTerm)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_isIRI)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_isURI)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_isBlank)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_isLiteral)}},{ALT:function(){return r.SUBRULE(r.BuiltInCall_isNumeric)}},{ALT:function(){return r.SUBRULE(r.RegexExpression)}},{ALT:function(){return r.SUBRULE(r.ExistsFunction)}},{ALT:function(){return r.SUBRULE(r.NotExistsFunction)}},{ALT:function(){return r.SUBRULE(r.StardogOrCustomFunction)}}])}),r.StardogOrCustomFunction=r.RULE("StardogOrCustomFunction",function(){r.CONSUME(U.Unknown),r.SUBRULE(r.ExpressionList)}),r.ConstructTemplate=r.OVERRIDE_RULE("ConstructTemplate",function(){r.CONSUME(U.LCurly),r.OPTION(function(){return r.SUBRULE(r.Quads)}),r.CONSUME(U.RCurly)}),i.Parser.performSelfAnalysis(r),r}return o(StardogSparqlParser,n),StardogSparqlParser}(e.a)},18:function(n,t,r){"use strict";r.d(t,"a",function(){return W3SpecSparqlParser});var u,e=r(13),i=r(0),o=(u=function(n,t){return(u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}u(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),l=r(5).baseTokens,W3SpecSparqlParser=function(n){function W3SpecSparqlParser(t){var r=n.call(this,t,l)||this;return i.Parser.performSelfAnalysis(r),r}return o(W3SpecSparqlParser,n),W3SpecSparqlParser}(e.a)},63:function(n,t,r){"use strict";r.r(t),r.d(t,"sparqlTokens",function(){return o}),r.d(t,"keywords",function(){return l}),r.d(t,"terminals",function(){return U});var u=r(13);r.d(t,"BaseSparqlParser",function(){return u.a});var e=r(18);r.d(t,"W3SpecSparqlParser",function(){return e.a});var i=r(17);r.d(t,"StardogSparqlParser",function(){return i.a});var o=r(5),l=r(1).keywords,U=r(4).terminals}})});
//# sourceMappingURL=millan.sparql.js.map