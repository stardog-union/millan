"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SparqlParser_1 = require("./SparqlParser");
exports.traverse = (root, visit) => {
    _traverse(root, null, visit);
};
function isCstNode(object) {
    return 'name' in object;
}
exports.isCstNode = isCstNode;
exports.BaseCstVisitorWithDefaults = new SparqlParser_1.SparqlParser().getBaseCstVisitorConstructorWithDefaults();
class VariableValidationVisitor extends exports.BaseCstVisitorWithDefaults {
    constructor() {
        super();
        this.validateVisitor();
    }
    // @ts-ignore
    QueryUnit(ctx) { }
    Var(ctx) {
        console.log(JSON.stringify(ctx, null, 2));
    }
}
exports.VariableValidationVisitor = VariableValidationVisitor;
const testQuery = `PREFIX fd: <http://www.element-22.com/ontology/foundation#>
PREFIX gu: <http://www.element-22.com/ontology/geographicunit#>
PREFIX wgs:      <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX geof:       <http://www.opengis.net/def/function/geosparql/>
PREFIX qudt:         <http://qudt.org/vocab/unit#>
PREFIX :   <http://www.element-22.com/ontology/party#> 
SELECT *
WHERE {
    { #pragma group.joins
        ?party a :NonIndividual ;
        fd:hasObjectId "172e7e8f-4656-4b54-803c-a22a6f1dcf03" ;
        :hasRegisteredName ?partyName;
        wgs:long ?partyLong ;
        wgs:lat ?partyLat ;
        :hasCityName ?partyCityName .
        OPTIONAL { ?party geo:asWKT ?wktParty . }
        ?competitor a :NonIndividual ;
        wgs:long ?competitorLong ;
        wgs:lat ?competitorLat ;
        :hasRegisteredName ?competitorName ;
        :hasCityName ?competitorCityName ;
        ^:isCompetitorOf ?party . 
    }
    
    {   ?distance geof:distance ( ?party ?competitor qudt:MileUSStatute ) . }
        
}`;
const { cst } = new SparqlParser_1.SparqlParser().parse(testQuery);
const v = new VariableValidationVisitor();
v.visit(cst);
class TraverseContext {
    constructor({ node, parentCtx, }) {
        this.node = Object.assign({}, node);
        this.parentCtx = Object.assign({}, parentCtx);
    }
}
const _traverse = (root, ctx = new TraverseContext({ node: root }), visit) => {
    if (!isCstNode(root)) {
        // must be a token
        // make sure to give user a copy
        return visit(Object.assign({}, ctx));
    }
    // is a grammar rule node
    const { children } = root;
    Object.keys(children).forEach((key) => {
        const childType = children[key];
        if (!childType.length) {
            return;
        }
        childType.forEach((child) => {
            const childCtx = new TraverseContext({ node: child, parentCtx: ctx });
            const afterVisit = (transformedCtx) => {
                const nextCtx = transformedCtx
                    ? new TraverseContext({
                        node: transformedCtx.node,
                        parentCtx: transformedCtx.parentCtx,
                    })
                    : childCtx;
                _traverse(child, nextCtx, visit);
            };
            visit(childCtx, afterVisit);
        });
    });
};
