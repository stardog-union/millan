!function(n,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("graphql",[],e):"object"==typeof exports?exports.graphql=e():(n.millan=n.millan||{},n.millan.graphql=e())}("undefined"!=typeof self?self:this,function(){return function(n){function e(e){for(var r,u,a=e[0],c=e[1],f=e[2],U=0,p=[];U<a.length;U++)u=a[U],i[u]&&p.push(i[u][0]),i[u]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(n[r]=c[r]);for(E&&E(e);p.length;)p.shift()();return o.push.apply(o,f||[]),t()}function t(){for(var n,e=0;e<o.length;e++){for(var t=o[e],r=!0,a=1;a<t.length;a++){var c=t[a];0!==i[c]&&(r=!1)}r&&(o.splice(e--,1),n=u(u.s=t[0]))}return n}var r={},i={2:0},o=[];function u(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.m=n,u.c=r,u.d=function(n,e,t){u.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},u.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},u.t=function(n,e){if(1&e&&(n=u(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)u.d(t,r,function(e){return n[e]}.bind(null,r));return t},u.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return u.d(e,"a",e),e},u.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},u.p="";var a=("undefined"!=typeof self?self:this).webpackJsonp=("undefined"!=typeof self?self:this).webpackJsonp||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var f=0;f<a.length;f++)e(a[f]);var E=c;return o.push([64,0,1]),t()}({18:function(n,e,t){"use strict";t.r(e),t.d(e,"graphQlTokenMap",function(){return I}),t.d(e,"graphQlTokens",function(){return l}),t.d(e,"stardogGraphQlTokenMap",function(){return b}),t.d(e,"stardogGraphQlTokens",function(){return _});var r=t(1),i=t(2),o=t(3),u=function(){return(u=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var i in e=arguments[t])Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}).apply(this,arguments)},a=/\-?(?:0|[1-9][0-9]*)/,c=/[eE][+-]?[0-9]+/,f=i.a.and(/"/,i.a.many(i.a.or(/[\u0009\u0020\u0021\u0023-\u005B\u005D-\uFFFF]/,/\\u[0-9A-Fa-f]{4}/,/\\["\\\/bfnrt]/)),/"/),E=/true|false/,U=/null/,p=/on/,l=[],s=function(n){var e=[O];return n.pattern!==E&&n.pattern!==U&&e.push(L),n.pattern!==p&&e.push(N),T({name:n.name,pattern:n.pattern,longer_alt:O,categories:e})},S=function(n){return T(u({},n,{categories:[m]}))},T=function(n){var e=Object(r.createToken)(n);return l.push(e),e},O=Object(r.createToken)({name:"Name",pattern:/[_A-Za-z][_0-9A-Za-z]*/}),L=Object(r.createToken)({name:"EnumValueToken",pattern:r.Lexer.NA}),N=Object(r.createToken)({name:"FragmentName",pattern:r.Lexer.NA}),R=Object(r.createToken)({name:"StringValueToken",pattern:r.Lexer.NA}),m=Object(r.createToken)({name:"Punctuator",pattern:r.Lexer.NA});O.CATEGORIES.push(L,N);var A={WhiteSpace:T({name:"WhiteSpace",pattern:/[ \t]+/,group:r.Lexer.SKIPPED}),UnicodeBOM:T({name:"UnicodeBOM",pattern:"\\uFFFE",group:r.Lexer.SKIPPED}),LineTerminator:T({name:"LineTerminator",pattern:/\n\r|\r|\n/,group:r.Lexer.SKIPPED}),Comment:T({name:"Comment",pattern:/#[^\n\r]*/,group:r.Lexer.SKIPPED}),Comma:T({name:"Comma",pattern:",",group:r.Lexer.SKIPPED})},d={Bang:S({name:"Bang",pattern:"!"}),Dollar:S({name:"Dollar",pattern:"$"}),LParen:S({name:"LParen",pattern:"("}),RParen:S({name:"RParen",pattern:")"}),Spread:S({name:"Spread",pattern:"..."}),Colon:S({name:"Colon",pattern:":"}),Equals:S({name:"Equals",pattern:"="}),At:S({name:"At",pattern:"@"}),LBracket:S({name:"LBracket",pattern:"["}),RBracket:S({name:"RBracket",pattern:"]"}),LCurly:S({name:"LCurly",pattern:"{"}),RCurly:S({name:"RCurly",pattern:"}"}),Pipe:S({name:"Pipe",pattern:"|"}),Amp:S({name:"Amp",pattern:"&"}),Punctuator:m},y={FloatValueToken:T({name:"FloatValueToken",pattern:i.a.and(a,i.a.or(i.a.and(/\.[0-9]+/,i.a.option(c)),c))}),IntValueToken:T({name:"IntValueToken",pattern:a}),BlockStringToken:T({name:"BlockStringToken",pattern:o.F,categories:[R]}),StringToken:T({name:"StringToken",pattern:f,categories:[R]}),BooleanValueToken:T({name:"BooleanValueToken",pattern:E,longer_alt:O}),NullValueToken:T({name:"NullValueToken",pattern:U,longer_alt:O}),EnumValueToken:L,FragmentName:N,Name:O,StringValueToken:R},D={Query:s({name:"Query",pattern:"query"}),Mutation:s({name:"Mutation",pattern:"mutation"}),Subscription:s({name:"Subscription",pattern:"subscription"}),Fragment:s({name:"Fragment",pattern:"fragment"}),On:s({name:"On",pattern:p}),Schema:s({name:"Schema",pattern:"schema"}),Extend:s({name:"Extend",pattern:"extend"}),Scalar:s({name:"Scalar",pattern:"scalar"}),TypeToken:s({name:"TypeToken",pattern:"type"}),Implements:s({name:"Implements",pattern:"implements"}),Interface:s({name:"Interface",pattern:"interface"}),Union:s({name:"Union",pattern:"union"}),Enum:s({name:"Enum",pattern:"enum"}),Input:s({name:"Input",pattern:"input"}),DirectiveToken:s({name:"DirectiveToken",pattern:"directive"}),QUERY:s({name:"QUERY",pattern:"QUERY"}),MUTATION:s({name:"MUTATION",pattern:"MUTATION"}),SUBSCRIPTION:s({name:"SUBSCRIPTION",pattern:"SUBSCRIPTION"}),FRAGMENT_DEFINITION:s({name:"FRAGMENT_DEFINITION",pattern:"FRAGMENT_DEFINITION"}),FRAGMENT_SPREAD:s({name:"FRAGMENT_SPREAD",pattern:"FRAGMENT_SPREAD"}),INLINE_FRAGMENT:s({name:"INLINE_FRAGMENT",pattern:"INLINE_FRAGMENT"}),SCHEMA:s({name:"SCHEMA",pattern:"SCHEMA"}),SCALAR:s({name:"SCALAR",pattern:"SCALAR"}),OBJECT:s({name:"OBJECT",pattern:"OBJECT"}),FIELD_DEFINITION:s({name:"FIELD_DEFINITION",pattern:"FIELD_DEFINITION"}),FIELD:s({name:"FIELD",pattern:"FIELD"}),ARGUMENT_DEFINITION:s({name:"ARGUMENT_DEFINITION",pattern:"ARGUMENT_DEFINITION"}),INTERFACE:s({name:"INTERFACE",pattern:"INTERFACE"}),UNION:s({name:"UNION",pattern:"UNION"}),ENUM_VALUE:s({name:"ENUM_VALUE",pattern:"ENUM_VALUE"}),ENUM:s({name:"ENUM",pattern:"ENUM"}),INPUT_OBJECT:s({name:"INPUT_OBJECT",pattern:"INPUT_OBJECT"}),INPUT_FIELD_DEFINITION:s({name:"INPUT_FIELD_DEFINITION",pattern:"INPUT_FIELD_DEFINITION"})},I=u({},A,d,y,D,{Name:O}),C=Object(r.createToken)({name:"StardogDirective",pattern:r.Lexer.NA}),g=Object(r.createToken)({name:"SparqlReceivingStardogDirective",pattern:r.Lexer.NA}),M=Object(r.createToken)({name:"StardogArgument",pattern:r.Lexer.NA}),B=Object(r.createToken)({name:"TopLevel",pattern:r.Lexer.NA}),v=["optional","bind","hide","skip","include","filter","prefix","config"].sort().reduce(function(n,e){var t,i=""+e[0].toUpperCase()+e.slice(1)+"DirectiveToken",o=[O,L,N,C];["prefix","config"].includes(e)&&o.push(B),["bind","skip","include","filter"].includes(e)&&o.push(g);var a=Object(r.createToken)({name:i,pattern:e,categories:o,longer_alt:O});return u({},n,{tokenMap:u({},n.tokenMap,(t={},t[i]=a,t)),orderedTokens:n.orderedTokens.concat(a)})},{tokenMap:{},orderedTokens:[]}),P=["orderBy","first","to","if","alias","graph","offset","limit","iri"].sort().reduce(function(n,e){var t,i=""+e[0].toUpperCase()+e.slice(1)+"ArgumentToken",o=[O,L,N,M];["orderBy","first","limit","offset"].includes(e)&&o.push(B);var a=Object(r.createToken)({name:i,pattern:e,categories:o,longer_alt:O});return u({},n,{tokenMap:u({},n.tokenMap,(t={},t[i]=a,t)),orderedTokens:n.orderedTokens.concat(a)})},{tokenMap:{},orderedTokens:[]}),h=Object(r.createToken)({name:"OrderByArgumentFieldPropertyToken",pattern:"field",categories:[O,L,N],longer_alt:O}),k=Object(r.createToken)({name:"OrderByArgumentDescPropertyToken",pattern:"desc",categories:[O,L,N],longer_alt:O}),b=u({},I,v.tokenMap,P.tokenMap,{OrderByArgumentFieldPropertyToken:h,OrderByArgumentDescPropertyToken:k,StardogDirective:C,SparqlReceivingStardogDirective:g,StardogArgument:M,TopLevel:B}),_=l.concat(v.orderedTokens,P.orderedTokens,[h,k,C,g,M,B]),F=[N,L,O,R,m];l.push.apply(l,F),_.push.apply(_,F)},64:function(n,e,t){"use strict";t.r(e);var r,i=t(1),o=(r=function(n,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])})(n,e)},function(n,e){function t(){this.constructor=n}r(n,e),n.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}),u=function(){return(u=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var i in e=arguments[t])Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}).apply(this,arguments)},a=t(18).graphQlTokenMap,c=function(n){function BaseGraphQlParser(e,t){void 0===e&&(e={});var r=n.call(this,t,u({recoveryEnabled:!0,outputCst:!0},e.config))||this;return r.tokenize=function(n){return r.lexer.tokenize(n).tokens},r.parse=function(n,e){void 0===e&&(e=r.Document),r.input=r.lexer.tokenize(n).tokens;var t=e.call(r);return{errors:r.errors,cst:t}},r.Document=r.RULE("Document",function(){r.AT_LEAST_ONE(function(){return r.SUBRULE(r.Definition)})}),r.Definition=r.RULE("Definition",function(){r.OR([{ALT:function(){return r.SUBRULE(r.ExecutableDefinition)}},{ALT:function(){return r.SUBRULE(r.TypeSystemDefinition)}},{ALT:function(){return r.SUBRULE(r.TypeSystemExtension)}}])}),r.ExecutableDefinition=r.RULE("ExecutableDefinition",function(){r.OR([{ALT:function(){return r.SUBRULE(r.OperationDefinition)}},{ALT:function(){return r.SUBRULE(r.FragmentDefinition)}}])}),r.OperationDefinition=r.RULE("OperationDefinition",function(){r.OR([{ALT:function(){return r.SUBRULE(r.SelectionSet)}},{ALT:function(){r.SUBRULE(r.OperationType),r.OPTION(function(){return r.CONSUME(a.Name)}),r.OPTION1(function(){return r.SUBRULE(r.VariableDefinitions)}),r.OPTION2(function(){return r.SUBRULE(r.Directives)}),r.SUBRULE1(r.SelectionSet)}}])}),r.OperationType=r.RULE("OperationType",function(){r.OR([{ALT:function(){return r.CONSUME(a.Query)}},{ALT:function(){return r.CONSUME(a.Mutation)}},{ALT:function(){return r.CONSUME(a.Subscription)}}])}),r.SelectionSet=r.RULE("SelectionSet",function(){r.CONSUME(a.LCurly),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.Selection)}),r.CONSUME(a.RCurly)}),r.Selection=r.RULE("Selection",function(){r.OR([{ALT:function(){return r.SUBRULE(r.Field)}},{ALT:function(){return r.SUBRULE(r.InlineFragment)}},{ALT:function(){return r.SUBRULE(r.FragmentSpread)}}])}),r.Field=r.RULE("Field",function(){r.OPTION(function(){return r.SUBRULE(r.Alias)}),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.Arguments,{ARGS:[!1]})}),r.OPTION2(function(){return r.SUBRULE(r.Directives)}),r.OPTION3(function(){return r.SUBRULE(r.SelectionSet)})}),r.Alias=r.RULE("Alias",function(){r.CONSUME(a.Name),r.CONSUME(a.Colon)}),r.Arguments=r.RULE("Arguments",function(n){r.CONSUME(a.LParen),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.Argument,{ARGS:[n]})}),r.CONSUME(a.RParen)}),r.Argument=r.RULE("Argument",function(n){r.SUBRULE(r.Alias),r.SUBRULE(r.Value,{ARGS:[n]})}),r.FragmentSpread=r.RULE("FragmentSpread",function(){r.CONSUME(a.Spread),r.CONSUME(a.FragmentName),r.OPTION(function(){return r.SUBRULE(r.Directives)})}),r.InlineFragment=r.RULE("InlineFragment",function(){r.CONSUME(a.Spread),r.OPTION(function(){return r.SUBRULE(r.TypeCondition)}),r.OPTION1(function(){return r.SUBRULE(r.Directives)}),r.SUBRULE(r.SelectionSet)}),r.FragmentDefinition=r.RULE("FragmentDefinition",function(){r.CONSUME(a.Fragment),r.CONSUME(a.FragmentName),r.SUBRULE(r.TypeCondition),r.OPTION(function(){return r.SUBRULE(r.Directives)}),r.SUBRULE(r.SelectionSet)}),r.TypeCondition=r.RULE("TypeCondition",function(){r.CONSUME(a.On),r.SUBRULE(r.NamedType)}),r.Value=r.RULE("Value",function(n){r.OR([{GATE:function(){return!n},ALT:function(){return r.SUBRULE(r.Variable)}},{ALT:function(){return r.SUBRULE(r.IntValue)}},{ALT:function(){return r.SUBRULE(r.FloatValue)}},{ALT:function(){return r.SUBRULE(r.StringValue)}},{ALT:function(){return r.SUBRULE(r.BooleanValue)}},{ALT:function(){return r.SUBRULE(r.NullValue)}},{ALT:function(){return r.SUBRULE(r.EnumValue)}},{ALT:function(){return r.SUBRULE(r.ListValue,{ARGS:[n]})}},{ALT:function(){return r.SUBRULE(r.ObjectValue,{ARGS:[n]})}}])}),r.IntValue=r.RULE("IntValue",function(){r.CONSUME(a.IntValueToken)}),r.FloatValue=r.RULE("FloatValue",function(){r.CONSUME(a.FloatValueToken)}),r.StringValue=r.RULE("StringValue",function(){r.CONSUME(a.StringValueToken)}),r.BooleanValue=r.RULE("BooleanValue",function(){r.CONSUME(a.BooleanValueToken)}),r.NullValue=r.RULE("NullValue",function(){r.CONSUME(a.NullValueToken)}),r.EnumValue=r.RULE("EnumValue",function(){r.CONSUME(a.EnumValueToken)}),r.ListValue=r.RULE("ListValue",function(n){r.CONSUME(a.LBracket),r.MANY(function(){return r.SUBRULE(r.Value,{ARGS:[n]})}),r.CONSUME(a.RBracket)}),r.ObjectValue=r.RULE("ObjectValue",function(n){r.CONSUME(a.LCurly),r.MANY(function(){return r.SUBRULE(r.ObjectField,{ARGS:[n]})}),r.CONSUME(a.RCurly)}),r.ObjectField=r.RULE("ObjectField",function(n){r.SUBRULE(r.Alias),r.SUBRULE(r.Value,{ARGS:[n]})}),r.VariableDefinitions=r.RULE("VariableDefinitions",function(){r.CONSUME(a.LParen),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.VariableDefinition)}),r.CONSUME(a.RParen)}),r.VariableDefinition=r.RULE("VariableDefinition",function(){r.SUBRULE(r.Variable),r.CONSUME(a.Colon),r.SUBRULE(r.Type),r.OPTION(function(){return r.SUBRULE(r.DefaultValue)})}),r.Variable=r.RULE("Variable",function(){r.CONSUME(a.Dollar),r.CONSUME(a.Name)}),r.DefaultValue=r.RULE("DefaultValue",function(){r.CONSUME(a.Equals),r.SUBRULE(r.Value,{ARGS:[!0]})}),r.Type=r.RULE("Type",function(){r.OR([{ALT:function(){return r.SUBRULE(r.NamedType)}},{ALT:function(){return r.SUBRULE(r.ListType)}}]),r.OPTION(function(){return r.CONSUME(a.Bang)})}),r.NamedType=r.RULE("NamedType",function(){r.CONSUME(a.Name)}),r.ListType=r.RULE("ListType",function(){r.CONSUME(a.LBracket),r.SUBRULE(r.Type),r.CONSUME(a.RBracket)}),r.Directives=r.RULE("Directives",function(n){r.AT_LEAST_ONE(function(){return r.SUBRULE(r.Directive,{ARGS:[n]})})}),r.Directive=r.RULE("Directive",function(n){r.CONSUME(a.At),r.CONSUME(a.Name),r.OPTION(function(){return r.SUBRULE(r.Arguments,{ARGS:[n]})})}),r.TypeSystemDefinition=r.RULE("TypeSystemDefinition",function(){r.OR([{ALT:function(){return r.SUBRULE(r.SchemaDefinition)}},{ALT:function(){return r.SUBRULE(r.TypeDefinition)}},{ALT:function(){return r.SUBRULE(r.DirectiveDefinition)}}])}),r.TypeSystemExtension=r.RULE("TypeSystemExtension",function(){r.OR([{ALT:function(){return r.SUBRULE(r.SchemaExtension)}},{ALT:function(){return r.SUBRULE(r.TypeExtension)}}])}),r.SchemaDefinition=r.RULE("SchemaDefinition",function(){r.CONSUME(a.Schema),r.OPTION(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})}),r.CONSUME(a.LCurly),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.OperationTypeDefinition)}),r.CONSUME(a.RCurly)}),r.SchemaExtension=r.RULE("SchemaExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.Schema),r.OR([{ALT:function(){r.SUBRULE(r.Directives,{ARGS:[!0]}),r.OPTION(function(){return r.SUBRULE1(r.OperationTypeDefinitionList)})}},{ALT:function(){return r.SUBRULE(r.OperationTypeDefinitionList)}}])}),r.OperationTypeDefinitionList=r.RULE("OperationTypeDefinitionList",function(){r.CONSUME(a.LCurly),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.OperationTypeDefinition)}),r.CONSUME(a.RCurly)}),r.OperationTypeDefinition=r.RULE("OperationTypeDefinition",function(){r.SUBRULE(r.OperationType),r.CONSUME(a.Colon),r.SUBRULE(r.NamedType)}),r.Description=r.RULE("Description",function(){r.SUBRULE(r.StringValue)}),r.TypeDefinition=r.RULE("TypeDefinition",function(){r.OR([{ALT:function(){return r.SUBRULE(r.ScalarTypeDefinition)}},{ALT:function(){return r.SUBRULE(r.ObjectTypeDefinition)}},{ALT:function(){return r.SUBRULE(r.InterfaceTypeDefinition)}},{ALT:function(){return r.SUBRULE(r.UnionTypeDefinition)}},{ALT:function(){return r.SUBRULE(r.EnumTypeDefinition)}},{ALT:function(){return r.SUBRULE(r.InputObjectTypeDefinition)}}])}),r.TypeExtension=r.RULE("TypeExtension",function(){r.OR([{ALT:function(){return r.SUBRULE(r.ScalarTypeExtension)}},{ALT:function(){return r.SUBRULE(r.ObjectTypeExtension)}},{ALT:function(){return r.SUBRULE(r.InterfaceTypeExtension)}},{ALT:function(){return r.SUBRULE(r.UnionTypeExtension)}},{ALT:function(){return r.SUBRULE(r.EnumTypeExtension)}},{ALT:function(){return r.SUBRULE(r.InputObjectTypeExtension)}}])}),r.ScalarTypeDefinition=r.RULE("ScalarTypeDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Scalar),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})})}),r.ScalarTypeExtension=r.RULE("ScalarTypeExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.Scalar),r.CONSUME(a.Name),r.SUBRULE(r.Directives,{ARGS:[!0]})}),r.ObjectTypeDefinition=r.RULE("ObjectTypeDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.TypeToken),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.ImplementsInterfaces)}),r.OPTION2(function(){return r.SUBRULE1(r.Directives,{ARGS:[!0]})}),r.OPTION3(function(){return r.SUBRULE(r.FieldsDefinition)})}),r.ObjectTypeExtension=r.RULE("ObjectTypeExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.TypeToken),r.CONSUME(a.Name),r.OR([{ALT:function(){r.SUBRULE(r.ImplementsInterfaces),r.OPTION(function(){return r.SUBRULE1(r.Directives,{ARGS:[!0]})}),r.OPTION1(function(){return r.SUBRULE(r.FieldsDefinition)})}},{ALT:function(){r.SUBRULE(r.Directives,{ARGS:[!0]}),r.OPTION2(function(){return r.SUBRULE1(r.FieldsDefinition)})}},{ALT:function(){return r.SUBRULE2(r.FieldsDefinition)}}])}),r.ImplementsInterfaces=r.RULE("ImplementsInterfaces",function(){r.CONSUME(a.Implements),r.OPTION(function(){return r.CONSUME(a.Amp)}),r.SUBRULE(r.NamedType),r.MANY(function(){r.CONSUME1(a.Amp),r.SUBRULE1(r.NamedType)})}),r.FieldsDefinition=r.RULE("FieldsDefinition",function(){r.CONSUME(a.LCurly),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.FieldDefinition)}),r.CONSUME(a.RCurly)}),r.FieldDefinition=r.RULE("FieldDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.ArgumentsDefinition)}),r.CONSUME(a.Colon),r.SUBRULE(r.Type),r.OPTION2(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})})}),r.ArgumentsDefinition=r.RULE("ArgumentsDefinition",function(){r.CONSUME(a.LParen),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.InputValueDefinition)}),r.CONSUME(a.RParen)}),r.InputValueDefinition=r.RULE("InputValueDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Name),r.CONSUME(a.Colon),r.SUBRULE(r.Type),r.OPTION1(function(){return r.SUBRULE(r.DefaultValue)}),r.OPTION2(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})})}),r.InterfaceTypeDefinition=r.RULE("InterfaceTypeDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Interface),r.CONSUME(a.Name),r.OPTION2(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})}),r.OPTION3(function(){return r.SUBRULE(r.FieldsDefinition)})}),r.InterfaceTypeExtension=r.RULE("InterfaceTypeExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.Interface),r.CONSUME(a.Name),r.OR([{ALT:function(){r.SUBRULE(r.Directives,{ARGS:[!0]}),r.OPTION(function(){return r.SUBRULE(r.FieldsDefinition)})}},{ALT:function(){return r.SUBRULE1(r.FieldsDefinition)}}])}),r.UnionTypeDefinition=r.RULE("UnionTypeDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Union),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})}),r.OPTION2(function(){return r.SUBRULE(r.UnionMemberTypes)})}),r.UnionMemberTypes=r.RULE("UnionMemberTypes",function(){r.CONSUME(a.Equals),r.OPTION(function(){return r.CONSUME(a.Pipe)}),r.SUBRULE(r.NamedType),r.MANY(function(){r.CONSUME1(a.Pipe),r.SUBRULE1(r.NamedType)})}),r.UnionTypeExtension=r.RULE("UnionTypeExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.Union),r.CONSUME(a.Name),r.OR([{ALT:function(){r.SUBRULE(r.Directives,{ARGS:[!0]}),r.OPTION(function(){return r.SUBRULE(r.UnionMemberTypes)})}},{ALT:function(){return r.SUBRULE1(r.UnionMemberTypes)}}])}),r.EnumTypeDefinition=r.RULE("EnumTypeDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Enum),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})}),r.OPTION2(function(){return r.SUBRULE(r.EnumValuesDefinition)})}),r.EnumValuesDefinition=r.RULE("EnumValuesDefinition",function(){r.CONSUME(a.LCurly),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.EnumValueDefinition)}),r.CONSUME(a.RCurly)}),r.EnumValueDefinition=r.RULE("EnumValueDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.SUBRULE(r.EnumValue),r.OPTION1(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})})}),r.EnumTypeExtension=r.RULE("EnumTypeExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.Enum),r.CONSUME(a.Name),r.OR([{ALT:function(){r.SUBRULE(r.Directives,{ARGS:[!0]}),r.OPTION(function(){return r.SUBRULE(r.EnumValuesDefinition)})}},{ALT:function(){return r.SUBRULE1(r.EnumValuesDefinition)}}])}),r.InputObjectTypeDefinition=r.RULE("InputObjectTypeDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Input),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})}),r.OPTION2(function(){return r.SUBRULE(r.InputFieldsDefinition)})}),r.InputFieldsDefinition=r.RULE("InputFieldsDefinition",function(){r.CONSUME(a.LCurly),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.InputValueDefinition)}),r.CONSUME(a.RCurly)}),r.InputObjectTypeExtension=r.RULE("InputObjectTypeExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.Input),r.CONSUME(a.Name),r.OR([{ALT:function(){r.SUBRULE(r.Directives,{ARGS:[!0]}),r.OPTION(function(){return r.SUBRULE1(r.InputFieldsDefinition)})}},{ALT:function(){return r.SUBRULE(r.InputFieldsDefinition)}}])}),r.DirectiveDefinition=r.RULE("DirectiveDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.DirectiveToken),r.CONSUME(a.At),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.ArgumentsDefinition)}),r.CONSUME(a.On),r.SUBRULE(r.DirectiveLocations)}),r.DirectiveLocations=r.RULE("DirectiveLocations",function(){r.OPTION(function(){return r.CONSUME(a.Pipe)}),r.SUBRULE(r.DirectiveLocation),r.MANY(function(){r.CONSUME1(a.Pipe),r.SUBRULE1(r.DirectiveLocation)})}),r.DirectiveLocation=r.RULE("DirectiveLocation",function(){r.OR([{ALT:function(){return r.SUBRULE(r.ExecutableDirectiveLocation)}},{ALT:function(){return r.SUBRULE(r.TypeSystemDirectiveLocation)}}])}),r.ExecutableDirectiveLocation=r.RULE("ExecutableDirectiveLocation",function(){r.OR([{ALT:function(){return r.CONSUME(a.QUERY)}},{ALT:function(){return r.CONSUME(a.MUTATION)}},{ALT:function(){return r.CONSUME(a.SUBSCRIPTION)}},{ALT:function(){return r.CONSUME(a.FIELD)}},{ALT:function(){return r.CONSUME(a.FRAGMENT_DEFINITION)}},{ALT:function(){return r.CONSUME(a.FRAGMENT_SPREAD)}},{ALT:function(){return r.CONSUME(a.INLINE_FRAGMENT)}}])}),r.TypeSystemDirectiveLocation=r.RULE("TypeSystemDirectiveLocation",function(){r.OR([{ALT:function(){return r.CONSUME(a.SCHEMA)}},{ALT:function(){return r.CONSUME(a.SCALAR)}},{ALT:function(){return r.CONSUME(a.OBJECT)}},{ALT:function(){return r.CONSUME(a.FIELD_DEFINITION)}},{ALT:function(){return r.CONSUME(a.ARGUMENT_DEFINITION)}},{ALT:function(){return r.CONSUME(a.INTERFACE)}},{ALT:function(){return r.CONSUME(a.UNION)}},{ALT:function(){return r.CONSUME(a.ENUM)}},{ALT:function(){return r.CONSUME(a.ENUM_VALUE)}},{ALT:function(){return r.CONSUME(a.INPUT_OBJECT)}},{ALT:function(){return r.CONSUME(a.INPUT_FIELD_DEFINITION)}}])}),r.lexer=new i.Lexer(t),r}return o(BaseGraphQlParser,n),BaseGraphQlParser}(i.Parser),f=function(){var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])})(e,t)};return function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}(),E=t(18).graphQlTokens,U=function(n){function StandardGraphQlParser(e){var t=n.call(this,e,E)||this;return i.Parser.performSelfAnalysis(t),t}return f(StandardGraphQlParser,n),StandardGraphQlParser}(c),StardogSparqlParser=t(15),p=t(7),l=t(18).stardogGraphQlTokenMap,s=l.ToArgumentToken,S=l.IfArgumentToken,T=l.AliasArgumentToken,O=l.GraphArgumentToken,L=l.BindDirectiveToken,N=l.ConfigDirectiveToken,R=[l.SkipDirectiveToken,l.IncludeDirectiveToken,l.FilterDirectiveToken],m=[L].concat(R);var A={getArgumentNodes:function(n){if(!n||!n.Arguments)return[];var e=n.Arguments[0];return Object(p.b)(e)&&e.children.Argument||[]},getArgumentTokenTypesForDirectiveNameToken:function(n){return Object(i.tokenMatcher)(n,L)?[s]:Object(i.tokenMatcher)(n,N)?[T,O]:R.some(function(e){return Object(i.tokenMatcher)(n,e)})?[S]:[]},isSparqlReceivingStardogDirective:function(n){return m.some(function(e){return Object(i.tokenMatcher)(n,e)})}},d=function(){var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])})(e,t)};return function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}(),y=function(){return(y=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var i in e=arguments[t])Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}).apply(this,arguments)},D=function(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&(t[r[i]]=n[r[i]])}return t},I=A.getArgumentNodes,C=A.getArgumentTokenTypesForDirectiveNameToken,g=A.isSparqlReceivingStardogDirective;function M(n){var e=n.allowedArgumentTokenTypes,t=n.directiveImage,r=n.errorAccumulator,i=n.numMinimumArguments,o=n.suppliedArgumentNodes.length,u=e.length,a="valid arguments: "+e.map(function(n){return"`"+n.PATTERN+"`"}).join(", ");if(o<i){var c="requires "+i+" argument"+(i>1?"s":"");r.stardogGraphQlErrors.push({name:"ArgumentArityError",message:"The "+t+" directive "+c+" ("+a+")"})}else o>u&&r.stardogGraphQlErrors.push({name:"ArgumentArityError",message:"Too many arguments provided to "+t+" directive ("+a+")"})}function B(n){var e=n.allowedArgumentTokenTypes,t=n.directiveImage,r=n.errorAccumulator,i=n.sparqlParser,o=n.suppliedArgumentNodes,u="valid arguments: "+e.map(function(n){return"`"+n.PATTERN+"`"}).join(", ");o.forEach(function(n){var o,a=Object(p.a)(["Alias","Name"],n);if(Object(p.c)(a)){var c,f,E,U=a.tokenType.name;if(e.some(function(n){return n.name===U})){var l=Object(p.a)(["Value","StringValue","StringValueToken"],n);if(!Object(p.c)(l))return;var s=(c=l,f=i,E=c.image.slice(1,-1),f.parse(E,f.Expression)).errors;s.length>0&&(o=r.sparqlErrors).push.apply(o,function(n,e,t){void 0===t&&(t=0);var r=e.startOffset,i=e.endOffset,o=e.startColumn,u=e.endColumn;return n.map(function(n){var a=n.token,c=a.startOffset,f=a.endOffset,E=a.startColumn,U=a.endColumn;return y({},n,{token:y({},a,{startOffset:r+(c||0)+t,endOffset:i+(f||0)+t,startColumn:o+(E||0)+t,endColumn:u+(U||0)+t,startLine:e.startLine,endLine:e.endLine})})})}(s,l,1))}else r.stardogGraphQlErrors.push({name:"InvalidArgumentError",message:"Invalid argument `"+a.image+"` for "+t+" directive ("+u+")"})}})}function v(n,e,t){var r,i,o,u={stardogGraphQlErrors:[],sparqlErrors:[]},a=C(e),c=e.tokenType.PATTERN;return i=(r={allowedArgumentTokenTypes:a,directiveImage:c,errorAccumulator:u,numMinimumArguments:1,sparqlParser:t,suppliedArgumentNodes:n,validators:[M,B]}).validators,o=D(r,["validators"]),i.forEach(function(n){return n(o)}),u}var P=function(n,e){var t=new StardogSparqlParser.a;return new(function(n){function r(){var r=n.call(this)||this;return r.sparqlErrors=[],r.stardogGraphQlErrors=[],r.visit=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return n.prototype.visit.apply(r,e),{sparqlErrors:r.sparqlErrors,stardogGraphQlErrors:r.stardogGraphQlErrors}},r.Directive=function(n){var i,o;if(n.Name&&n.Name[0]){var u=n.Name[0];if(u&&g(u)){var a=v(I(n),u,t);if(a.stardogGraphQlErrors.length>0){var c=e.getHumanReadableRuleStack(),f=e.RULE_OCCURRENCE_STACK;(i=r.stardogGraphQlErrors).push.apply(i,a.stardogGraphQlErrors.map(function(n){return y({},n,{token:u,context:{ruleStack:c,ruleOccurrenceStack:f},resyncedTokens:[]})}))}(o=r.sparqlErrors).push.apply(o,a.sparqlErrors.map(function(n){return y({},n,{name:"SPARQL Error: "+n.name})}))}}},r.$resetState=function(){r.stardogGraphQlErrors=[],r.sparqlErrors=[]},r.validateVisitor(),r}return d(r,n),r}(n))},h=function(){var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])})(e,t)};return function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}(),k=t(18).stardogGraphQlTokens,b=function(n){function StardogGraphQlParser(e){var t=n.call(this,e,k)||this;return t.visitCst=function(n){if(t.stardogGraphQlVisitor)t.stardogGraphQlVisitor.$resetState();else{var e=t.getBaseCstVisitorConstructorWithDefaults();t.stardogGraphQlVisitor=P(e,t)}return t.stardogGraphQlVisitor.visit(n,t.input)},t.parse=function(n,e){void 0===e&&(e=t.Document),t.input=t.tokenize(n);var r=e.call(t),i=t.visitCst(r),o=i.sparqlErrors,u=i.stardogGraphQlErrors;return{errors:t.errors.concat(u,o),cst:r}},t.performSelfAnalysis(),t}return h(StardogGraphQlParser,n),StardogGraphQlParser}(c);t.d(e,"graphqlTokens",function(){return _}),t.d(e,"BaseGraphQlParser",function(){return c}),t.d(e,"StandardGraphQlParser",function(){return U}),t.d(e,"StardogGraphQlParser",function(){return b}),t.d(e,"graphQlUtils",function(){return A});var _=t(18)},7:function(n,e,t){"use strict";t.d(e,"d",function(){return i}),t.d(e,"e",function(){return o}),t.d(e,"b",function(){return u}),t.d(e,"c",function(){return a}),t.d(e,"a",function(){return c});var r=function(){return(r=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var i in e=arguments[t])Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}).apply(this,arguments)},i=function(n,e){E(n,null,e)},o=function(n,e){E(n,null,e,!1)};function u(n){return Boolean(n&&"name"in n)}function a(n){return Boolean(n&&"tokenType"in n)}function c(n,e){if(!n||!n.length)return e;for(var t=e,r=0,i=n;r<i.length;r++){var o=i[r];if(!u(t)||!t.children[o])return;t=t.children[o][0]}return t}var f=function(){return function(n){var e=n.node,t=n.parentCtx;this.node=r({},e),this.parentCtx=r({},t)}}(),E=function(n,e,t,i){if(void 0===e&&(e=new f({node:n})),void 0===i&&(i=!0),!u(n))return t(i?r({},e):e);var o=n.children;Object.keys(o).forEach(function(n){var r=o[n];r.length&&r.forEach(function(n){var r=i?new f({node:n,parentCtx:e}):{node:n,parentCtx:e};t(r,function(e){var o=r;e&&(o=i?new f({node:e.node,parentCtx:e.parentCtx}):{node:e.node,parentCtx:e.parentCtx}),E(n,o,t,i)})})})}}})});
//# sourceMappingURL=millan.graphql.js.map