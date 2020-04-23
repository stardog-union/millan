!function(n,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("graphql",[],e):"object"==typeof exports?exports.graphql=e():(n.millan=n.millan||{},n.millan.graphql=e())}("undefined"!=typeof self?self:this,function(){return function(n){function e(e){for(var r,u,a=e[0],c=e[1],U=e[2],f=0,S=[];f<a.length;f++)u=a[f],i[u]&&S.push(i[u][0]),i[u]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(n[r]=c[r]);for(E&&E(e);S.length;)S.shift()();return o.push.apply(o,U||[]),t()}function t(){for(var n,e=0;e<o.length;e++){for(var t=o[e],r=!0,a=1;a<t.length;a++){var c=t[a];0!==i[c]&&(r=!1)}r&&(o.splice(e--,1),n=u(u.s=t[0]))}return n}var r={},i={2:0},o=[];function u(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.m=n,u.c=r,u.d=function(n,e,t){u.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},u.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},u.t=function(n,e){if(1&e&&(n=u(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)u.d(t,r,function(e){return n[e]}.bind(null,r));return t},u.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return u.d(e,"a",e),e},u.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},u.p="";var a=("undefined"!=typeof self?self:this).webpackJsonp=("undefined"!=typeof self?self:this).webpackJsonp||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var U=0;U<a.length;U++)e(a[U]);var E=c;return o.push([64,0,1]),t()}({19:function(n,e,t){"use strict";t.r(e),t.d(e,"graphQlTokenMap",function(){return y}),t.d(e,"graphQlTokens",function(){return L}),t.d(e,"stardogGraphQlTokenMap",function(){return v}),t.d(e,"stardogGraphQlTokens",function(){return P});var r=t(1),i=t(2),o=t(3),u=function(){return(u=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var i in e=arguments[t])Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}).apply(this,arguments)},a=/\-?(?:0|[1-9][0-9]*)/,c=/[eE][+-]?[0-9]+/,U=i.a.and(/"/,i.a.many(i.a.or(/[\u0009\u0020\u0021\u0023-\u005B\u005D-\uFFFF]/,/\\u[0-9A-Fa-f]{4}/,/\\["\\\/bfnrt]/)),/"/),E=/true|false/,f=/null/,S=/on/,L=[],O=function(n){var e=[l];return n.pattern!==E&&n.pattern!==f&&e.push(R),n.pattern!==S&&e.push(s),T({name:n.name,pattern:n.pattern,longer_alt:l,categories:e})},p=function(n){return T(u({},n,{categories:[A]}))},T=function(n){var e=Object(r.createToken)(n);return L.push(e),e},l=Object(r.createToken)({name:"Name",pattern:/[_A-Za-z][_0-9A-Za-z]*/}),R=Object(r.createToken)({name:"EnumValueToken",pattern:r.Lexer.NA}),s=Object(r.createToken)({name:"FragmentName",pattern:r.Lexer.NA}),N=Object(r.createToken)({name:"StringValueToken",pattern:r.Lexer.NA}),A=Object(r.createToken)({name:"Punctuator",pattern:r.Lexer.NA});l.CATEGORIES.push(R,s);var m={WhiteSpace:T({name:"WhiteSpace",pattern:/[ \t]+/,group:r.Lexer.SKIPPED}),UnicodeBOM:T({name:"UnicodeBOM",pattern:"\\uFFFE",group:r.Lexer.SKIPPED}),LineTerminator:T({name:"LineTerminator",pattern:/\n\r|\r|\n/,group:r.Lexer.SKIPPED}),Comment:T({name:"Comment",pattern:/#[^\n\r]*/,group:r.Lexer.SKIPPED}),Comma:T({name:"Comma",pattern:",",group:r.Lexer.SKIPPED})},B={Bang:p({name:"Bang",pattern:"!"}),Dollar:p({name:"Dollar",pattern:"$"}),LParen:p({name:"LParen",pattern:"("}),RParen:p({name:"RParen",pattern:")"}),Spread:p({name:"Spread",pattern:"..."}),Colon:p({name:"Colon",pattern:":"}),Equals:p({name:"Equals",pattern:"="}),At:p({name:"At",pattern:"@"}),LBracket:p({name:"LBracket",pattern:"["}),RBracket:p({name:"RBracket",pattern:"]"}),LCurly:p({name:"LCurly",pattern:"{"}),RCurly:p({name:"RCurly",pattern:"}"}),Pipe:p({name:"Pipe",pattern:"|"}),Amp:p({name:"Amp",pattern:"&"}),Punctuator:A},C={FloatValueToken:T({name:"FloatValueToken",pattern:i.a.and(a,i.a.or(i.a.and(/\.[0-9]+/,i.a.option(c)),c))}),IntValueToken:T({name:"IntValueToken",pattern:a}),BlockStringToken:T({name:"BlockStringToken",pattern:o.F,categories:[N]}),StringToken:T({name:"StringToken",pattern:U,categories:[N]}),BooleanValueToken:O({name:"BooleanValueToken",pattern:E}),NullValueToken:O({name:"NullValueToken",pattern:f}),EnumValueToken:R,FragmentName:s,Name:l,StringValueToken:N},D={Query:O({name:"Query",pattern:"query"}),Mutation:O({name:"Mutation",pattern:"mutation"}),Subscription:O({name:"Subscription",pattern:"subscription"}),Fragment:O({name:"Fragment",pattern:"fragment"}),On:O({name:"On",pattern:S}),Schema:O({name:"Schema",pattern:"schema"}),Extend:O({name:"Extend",pattern:"extend"}),Scalar:O({name:"Scalar",pattern:"scalar"}),TypeToken:O({name:"TypeToken",pattern:"type"}),Implements:O({name:"Implements",pattern:"implements"}),Interface:O({name:"Interface",pattern:"interface"}),Union:O({name:"Union",pattern:"union"}),Enum:O({name:"Enum",pattern:"enum"}),Input:O({name:"Input",pattern:"input"}),DirectiveToken:O({name:"DirectiveToken",pattern:"directive"}),QUERY:O({name:"QUERY",pattern:"QUERY"}),MUTATION:O({name:"MUTATION",pattern:"MUTATION"}),SUBSCRIPTION:O({name:"SUBSCRIPTION",pattern:"SUBSCRIPTION"}),FRAGMENT_DEFINITION:O({name:"FRAGMENT_DEFINITION",pattern:"FRAGMENT_DEFINITION"}),FRAGMENT_SPREAD:O({name:"FRAGMENT_SPREAD",pattern:"FRAGMENT_SPREAD"}),INLINE_FRAGMENT:O({name:"INLINE_FRAGMENT",pattern:"INLINE_FRAGMENT"}),SCHEMA:O({name:"SCHEMA",pattern:"SCHEMA"}),SCALAR:O({name:"SCALAR",pattern:"SCALAR"}),OBJECT:O({name:"OBJECT",pattern:"OBJECT"}),FIELD_DEFINITION:O({name:"FIELD_DEFINITION",pattern:"FIELD_DEFINITION"}),FIELD:O({name:"FIELD",pattern:"FIELD"}),ARGUMENT_DEFINITION:O({name:"ARGUMENT_DEFINITION",pattern:"ARGUMENT_DEFINITION"}),INTERFACE:O({name:"INTERFACE",pattern:"INTERFACE"}),UNION:O({name:"UNION",pattern:"UNION"}),ENUM_VALUE:O({name:"ENUM_VALUE",pattern:"ENUM_VALUE"}),ENUM:O({name:"ENUM",pattern:"ENUM"}),INPUT_OBJECT:O({name:"INPUT_OBJECT",pattern:"INPUT_OBJECT"}),INPUT_FIELD_DEFINITION:O({name:"INPUT_FIELD_DEFINITION",pattern:"INPUT_FIELD_DEFINITION"})},y=u({},m,B,C,D,{Name:l}),M=["optional","bind","hide","skip","include","filter","prefix","config"].sort().reduce(function(n,e){var t,i=""+e[0].toUpperCase()+e.slice(1)+"DirectiveToken",o=Object(r.createToken)({name:i,pattern:e,categories:[l,R,s],longer_alt:l});return u({},n,{tokenMap:u({},n.tokenMap,(t={},t[i]=o,t)),orderedTokens:n.orderedTokens.concat(o)})},{tokenMap:{},orderedTokens:[]}),I=["orderBy","first","to","if","alias","graph","offset","limit","iri"].sort().reduce(function(n,e){var t,i=""+e[0].toUpperCase()+e.slice(1)+"ArgumentToken",o=Object(r.createToken)({name:i,pattern:e,categories:[l,R,s],longer_alt:l});return u({},n,{tokenMap:u({},n.tokenMap,(t={},t[i]=o,t)),orderedTokens:n.orderedTokens.concat(o)})},{tokenMap:{},orderedTokens:[]}),g=Object(r.createToken)({name:"OrderByArgumentFieldPropertyToken",pattern:"field",categories:[l,R,s],longer_alt:l}),d=Object(r.createToken)({name:"OrderByArgumentDescPropertyToken",pattern:"desc",categories:[l,R,s],longer_alt:l}),v=u({},y,M.tokenMap,I.tokenMap,{OrderByArgumentFieldPropertyToken:g,OrderByArgumentDescPropertyToken:d}),P=L.concat(M.orderedTokens,I.orderedTokens,[g,d]),k=[s,R,l,N,A];L.push.apply(L,k),P.push.apply(P,k)},64:function(n,e,t){"use strict";t.r(e);var r,i=t(1),o=(r=function(n,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])})(n,e)},function(n,e){function t(){this.constructor=n}r(n,e),n.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}),u=function(){return(u=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var i in e=arguments[t])Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}).apply(this,arguments)},a=t(19).graphQlTokenMap,c=function(n){function BaseGraphQlParser(e,t){void 0===e&&(e={});var r=n.call(this,t,u({recoveryEnabled:!0,outputCst:!0},e.config))||this;return r.tokenize=function(n){return r.lexer.tokenize(n).tokens},r.parse=function(n,e){void 0===e&&(e=r.Document),r.input=r.lexer.tokenize(n).tokens;var t=e.call(r);return{errors:r.errors,cst:t}},r.Document=r.RULE("Document",function(){r.AT_LEAST_ONE(function(){return r.SUBRULE(r.Definition)})}),r.Definition=r.RULE("Definition",function(){r.OR([{ALT:function(){return r.SUBRULE(r.ExecutableDefinition)}},{ALT:function(){return r.SUBRULE(r.TypeSystemDefinition)}},{ALT:function(){return r.SUBRULE(r.TypeSystemExtension)}}])}),r.ExecutableDefinition=r.RULE("ExecutableDefinition",function(){r.OR([{ALT:function(){return r.SUBRULE(r.OperationDefinition)}},{ALT:function(){return r.SUBRULE(r.FragmentDefinition)}}])}),r.OperationDefinition=r.RULE("OperationDefinition",function(){r.OR([{ALT:function(){return r.SUBRULE(r.SelectionSet)}},{ALT:function(){r.SUBRULE(r.OperationType),r.OPTION(function(){return r.CONSUME(a.Name)}),r.OPTION1(function(){return r.SUBRULE(r.VariableDefinitions)}),r.OPTION2(function(){return r.SUBRULE(r.Directives)}),r.SUBRULE1(r.SelectionSet)}}])}),r.OperationType=r.RULE("OperationType",function(){r.OR([{ALT:function(){return r.CONSUME(a.Query)}},{ALT:function(){return r.CONSUME(a.Mutation)}},{ALT:function(){return r.CONSUME(a.Subscription)}}])}),r.SelectionSet=r.RULE("SelectionSet",function(){r.CONSUME(a.LCurly),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.Selection)}),r.CONSUME(a.RCurly)}),r.Selection=r.RULE("Selection",function(){r.OR([{ALT:function(){return r.SUBRULE(r.Field)}},{ALT:function(){return r.SUBRULE(r.InlineFragment)}},{ALT:function(){return r.SUBRULE(r.FragmentSpread)}}])}),r.Field=r.RULE("Field",function(){r.OPTION(function(){return r.SUBRULE(r.Alias)}),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.Arguments,{ARGS:[!1]})}),r.OPTION2(function(){return r.SUBRULE(r.Directives)}),r.OPTION3(function(){return r.SUBRULE(r.SelectionSet)})}),r.Alias=r.RULE("Alias",function(){r.CONSUME(a.Name),r.CONSUME(a.Colon)}),r.Arguments=r.RULE("Arguments",function(n){r.CONSUME(a.LParen),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.Argument,{ARGS:[n]})}),r.CONSUME(a.RParen)}),r.Argument=r.RULE("Argument",function(n){r.SUBRULE(r.Alias),r.SUBRULE(r.Value,{ARGS:[n]})}),r.FragmentSpread=r.RULE("FragmentSpread",function(){r.CONSUME(a.Spread),r.CONSUME(a.FragmentName),r.OPTION(function(){return r.SUBRULE(r.Directives)})}),r.InlineFragment=r.RULE("InlineFragment",function(){r.CONSUME(a.Spread),r.OPTION(function(){return r.SUBRULE(r.TypeCondition)}),r.OPTION1(function(){return r.SUBRULE(r.Directives)}),r.SUBRULE(r.SelectionSet)}),r.FragmentDefinition=r.RULE("FragmentDefinition",function(){r.CONSUME(a.Fragment),r.CONSUME(a.FragmentName),r.SUBRULE(r.TypeCondition),r.OPTION(function(){return r.SUBRULE(r.Directives)}),r.SUBRULE(r.SelectionSet)}),r.TypeCondition=r.RULE("TypeCondition",function(){r.CONSUME(a.On),r.SUBRULE(r.NamedType)}),r.Value=r.RULE("Value",function(n){r.OR([{GATE:function(){return!n},ALT:function(){return r.SUBRULE(r.Variable)}},{ALT:function(){return r.SUBRULE(r.IntValue)}},{ALT:function(){return r.SUBRULE(r.FloatValue)}},{ALT:function(){return r.SUBRULE(r.StringValue)}},{ALT:function(){return r.SUBRULE(r.BooleanValue)}},{ALT:function(){return r.SUBRULE(r.NullValue)}},{ALT:function(){return r.SUBRULE(r.EnumValue)}},{ALT:function(){return r.SUBRULE(r.ListValue,{ARGS:[n]})}},{ALT:function(){return r.SUBRULE(r.ObjectValue,{ARGS:[n]})}}])}),r.IntValue=r.RULE("IntValue",function(){r.CONSUME(a.IntValueToken)}),r.FloatValue=r.RULE("FloatValue",function(){r.CONSUME(a.FloatValueToken)}),r.StringValue=r.RULE("StringValue",function(){r.CONSUME(a.StringValueToken)}),r.BooleanValue=r.RULE("BooleanValue",function(){r.CONSUME(a.BooleanValueToken)}),r.NullValue=r.RULE("NullValue",function(){r.CONSUME(a.NullValueToken)}),r.EnumValue=r.RULE("EnumValue",function(){r.CONSUME(a.EnumValueToken)}),r.ListValue=r.RULE("ListValue",function(n){r.CONSUME(a.LBracket),r.MANY(function(){return r.SUBRULE(r.Value,{ARGS:[n]})}),r.CONSUME(a.RBracket)}),r.ObjectValue=r.RULE("ObjectValue",function(n){r.CONSUME(a.LCurly),r.MANY(function(){return r.SUBRULE(r.ObjectField,{ARGS:[n]})}),r.CONSUME(a.RCurly)}),r.ObjectField=r.RULE("ObjectField",function(n){r.SUBRULE(r.Alias),r.SUBRULE(r.Value,{ARGS:[n]})}),r.VariableDefinitions=r.RULE("VariableDefinitions",function(){r.CONSUME(a.LParen),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.VariableDefinition)}),r.CONSUME(a.RParen)}),r.VariableDefinition=r.RULE("VariableDefinition",function(){r.SUBRULE(r.Variable),r.CONSUME(a.Colon),r.SUBRULE(r.Type),r.OPTION(function(){return r.SUBRULE(r.DefaultValue)})}),r.Variable=r.RULE("Variable",function(){r.CONSUME(a.Dollar),r.CONSUME(a.Name)}),r.DefaultValue=r.RULE("DefaultValue",function(){r.CONSUME(a.Equals),r.SUBRULE(r.Value,{ARGS:[!0]})}),r.Type=r.RULE("Type",function(){r.OR([{ALT:function(){return r.SUBRULE(r.NamedType)}},{ALT:function(){return r.SUBRULE(r.ListType)}}]),r.OPTION(function(){return r.CONSUME(a.Bang)})}),r.NamedType=r.RULE("NamedType",function(){r.CONSUME(a.Name)}),r.ListType=r.RULE("ListType",function(){r.CONSUME(a.LBracket),r.SUBRULE(r.Type),r.CONSUME(a.RBracket)}),r.Directives=r.RULE("Directives",function(n){r.AT_LEAST_ONE(function(){return r.SUBRULE(r.Directive,{ARGS:[n]})})}),r.Directive=r.RULE("Directive",function(n){r.CONSUME(a.At),r.CONSUME(a.Name),r.OPTION(function(){return r.SUBRULE(r.Arguments,{ARGS:[n]})})}),r.TypeSystemDefinition=r.RULE("TypeSystemDefinition",function(){r.OR([{ALT:function(){return r.SUBRULE(r.SchemaDefinition)}},{ALT:function(){return r.SUBRULE(r.TypeDefinition)}},{ALT:function(){return r.SUBRULE(r.DirectiveDefinition)}}])}),r.TypeSystemExtension=r.RULE("TypeSystemExtension",function(){r.OR([{ALT:function(){return r.SUBRULE(r.SchemaExtension)}},{ALT:function(){return r.SUBRULE(r.TypeExtension)}}])}),r.SchemaDefinition=r.RULE("SchemaDefinition",function(){r.CONSUME(a.Schema),r.OPTION(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})}),r.CONSUME(a.LCurly),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.OperationTypeDefinition)}),r.CONSUME(a.RCurly)}),r.SchemaExtension=r.RULE("SchemaExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.Schema),r.OR([{ALT:function(){r.SUBRULE(r.Directives,{ARGS:[!0]}),r.OPTION(function(){return r.SUBRULE1(r.OperationTypeDefinitionList)})}},{ALT:function(){return r.SUBRULE(r.OperationTypeDefinitionList)}}])}),r.OperationTypeDefinitionList=r.RULE("OperationTypeDefinitionList",function(){r.CONSUME(a.LCurly),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.OperationTypeDefinition)}),r.CONSUME(a.RCurly)}),r.OperationTypeDefinition=r.RULE("OperationTypeDefinition",function(){r.SUBRULE(r.OperationType),r.CONSUME(a.Colon),r.SUBRULE(r.NamedType)}),r.Description=r.RULE("Description",function(){r.SUBRULE(r.StringValue)}),r.TypeDefinition=r.RULE("TypeDefinition",function(){r.OR([{ALT:function(){return r.SUBRULE(r.ScalarTypeDefinition)}},{ALT:function(){return r.SUBRULE(r.ObjectTypeDefinition)}},{ALT:function(){return r.SUBRULE(r.InterfaceTypeDefinition)}},{ALT:function(){return r.SUBRULE(r.UnionTypeDefinition)}},{ALT:function(){return r.SUBRULE(r.EnumTypeDefinition)}},{ALT:function(){return r.SUBRULE(r.InputObjectTypeDefinition)}}])}),r.TypeExtension=r.RULE("TypeExtension",function(){r.OR([{ALT:function(){return r.SUBRULE(r.ScalarTypeExtension)}},{ALT:function(){return r.SUBRULE(r.ObjectTypeExtension)}},{ALT:function(){return r.SUBRULE(r.InterfaceTypeExtension)}},{ALT:function(){return r.SUBRULE(r.UnionTypeExtension)}},{ALT:function(){return r.SUBRULE(r.EnumTypeExtension)}},{ALT:function(){return r.SUBRULE(r.InputObjectTypeExtension)}}])}),r.ScalarTypeDefinition=r.RULE("ScalarTypeDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Scalar),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})})}),r.ScalarTypeExtension=r.RULE("ScalarTypeExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.Scalar),r.CONSUME(a.Name),r.SUBRULE(r.Directives,{ARGS:[!0]})}),r.ObjectTypeDefinition=r.RULE("ObjectTypeDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.TypeToken),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.ImplementsInterfaces)}),r.OPTION2(function(){return r.SUBRULE1(r.Directives,{ARGS:[!0]})}),r.OPTION3(function(){return r.SUBRULE(r.FieldsDefinition)})}),r.ObjectTypeExtension=r.RULE("ObjectTypeExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.TypeToken),r.CONSUME(a.Name),r.OR([{ALT:function(){r.SUBRULE(r.ImplementsInterfaces),r.OPTION(function(){return r.SUBRULE1(r.Directives,{ARGS:[!0]})}),r.OPTION1(function(){return r.SUBRULE(r.FieldsDefinition)})}},{ALT:function(){r.SUBRULE(r.Directives,{ARGS:[!0]}),r.OPTION2(function(){return r.SUBRULE1(r.FieldsDefinition)})}},{ALT:function(){return r.SUBRULE2(r.FieldsDefinition)}}])}),r.ImplementsInterfaces=r.RULE("ImplementsInterfaces",function(){r.CONSUME(a.Implements),r.OPTION(function(){return r.CONSUME(a.Amp)}),r.SUBRULE(r.NamedType),r.MANY(function(){r.CONSUME1(a.Amp),r.SUBRULE1(r.NamedType)})}),r.FieldsDefinition=r.RULE("FieldsDefinition",function(){r.CONSUME(a.LCurly),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.FieldDefinition)}),r.CONSUME(a.RCurly)}),r.FieldDefinition=r.RULE("FieldDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.ArgumentsDefinition)}),r.CONSUME(a.Colon),r.SUBRULE(r.Type),r.OPTION2(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})})}),r.ArgumentsDefinition=r.RULE("ArgumentsDefinition",function(){r.CONSUME(a.LParen),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.InputValueDefinition)}),r.CONSUME(a.RParen)}),r.InputValueDefinition=r.RULE("InputValueDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Name),r.CONSUME(a.Colon),r.SUBRULE(r.Type),r.OPTION1(function(){return r.SUBRULE(r.DefaultValue)}),r.OPTION2(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})})}),r.InterfaceTypeDefinition=r.RULE("InterfaceTypeDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Interface),r.CONSUME(a.Name),r.OPTION2(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})}),r.OPTION3(function(){return r.SUBRULE(r.FieldsDefinition)})}),r.InterfaceTypeExtension=r.RULE("InterfaceTypeExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.Interface),r.CONSUME(a.Name),r.OR([{ALT:function(){r.SUBRULE(r.Directives,{ARGS:[!0]}),r.OPTION(function(){return r.SUBRULE(r.FieldsDefinition)})}},{ALT:function(){return r.SUBRULE1(r.FieldsDefinition)}}])}),r.UnionTypeDefinition=r.RULE("UnionTypeDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Union),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})}),r.OPTION2(function(){return r.SUBRULE(r.UnionMemberTypes)})}),r.UnionMemberTypes=r.RULE("UnionMemberTypes",function(){r.CONSUME(a.Equals),r.OPTION(function(){return r.CONSUME(a.Pipe)}),r.SUBRULE(r.NamedType),r.MANY(function(){r.CONSUME1(a.Pipe),r.SUBRULE1(r.NamedType)})}),r.UnionTypeExtension=r.RULE("UnionTypeExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.Union),r.CONSUME(a.Name),r.OR([{ALT:function(){r.SUBRULE(r.Directives,{ARGS:[!0]}),r.OPTION(function(){return r.SUBRULE(r.UnionMemberTypes)})}},{ALT:function(){return r.SUBRULE1(r.UnionMemberTypes)}}])}),r.EnumTypeDefinition=r.RULE("EnumTypeDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Enum),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})}),r.OPTION2(function(){return r.SUBRULE(r.EnumValuesDefinition)})}),r.EnumValuesDefinition=r.RULE("EnumValuesDefinition",function(){r.CONSUME(a.LCurly),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.EnumValueDefinition)}),r.CONSUME(a.RCurly)}),r.EnumValueDefinition=r.RULE("EnumValueDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.SUBRULE(r.EnumValue),r.OPTION1(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})})}),r.EnumTypeExtension=r.RULE("EnumTypeExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.Enum),r.CONSUME(a.Name),r.OR([{ALT:function(){r.SUBRULE(r.Directives,{ARGS:[!0]}),r.OPTION(function(){return r.SUBRULE(r.EnumValuesDefinition)})}},{ALT:function(){return r.SUBRULE1(r.EnumValuesDefinition)}}])}),r.InputObjectTypeDefinition=r.RULE("InputObjectTypeDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.Input),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.Directives,{ARGS:[!0]})}),r.OPTION2(function(){return r.SUBRULE(r.InputFieldsDefinition)})}),r.InputFieldsDefinition=r.RULE("InputFieldsDefinition",function(){r.CONSUME(a.LCurly),r.AT_LEAST_ONE(function(){return r.SUBRULE(r.InputValueDefinition)}),r.CONSUME(a.RCurly)}),r.InputObjectTypeExtension=r.RULE("InputObjectTypeExtension",function(){r.CONSUME(a.Extend),r.CONSUME(a.Input),r.CONSUME(a.Name),r.OR([{ALT:function(){r.SUBRULE(r.Directives,{ARGS:[!0]}),r.OPTION(function(){return r.SUBRULE1(r.InputFieldsDefinition)})}},{ALT:function(){return r.SUBRULE(r.InputFieldsDefinition)}}])}),r.DirectiveDefinition=r.RULE("DirectiveDefinition",function(){r.OPTION(function(){return r.SUBRULE(r.Description)}),r.CONSUME(a.DirectiveToken),r.CONSUME(a.At),r.CONSUME(a.Name),r.OPTION1(function(){return r.SUBRULE(r.ArgumentsDefinition)}),r.CONSUME(a.On),r.SUBRULE(r.DirectiveLocations)}),r.DirectiveLocations=r.RULE("DirectiveLocations",function(){r.OPTION(function(){return r.CONSUME(a.Pipe)}),r.SUBRULE(r.DirectiveLocation),r.MANY(function(){r.CONSUME1(a.Pipe),r.SUBRULE1(r.DirectiveLocation)})}),r.DirectiveLocation=r.RULE("DirectiveLocation",function(){r.OR([{ALT:function(){return r.SUBRULE(r.ExecutableDirectiveLocation)}},{ALT:function(){return r.SUBRULE(r.TypeSystemDirectiveLocation)}}])}),r.ExecutableDirectiveLocation=r.RULE("ExecutableDirectiveLocation",function(){r.OR([{ALT:function(){return r.CONSUME(a.QUERY)}},{ALT:function(){return r.CONSUME(a.MUTATION)}},{ALT:function(){return r.CONSUME(a.SUBSCRIPTION)}},{ALT:function(){return r.CONSUME(a.FIELD)}},{ALT:function(){return r.CONSUME(a.FRAGMENT_DEFINITION)}},{ALT:function(){return r.CONSUME(a.FRAGMENT_SPREAD)}},{ALT:function(){return r.CONSUME(a.INLINE_FRAGMENT)}}])}),r.TypeSystemDirectiveLocation=r.RULE("TypeSystemDirectiveLocation",function(){r.OR([{ALT:function(){return r.CONSUME(a.SCHEMA)}},{ALT:function(){return r.CONSUME(a.SCALAR)}},{ALT:function(){return r.CONSUME(a.OBJECT)}},{ALT:function(){return r.CONSUME(a.FIELD_DEFINITION)}},{ALT:function(){return r.CONSUME(a.ARGUMENT_DEFINITION)}},{ALT:function(){return r.CONSUME(a.INTERFACE)}},{ALT:function(){return r.CONSUME(a.UNION)}},{ALT:function(){return r.CONSUME(a.ENUM)}},{ALT:function(){return r.CONSUME(a.ENUM_VALUE)}},{ALT:function(){return r.CONSUME(a.INPUT_OBJECT)}},{ALT:function(){return r.CONSUME(a.INPUT_FIELD_DEFINITION)}}])}),r.lexer=new i.Lexer(t),r}return o(BaseGraphQlParser,n),BaseGraphQlParser}(i.Parser),U=function(){var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])})(e,t)};return function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}(),E=t(19).graphQlTokens,f=function(n){function StandardGraphQlParser(e){var t=n.call(this,e,E)||this;return i.Parser.performSelfAnalysis(t),t}return U(StandardGraphQlParser,n),StandardGraphQlParser}(c),StardogSparqlParser=t(15),S=function(){var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])})(e,t)};return function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}(),L=function(){return(L=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var i in e=arguments[t])Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}).apply(this,arguments)},O=function(n){return new(function(n){function e(){var e=n.call(this)||this;return e.sparqlErrors=[],e.visit=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return n.prototype.visit.apply(e,t),{errors:e.sparqlErrors.map(function(n){return L({},n,{name:"SPARQL Error: "+n.name})})}},e.BindDirective=function(n){var t;if(n.StringValue){var r=n.StringValue[0];if(r.children.StringValueToken){var i=r.children.StringValueToken[0],o=e.$parseSparqlExpression(i).errors;o.length>0&&(t=e.sparqlErrors).push.apply(t,e.$mapErrors(o,i,1))}}},e.ConditionalStardogDirective=function(n){var t,r=n.ConditionalStardogDirectiveArguments[0];if(r.children.StringValue){var i=r.children.StringValue[0].children.StringValueToken[0],o=e.$parseSparqlExpression(i).errors;o.length>0&&(t=e.sparqlErrors).push.apply(t,e.$mapErrors(o,i,1))}},e.$mapErrors=function(n,e,t){void 0===t&&(t=0);var r=e.startOffset,i=e.endOffset,o=e.startColumn,u=e.endColumn;return n.map(function(n){var a=n.token,c=a.startOffset,U=a.endOffset,E=a.startColumn,f=a.endColumn;return L({},n,{token:L({},a,{startOffset:r+(c||0)+t,endOffset:i+(U||0)+t,startColumn:o+(E||0)+t,endColumn:u+(f||0)+t,startLine:e.startLine,endLine:e.endLine})})})},e.$parseSparqlExpression=function(n){var t=n.image.slice(1,-1);return e.stardogSparqlParser.parse(t,e.stardogSparqlParser.Expression)},e.$resetState=function(){e.sparqlErrors=[]},e.stardogSparqlParser=new StardogSparqlParser.a,e.validateVisitor(),e}return S(e,n),e}(n))},p=function(){var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])})(e,t)};return function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}(),T=t(19),l=T.stardogGraphQlTokens,R=T.stardogGraphQlTokenMap,s=function(n){function StardogGraphQlParser(e){var t=n.call(this,e,l)||this;return t.visitCst=function(n){if(t.stardogGraphQlVisitor)t.stardogGraphQlVisitor.$resetState();else{var e=t.getBaseCstVisitorConstructorWithDefaults();t.stardogGraphQlVisitor=O(e)}return t.stardogGraphQlVisitor.visit(n,t.input)},t.parse=function(n,e){void 0===e&&(e=t.Document),t.input=t.tokenize(n);var r=e.call(t),i=t.visitCst(r).errors;return{errors:t.errors.concat(i),cst:r}},t.OperationDefinition=t.OVERRIDE_RULE("OperationDefinition",function(){t.OR([{ALT:function(){return t.SUBRULE(t.SelectionSet)}},{ALT:function(){t.SUBRULE(t.OperationType),t.OPTION(function(){return t.CONSUME(R.Name)}),t.OPTION1(function(){return t.SUBRULE(t.VariableDefinitions)}),t.OPTION2(function(){return t.SUBRULE(t.Directives,{ARGS:[!1,!0]})}),t.SUBRULE1(t.SelectionSet)}}])}),t.Directives=t.OVERRIDE_RULE("Directives",function(n,e){void 0===e&&(e=!1),t.AT_LEAST_ONE(function(){t.OR([{ALT:function(){return t.SUBRULE(t.StardogDirective,{ARGS:[e]})}},{ALT:function(){return t.SUBRULE(t.Directive,{ARGS:[n]})}}])})}),t.Field=t.OVERRIDE_RULE("Field",function(){t.OPTION(function(){return t.SUBRULE(t.Alias)}),t.CONSUME(R.Name),t.OPTION1(function(){return t.SUBRULE(t.Arguments,{ARGS:[!1,!0]})}),t.OPTION2(function(){return t.SUBRULE(t.Directives)}),t.OPTION3(function(){return t.SUBRULE(t.SelectionSet)})}),t.Arguments=t.OVERRIDE_RULE("Arguments",function(n,e){void 0===e&&(e=!1),t.CONSUME(R.LParen),t.AT_LEAST_ONE(function(){t.OR([{GATE:function(){return e},ALT:function(){return t.SUBRULE(t.StardogArgument)}},{ALT:function(){return t.SUBRULE(t.Argument,{ARGS:[n]})}}])}),t.CONSUME(R.RParen)}),t.StardogArgument=t.RULE("StardogArgument",function(){t.OR([{ALT:function(){return t.SUBRULE(t.OrderByArgument)}},{ALT:function(){return t.SUBRULE(t.SkipArgument)}},{ALT:function(){return t.SUBRULE(t.OffsetArgument)}},{ALT:function(){return t.SUBRULE(t.FirstArgument)}},{ALT:function(){return t.SUBRULE(t.LimitArgument)}},{ALT:function(){return t.SUBRULE(t.IriArgument)}}])}),t.StardogDirective=t.RULE("StardogDirective",function(n){t.CONSUME(R.At),t.OR([{GATE:function(){return!n},ALT:function(){return t.SUBRULE(t.ConditionalStardogDirective)}},{GATE:function(){return!n},ALT:function(){return t.SUBRULE(t.BareStardogDirective)}},{GATE:function(){return!n},ALT:function(){return t.SUBRULE(t.BindDirective)}},{GATE:function(){return n},ALT:function(){return t.SUBRULE(t.PrefixDirective)}},{GATE:function(){return n},ALT:function(){return t.SUBRULE(t.ConfigDirective)}}])}),t.ConditionalStardogDirective=t.RULE("ConditionalStardogDirective",function(){t.OR([{ALT:function(){return t.SUBRULE(t.SkipDirective)}},{ALT:function(){return t.SUBRULE(t.IncludeDirective)}},{ALT:function(){return t.SUBRULE(t.FilterDirective)}}]),t.SUBRULE(t.ConditionalStardogDirectiveArguments)}),t.SkipDirective=t.RULE("SkipDirective",function(){t.CONSUME(R.SkipDirectiveToken)}),t.IncludeDirective=t.RULE("IncludeDirective",function(){t.CONSUME(R.IncludeDirectiveToken)}),t.FilterDirective=t.RULE("FilterDirective",function(){t.CONSUME(R.FilterDirectiveToken)}),t.ConditionalStardogDirectiveArguments=t.RULE("ConditionalStardogDirectiveArguments",function(){t.CONSUME(R.LParen),t.CONSUME(R.IfArgumentToken),t.CONSUME(R.Colon),t.OR([{ALT:function(){return t.SUBRULE(t.Variable)}},{ALT:function(){return t.SUBRULE(t.StringValue)}}]),t.CONSUME(R.RParen)}),t.BareStardogDirective=t.RULE("BareStardogDirective",function(){t.OR([{ALT:function(){return t.SUBRULE(t.OptionalDirective)}},{ALT:function(){return t.SUBRULE(t.TypeDirective)}},{ALT:function(){return t.SUBRULE(t.HideDirective)}}])}),t.OptionalDirective=t.RULE("OptionalDirective",function(){t.CONSUME(R.OptionalDirectiveToken)}),t.TypeDirective=t.RULE("TypeDirective",function(){t.CONSUME(R.TypeToken)}),t.HideDirective=t.RULE("HideDirective",function(){t.CONSUME(R.HideDirectiveToken)}),t.BindDirective=t.RULE("BindDirective",function(){t.CONSUME(R.BindDirectiveToken),t.CONSUME(R.LParen),t.CONSUME(R.ToArgumentToken),t.CONSUME(R.Colon),t.SUBRULE(t.StringValue),t.CONSUME(R.RParen)}),t.PrefixDirective=t.RULE("PrefixDirective",function(n){t.CONSUME(R.PrefixDirectiveToken),t.SUBRULE(t.Arguments,{ARGS:[n]})}),t.ConfigDirective=t.RULE("ConfigDirective",function(){t.CONSUME(R.ConfigDirectiveToken),t.CONSUME(R.LParen),t.OR([{ALT:function(){return t.SUBRULE(t.ConfigDirectiveAlias)}},{ALT:function(){return t.SUBRULE(t.ConfigDirectiveGraph)}},{ALT:function(){return t.SUBRULE(t.ConfigDirectiveType)}}]),t.CONSUME(R.RParen)}),t.ConfigDirectiveAlias=t.RULE("ConfigDirectiveAlias",function(){t.SUBRULE(t.AliasArgument),t.OPTION(function(){t.OR1([{ALT:function(){t.SUBRULE(t.GraphArgument),t.OPTION1(function(){return t.SUBRULE(t.TypeArgument)})}},{ALT:function(){t.SUBRULE1(t.TypeArgument),t.OPTION2(function(){return t.SUBRULE1(t.GraphArgument)})}}])})}),t.ConfigDirectiveGraph=t.RULE("ConfigDirectiveGraph",function(){t.SUBRULE2(t.GraphArgument),t.OPTION3(function(){t.OR2([{ALT:function(){t.SUBRULE1(t.AliasArgument),t.OPTION4(function(){return t.SUBRULE2(t.TypeArgument)})}},{ALT:function(){t.SUBRULE3(t.TypeArgument),t.OPTION5(function(){return t.SUBRULE2(t.AliasArgument)})}}])})}),t.ConfigDirectiveType=t.RULE("ConfigDirectiveType",function(){t.SUBRULE4(t.TypeArgument),t.OPTION6(function(){t.OR3([{ALT:function(){t.SUBRULE3(t.AliasArgument),t.OPTION7(function(){return t.SUBRULE3(t.GraphArgument)})}},{ALT:function(){t.SUBRULE4(t.GraphArgument),t.OPTION8(function(){return t.SUBRULE4(t.AliasArgument)})}}])})}),t.AliasArgument=t.RULE("AliasArgument",function(){t.CONSUME(R.AliasArgumentToken),t.CONSUME(R.Colon),t.CONSUME(R.LCurly),t.AT_LEAST_ONE(function(){return t.SUBRULE(t.AliasArgumentField)}),t.CONSUME(R.RCurly)}),t.AliasArgumentField=t.RULE("AliasArgumentField",function(){t.SUBRULE(t.Alias),t.SUBRULE(t.StringValue)}),t.GraphArgument=t.RULE("GraphArgument",function(){t.CONSUME(R.GraphArgumentToken),t.CONSUME(R.Colon),t.OR([{ALT:function(){return t.SUBRULE(t.EnumValueOrString)}},{ALT:function(){t.CONSUME(R.LBracket),t.MANY(function(){return t.SUBRULE1(t.EnumValueOrString)}),t.CONSUME(R.RBracket)}}])}),t.EnumValueOrString=t.RULE("EnumValueOrString",function(){t.OR([{ALT:function(){return t.SUBRULE(t.EnumValue)}},{ALT:function(){return t.CONSUME(R.StringToken)}}])}),t.TypeArgument=t.RULE("TypeArgument",function(){t.CONSUME(R.TypeToken),t.CONSUME(R.Colon),t.SUBRULE(t.BooleanValue)}),t.OrderByArgument=t.RULE("OrderByArgument",function(){t.CONSUME(R.OrderByArgumentToken),t.CONSUME(R.Colon),t.OR([{ALT:function(){return t.SUBRULE(t.OrderByArgumentField)}},{ALT:function(){t.CONSUME(R.LBracket),t.AT_LEAST_ONE(function(){return t.SUBRULE1(t.OrderByArgumentField)}),t.CONSUME(R.RBracket)}}])}),t.OrderByArgumentField=t.RULE("OrderByArgumentField",function(){t.OR([{ALT:function(){return t.CONSUME(R.Name)}},{ALT:function(){t.CONSUME(R.LCurly),t.OR1([{ALT:function(){t.SUBRULE(t.OrderByArgumentFieldProperty),t.OPTION(function(){return t.SUBRULE(t.OrderByArgumentDescProperty)})}},{ALT:function(){t.SUBRULE1(t.OrderByArgumentDescProperty),t.SUBRULE1(t.OrderByArgumentFieldProperty)}}]),t.CONSUME(R.RCurly)}}])}),t.OrderByArgumentFieldProperty=t.RULE("OrderByArgumentFieldProperty",function(){t.CONSUME(R.OrderByArgumentFieldPropertyToken),t.CONSUME(R.Colon),t.CONSUME(R.Name)}),t.OrderByArgumentDescProperty=t.RULE("OrderByArgumentDescProperty",function(){t.CONSUME(R.OrderByArgumentDescPropertyToken),t.CONSUME(R.Colon),t.SUBRULE(t.BooleanValue)}),t.SkipArgument=t.RULE("SkipArgument",function(){t.CONSUME(R.SkipDirectiveToken),t.CONSUME(R.Colon),t.SUBRULE(t.IntValue)}),t.OffsetArgument=t.RULE("OffsetArgument",function(){t.CONSUME(R.OffsetArgumentToken),t.CONSUME(R.Colon),t.SUBRULE(t.IntValue)}),t.FirstArgument=t.RULE("FirstArgument",function(){t.CONSUME(R.FirstArgumentToken),t.CONSUME(R.Colon),t.SUBRULE(t.IntValue)}),t.LimitArgument=t.RULE("LimitArgument",function(){t.CONSUME(R.LimitArgumentToken),t.CONSUME(R.Colon),t.SUBRULE(t.IntValue)}),t.IriArgument=t.RULE("IriArgument",function(){t.CONSUME(R.IriArgumentToken),t.CONSUME(R.Colon),t.SUBRULE(t.EnumValue)}),i.Parser.performSelfAnalysis(t),t}return p(StardogGraphQlParser,n),StardogGraphQlParser}(c);t.d(e,"graphqlTokens",function(){return N}),t.d(e,"BaseGraphQlParser",function(){return c}),t.d(e,"StandardGraphQlParser",function(){return f}),t.d(e,"StardogGraphQlParser",function(){return s});var N=t(19)}})});
//# sourceMappingURL=millan.graphql.js.map